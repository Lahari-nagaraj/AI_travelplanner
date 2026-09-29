import React from "react";
import PlaceCard from "./PlaceCard";

function PlacesToVisit({ trip }) {
  const itinerary = trip?.tripData?.itinerary || [];

  return (
    <div className="mt-8">
      <h2 className="font-bold text-lg">Places To Visit</h2>

      {itinerary.length === 0 ? (
        <p className="text-gray-500 mt-3">No itinerary available.</p>
      ) : (
        itinerary.map((day, index) => (
          <div key={index} className="mt-5">
            <h2 className="font-medium text-lg">
              Day {day.day} - {day.theme}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
              {day.locations?.length > 0 ? (
                day.locations.map((place, i) => (
                  <PlaceCard key={i} place={place} />
                ))
              ) : (
                <p className="text-gray-500">
                  No activities planned for this day.
                </p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default PlacesToVisit;
