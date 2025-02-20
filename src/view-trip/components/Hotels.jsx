import React from "react";

function Hotels({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {trip?.tripData?.hotels?.map((item, index) => {
          // Find the key that contains "price"
          const priceKey = Object.keys(item).find((key) =>
            key.toLowerCase().includes("price")
          );
          const priceValue = priceKey ? item[priceKey] : "Price not available";

          return (
            <div key={index} className="hover:scale-110 transition-all cursor-pointer">
              <img src="/plane.jpg" className="rounded-xl w-50 h-32" />
              <div className="my-2 flex flex-col gap-2">
                <h2 className="font-semibold">{item?.hotelName}</h2>
                <h2 className="text-sm text-gray-600">
                  📌{item?.hotelAddress}/
                </h2>
                <h2 className="text-sm">💰{priceValue}</h2>
                <h2 className="text-sm">⭐{item?.rating}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Hotels;
