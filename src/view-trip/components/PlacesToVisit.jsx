import React from "react";
import PlaceCard from "./PlaceCard"; // Import the new component

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5 text-center">Places To Visit</h2>

      <div className="p-4">
        {trip?.tripData?.itinerary &&
          Object.entries(trip.tripData.itinerary).map(
            ([day, details], index) => (
              <div key={index} className="mb-6">
                {/* Day Heading */}
                <h2 className="font-bold text-lg mb-3">
                  {day.replace("day", "Day ")}
                </h2>

                {/* Display Location Focus if available */}
                {details.location_focus && (
                  <h3 className="text-md font-semibold mb-2">
                    📍 {details.location_focus}
                  </h3>
                )}

                {/* If multiple options exist (e.g., Gulmarg or Pahalgam) */}
                {Object.keys(details).some((key) => key.includes("option")) ? (
                  Object.entries(details)
                    .filter(([key]) => key.includes("option"))
                    .map(([optionKey, optionDetails], optIdx) => (
                      <div key={optIdx} className="mt-4">
                        <h3 className="text-md font-semibold mb-2">
                          🏔 {optionDetails.destination}
                        </h3>

                        <div className="flex flex-col gap-5">
                          {Object.entries(optionDetails)
                            .filter(([key]) => key !== "destination") // Ignore destination key
                            .map(([timeOfDay, placeDetails], idx) => (
                              <PlaceCard
                                key={idx}
                                timeOfDay={timeOfDay}
                                placeDetails={placeDetails}
                              />
                            ))}
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="flex flex-col gap-5">
                    {Object.entries(details)
                      .filter(([key]) => key !== "location_focus") // Ignore location focus
                      .map(([timeOfDay, placeDetails], idx) => (
                        <PlaceCard
                          key={idx}
                          timeOfDay={timeOfDay}
                          placeDetails={placeDetails}
                        />
                      ))}
                  </div>
                )}
              </div>
            )
          )}
      </div>
    </div>
  );
}

export default PlacesToVisit;
