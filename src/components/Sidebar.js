///src/components/Sidebar.js

import { Button } from 'react-bootstrap';
import blankCards from '../util/BlankCards';

const Sidebar = ({ onAddCard }) => {
  const buttonClasses = {
    empathy: "btn-primary",
    define: "btn-success",
    ideate: "btn-info",
    prototype: "btn-warning",
    test: "btn-danger"
  };

  return (
    <div className="col-md-2 sidebar">
      {blankCards.map((card) => (
        <Button
        key={card.id}
        className={`my-2 ${buttonClasses[card.stage]} w-100`}
        onClick={() => onAddCard(card)}
      >
        {card.title}
      </Button>
      ))}
    </div>
  );
};

export default Sidebar;

//TO-DO - add a filter component that shows only level 1 cards