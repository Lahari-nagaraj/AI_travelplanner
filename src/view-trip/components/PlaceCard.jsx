import React from "react";

function PlaceCard({ timeOfDay, placeDetails }) {
  return (
    <div className="flex bg-white shadow-md rounded-lg overflow-hidden">
      {/* Left Side: Image */}
      <div className="w-1/3">
        <img src="/plane.jpg" className="w-full h-full object-cover" alt={placeDetails.place} />
      </div>

      {/* Right Side: Details */}
      <div className="w-2/3 p-4">
        <h3 className="font-semibold capitalize text-gray-600">{timeOfDay}</h3>
        <h2 className="font-bold text-lg mb-1">📍 {placeDetails.place}</h2>

        {/* Description (Smaller Font + Gray Color) */}
        {placeDetails.details && (
          <p className="text-xs text-gray-500">{placeDetails.details}</p>
        )}

        {/* Dynamically extract travel time fields */}
        {Object.entries(placeDetails)
          .filter(([key]) => key.toLowerCase().includes("travel_time"))
          .map(([key, value], i) => (
            <p key={i} className="text-sm text-gray-700">🚗 Travel Time: {value}</p>
          ))}

        {/* Dynamically extract activity duration */}
        {placeDetails.activity_duration && (
          <p className="text-sm text-gray-700">⏳ Duration: {placeDetails.activity_duration}</p>
        )}

        {/* Cost (Different Color for Highlighting) */}
        {Object.entries(placeDetails)
          .filter(([key]) => key.toLowerCase().includes("cost") || key.toLowerCase().includes("entry_fee"))
          .map(([key, value], i) => (
            <p key={i} className="text-sm text-blue-600 font-semibold">💰 {value}</p>
          ))}
      </div>
    </div>
  );
}

export default PlaceCard;
