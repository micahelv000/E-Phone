import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Card = ({ icon, title, value, bgColor, fontSize }) => (
  <div className={`card text-white ${bgColor} mb-3`}>
    <div className="card-body">
      <h5 className="card-title" style={{ fontSize: fontSize || '1.25rem' }}>
        <FontAwesomeIcon icon={icon} /> {title}
      </h5>
      <p className="card-text">{value}</p>
    </div>
  </div>
);

export default Card;