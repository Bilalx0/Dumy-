import React from "react";
import { Link } from "react-router-dom";
import { useMansions } from "../context/MansionContext";

const MansionList = () => {
  const { mansions, loading, error } = useMansions();

  if (loading) return <div>Loading mansions...</div>;
  if (error) return <div>Error loading mansions.</div>;

  return (
    <div className="grid gap-4 p-4">
      {mansions.map((mansion) => (
  <div
    key={mansion.reference}
    className="bg-white rounded-lg shadow-md overflow-hidden relative"
  >
    {/* Image and 'Featured' tag */}
    <div className="relative">
      <img
        src={`http://localhost:5001${mansion.image}`}
        alt={mansion.title}
        className="w-full h-48 object-cover"
      />
      {mansion.tag === "Featured" && (
        <span className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 text-sm uppercase font-bold rounded">
          {mansion.tag}
        </span>
      )}
    </div>

    {/* Card Content */}
    <div className="p-4">
      {/* Price */}
      <p className="text-xl font-semibold text-gray-800">
        AED {mansion.price}
      </p>

      {/* Property Type */}
      <p className="text-sm text-gray-600">
        {mansion.propertytype}
      </p>

      {/* Beds, Baths, Size */}
      <p className="text-sm text-gray-600">
        {mansion.bedrooms} Beds | {mansion.bathrooms} Baths | {mansion.size} sqft
      </p>

      {/* Location (community, subcommunity, country) */}
      <p className="text-sm text-gray-600">
        {mansion.community}, {mansion.subcommunity}, {mansion.country}
      </p>

      {/* Detail Link */}
      <div className="mt-3">
        <Link
          to={`/mansion/${mansion.reference}`}
          className="inline-block text-blue-500 hover:underline"
        >
          View Details
        </Link>
      </div>
    </div>
  </div>
))}

    </div>
  );
};

export default MansionList;
