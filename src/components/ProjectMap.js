///src/components/ProjectMap.js


import React, { useState , useEffect} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Sidebar from './Sidebar';
import Column from './Column';
import blankCards from '../util/BlankCards';
import { generateUniqueId } from '../util/helpers'; 

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';  // Import the styles or use your own custom CSS


const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered'}, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
};

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image', 'video'
];

const ProjectMap = () => {
    const [showModal, setShowModal] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [cardsInMap, setCardsInMap] = useState(() => {
    const storedCards = localStorage.getItem('cardsInMap');
    return storedCards ? JSON.parse(storedCards) : [];
});

  const stages = ['empathy', 'define', 'ideate', 'prototype', 'test'];
  const cardsByStage = (stage) => blankCards.filter(card => card.stage === stage);
  const columnClasses = {
    empathy: "text-primary bg-light",
    define: "text-success bg-light",
    ideate: "text-info bg-light",
    prototype: "text-warning bg-light",
    test: "text-danger bg-light"
  };


  const onAddCard = (templateCard) => {
    setCurrentCard({
        ...templateCard,
        id: generateUniqueId(),
        details: '',
        isNew: true  // Flag new cards explicitly
    });
    setShowModal(true);
};



const saveNewCard = () => {
    if (currentCard && currentCard.title && currentCard.details) {
        const newCard = {
            ...currentCard,
            id: generateUniqueId(),  // Ensure it gets a final unique ID
            isNew: false  // Remove the new flag after saving
        };
        setCardsInMap(prevCards => [...prevCards, newCard]);
        setShowModal(false);
        setCurrentCard(null);
    }
};


const handleSaveChanges = () => {
    if (currentCard.isNew) {
        saveNewCard();
    } else {
        saveEditedCard();
    }
};

const saveEditedCard = () => {
    const cardIndex = cardsInMap.findIndex(card => card.id === currentCard.id);
    if (cardIndex !== -1) {
        const updatedCards = [...cardsInMap];
        updatedCards[cardIndex] = { ...updatedCards[cardIndex], ...currentCard, isNew: false };
        setCardsInMap(updatedCards);
        setShowModal(false);
    }
};


  const onEditCard = (cardId) => {
    const cardToEdit = cardsInMap.find(card => card.id === cardId);
    if (cardToEdit) {
      setCurrentCard(cardToEdit);
      setShowModal(true);
    }
  };
  
  const handleDeleteCard = (cardId) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
        const updatedCards = cardsInMap.filter(card => card.id !== cardId);
        setCardsInMap(updatedCards);
        setShowModal(false);
    }
};


  // Load existing cards from localStorage on component mount
  useEffect(() => {
    const storedCards = localStorage.getItem('cardsInMap');
    if (storedCards) {
      setCardsInMap(JSON.parse(storedCards));
    }
  }, []);
  
  
  // Update localStorage when cardsInMap changes
  useEffect(() => {
    localStorage.setItem('cardsInMap', JSON.stringify(cardsInMap));
  }, [cardsInMap]);
  
  return (
    <div className="container-fluid">
        <div className="row">
           
            <Sidebar onAddCard={onAddCard} />
       
            <div className="col-md-10 d-flex project-map">
                {stages.map(stage => (
                    <Column key={stage} title={stage} stage={stage} cards={cardsInMap.filter(card => card.stage === stage)} onEditCard={onEditCard} />
                ))}
            </div>
        </div>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
    <Modal.Header closeButton className={currentCard ? columnClasses[currentCard.stage] : ''}>
        <Modal.Title>{currentCard ? `Edit ${currentCard.title} Card` : 'Create Card'}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="formCardTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={currentCard?.title || ''}
                    onChange={(e) => setCurrentCard({ ...currentCard, title: e.target.value })}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCardDetails">
    <Form.Label>Details</Form.Label>
    <ReactQuill
    theme="snow"
    modules={modules}
    formats={formats}
    value={currentCard?.details || ''}
    onChange={(content, delta, source, editor) => setCurrentCard({
        ...currentCard,
        details: editor.getContents()  // Adjust based on what you need
    })}
/>
</Form.Group>
        </Form>
    </Modal.Body>
    <Modal.Footer className="justify-content-between">
        {currentCard && !currentCard.isNew && (
            <Button variant="danger" onClick={() => handleDeleteCard(currentCard.id)}>
                <i className="fas fa-trash-alt"></i> {/* Trashcan icon */}
            </Button>
        )}
        <div>
            
        <Button variant="primary" onClick={handleSaveChanges}>
    <i className="fas fa-save"></i> {/* Save icon */}
</Button>
        </div>
    </Modal.Footer>
</Modal>

    </div>
);
};

export default ProjectMap;

// Name field in modal, store name on save
// filter cards based on name