import React from "react";
import PlaceCard from "./PlaceCard";

function PlacesToVisit({ trip }) {
  if (!trip || typeof trip !== "object") {
    return <h2 className="text-red-500">No itinerary data available</h2>;
  }

  // Extract itinerary while supporting different structures
  const itinerary = trip.tripData?.itinerary || trip.itinerary || trip;

  if (!itinerary || Object.keys(itinerary).length === 0) {
    return <h2 className="text-gray-500">No itinerary available.</h2>;
  }

  return (
    <div>
      <h2 className="font-bold text-lg">Places To Visit</h2>
      <div>
        {Object.entries(itinerary).map(([dayKey, dayData], index) => {
          const formattedDay = dayKey.replace(/day(\d+)/i, "Day $1");
          const theme = dayData.theme || "Itinerary";

          // Extract morning, afternoon, and evening activities if present
          const activities = ["morning", "afternoon", "evening"]
            .map((timeOfDay) => ({ timeOfDay, ...dayData[timeOfDay] }))
            .filter((details) => details.activity); // Ensure there's an activity

          return (
            <div key={index} className="mt-5">
              <h2 className="font-medium text-lg">
                {formattedDay} - {theme}
              </h2>
              <div className="grid grid-cols-2 gap-5">
                {activities.length > 0 ? (
                  activities.map((place, i) => (
                    <div key={i}>
                      <h2 className="font-medium text-sm text-orange-600">
                        {place.timeOfDay.toUpperCase()} -{" "}
                        {dayData.city || "Unknown City"}
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
