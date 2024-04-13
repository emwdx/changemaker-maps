///src/components/Column.js

import React from 'react';
import Card from './Card';

const Column = ({ title, cards, stage, onEditCard }) => {
    const stageClasses = {
        empathy: "bg-primary text-white",
        define: "bg-success text-white",
        ideate: "bg-info text-white",
        prototype: "bg-warning text-dark", // text-dark for better contrast
        test: "bg-danger text-white"
      };

      return (
        <div className={`flex-grow-1 min-width-0 column m-1`}>
  <div className="row no-gutters">
    <div className={`col ${stageClasses[stage]}`}>
      <h2 className="m-0">{title}</h2> {/* Added m-0 to remove default margins */}
    </div>
  </div>
  <div className="d-flex flex-column overflow-auto">
    {cards.map(card => (
      <Card key={card.id} {...card} onEditCard={onEditCard} />
    ))}
  </div>
</div>
      );
};

export default Column;
