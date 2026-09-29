import React from "react";
import PlaceCard from "./PlaceCard";

function PlacesToVisit({ trip }) {
  if (!trip || typeof trip !== "object") {
    return <h2 className="text-red-500">No itinerary data available</h2>;
  }

  // tripData is stored as an array in Firebase
  const tripData = Array.isArray(trip.tripData)
    ? trip.tripData[0]
    : trip.tripData;

  const itinerary = tripData?.itinerary;

  if (!Array.isArray(itinerary) || itinerary.length === 0) {
    return (
      <div className="mt-5">
        <h2 className="font-bold text-lg">Places To Visit</h2>
        <p className="text-gray-500 mt-3">No itinerary available.</p>
      </div>
    );
  }

  return (
    <div className="mt-5">
      <h2 className="font-bold text-lg">Places To Visit</h2>

      <div>
        {itinerary.map((dayData, index) => {
          const dayNumber = dayData?.day || index + 1;
          const theme = dayData?.theme || "Itinerary";
          const activities = Array.isArray(dayData?.activities)
            ? dayData.activities
            : [];

          return (
            <div key={index} className="mt-5">
              <h2 className="font-medium text-lg">
                Day {dayNumber} - {theme}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
                {activities.length > 0 ? (
                  activities.map((place, i) => (
                    <PlaceCard key={i} place={place} />
                  ))
                ) : (
                  <p className="text-gray-500">
                    No activities planned for this day.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlacesToVisit;
