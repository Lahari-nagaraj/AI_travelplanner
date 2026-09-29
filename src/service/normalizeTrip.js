export function normalizeTripData(rawData) {
  let data = rawData;

  // If Gemini returned a JSON string
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch (error) {
      // Remove markdown code fences if Gemini added them
      const cleaned = data
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      data = JSON.parse(cleaned);
    }
  }

  // Sometimes Gemini may return an array with one object
  if (Array.isArray(data)) {
    data = data[0] || {};
  }

  // -------------------------
  // Normalize Hotels
  // -------------------------

  const rawHotels =
    data.hotel_options ||
    data.hotels ||
    data.recommended_hotels ||
    data.hotelRecommendations ||
    [];

  const hotel_options = Array.isArray(rawHotels)
    ? rawHotels.map((hotel) => ({
        hotel_name:
          hotel.hotel_name ||
          hotel.hotelName ||
          hotel.name ||
          "Hotel Name Not Available",

        hotel_address:
          hotel.hotel_address ||
          hotel.hotelAddress ||
          hotel.address ||
          "Address Not Available",

        price:
          hotel.price ||
          hotel.price_range ||
          "",

        rating:
          hotel.rating ||
          "",
      }))
    : [];

  // -------------------------
  // Normalize Itinerary
  // -------------------------

  const rawItinerary =
    data.itinerary ||
    data.trip_itinerary ||
    data.daily_itinerary ||
    [];

  const itinerary = Array.isArray(rawItinerary)
    ? rawItinerary.map((day, index) => {

        const rawLocations =
          day.locations ||
          day.activities ||
          day.places ||
          [];

        const locations = Array.isArray(rawLocations)
          ? rawLocations.map((place) => ({
              location_name:
                place.location_name ||
                place.locationName ||
                place.activity ||
                place.place ||
                place.name ||
                "Unknown Place",

              time_travel:
                place.time_travel ||
                place.timeTravel ||
                place.travelTimeFromHotel ||
                place.approximate_time_to_reach ||
                place.travel_time ||
                "Travel time not available",

              description:
                place.description ||
                place.details ||
                "",
            }))
          : [];

        return {
          day:
            day.day ||
            day.day_number ||
            day.dayNumber ||
            index + 1,

          theme:
            day.theme ||
            day.title ||
            day.description ||
            `Day ${index + 1}`,

          locations,
        };
      })
    : [];

  // -------------------------
  // Final fixed structure
  // -------------------------

  return {
    destination:
      data.destination ||
      data.location ||
      "",

    duration_days:
      data.duration_days ||
      data.duration ||
      data.noOfDays ||
      0,

    group_size:
      data.group_size ||
      data.groupSize ||
      data.traveler ||
      "",

    budget:
      data.budget ||
      "",

    hotel_options,

    itinerary,
  };
}