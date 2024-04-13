///src/components/Card.js

import React from 'react';

const Card = ({ id, title, details, stage, onEditCard }) => {
    const cardStageClasses = {
        empathy: "bg-empathy-light",
        define: "bg-define-light",
        ideate: "bg-ideate-light",
        prototype: "bg-prototype-light", 
        test: "bg-test-light"
      };
      return (
        <div className={`card ${cardStageClasses[stage]} mt-2`} onClick={() => onEditCard(id)}>
          <h5 title={title}>{title}</h5> {/* title attribute shows tooltip on hover */}
        </div>
      );
};

export default Card;
