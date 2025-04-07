// MansionCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ mansion }) => {
  return (
    <div className="border rounded shadow hover:shadow-lg transition-all duration-300 p-4">
      <img
        src={`http://localhost:5001$mansion.image`}
        alt={mansion.title}
        className="w-full h-48 object-cover rounded"
      />
      <div className="mt-4">
        <h3 className="text-xl font-bold">{mansion.title}</h3>
        <p className="text-gray-600">
          {mansion.description.length > 100
            ? `${mansion.description.substring(0, 100)}...`
            : mansion.description}
        </p>
        <Link
          to={`/mansion/${mansion.reference}`}
          className="text-blue-500 mt-2 inline-block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Card;
