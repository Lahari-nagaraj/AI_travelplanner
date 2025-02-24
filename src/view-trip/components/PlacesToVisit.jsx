import React from "react";
import PlaceCard from "./PlaceCard";

function PlacesToVisit({ trip }) {
  if (!trip || typeof trip !== "object") {
    return <h2 className="text-red-500">No itinerary data available</h2>;
  }

  // Extract itinerary (supports different structures)
  const itinerary = trip.tripData?.itinerary || trip.itinerary || trip;

  if (!itinerary || Object.keys(itinerary).length === 0) {
    return <h2 className="text-gray-500">No itinerary available.</h2>;
  }

  return (
    <div>
      <h2 className="font-bold text-lg">Places To Visit</h2>
      <div>
        {Object.entries(itinerary).map(([day, details], index) => {
          // Convert "day1" → "Day 1"
          const formattedDay = day.replace(/day(\d+)/i, "Day $1");

          // Extract all activities (morning, afternoon, evening)
          const activities = Object.values(details).filter(
            (activity) => activity.activity
          );

          return (
            <div key={index} className="mt-5">
              <h2 className="font-medium text-lg">
                {formattedDay} - {details.theme || "Itinerary"}
              </h2>
              <div className="grid grid-cols-2 gap-5">
                {activities.length > 0 ? (
                  activities.map((place, i) => (
                    <div key={i}>
                      <h2 className="font-medium text-sm text-orange-600">
                        {place.bestTimeToVisit || "Best Time: Not Specified"}
                      </h2>
                      <PlaceCard place={place} />
                    </div>
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
