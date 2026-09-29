import React from "react";
import HotelCardItem from "./HotelCardItem";

function Hotels({ trip }) {
  const hotels = trip?.tripData?.hotel_options || [];

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>

      {hotels.length === 0 ? (
        <p className="text-gray-500 mt-3">
          No hotel recommendations available.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
          {hotels.map((hotel, index) => (
            <HotelCardItem
              key={index}
              hotel={{
                name: hotel.hotel_name,
                address: hotel.hotel_address,
                price: hotel.price || "Price not available",
                rating: hotel.rating || "No rating available",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Hotels;
