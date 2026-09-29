export const SelectTravelsList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A solo travels in exploration",
    icon: "✈️",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two traveles in tandom",
    icon: "🥂",
    people: "2 people",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving ady",
    icon: "🏡",
    people: "3 to 5 people",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of all thrill-seekers",
    icon: "⛵",
    people: "5 to 10 people",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Dont worry about cost",
    icon: "💸",
  },
];

export const AI_PROMPT = `
You are an AI travel planner.

Create a detailed travel plan based on:

Destination: {location}
Number of days: {totalDays}
Travelers: {traveler}
Budget: {budget}

Return ONLY valid JSON.

Use EXACTLY this structure:

{
  "destination": "string",
  "duration_days": number,
  "group_size": "string",
  "budget": "string",

  "hotel_options": [
    {
      "hotel_name": "string",
      "hotel_address": "string"
    }
  ],

  "itinerary": [
    {
      "day": number,
      "theme": "string",
      "locations": [
        {
          "location_name": "string",
          "time_travel": "string",
          "description": "string"
        }
      ]
    }
  ]
}

STRICT RULES:

1. Return ONLY JSON.
2. Do not use markdown.
3. Do not add explanations.
4. Do not rename any fields.
5. Always use "hotel_options".
6. Always use "hotel_name".
7. Always use "hotel_address".
8. Always use "itinerary".
9. Always use "day".
10. Always use "theme".
11. Always use "locations".
12. Always use "location_name".
13. Always use "time_travel".
14. Always use "description".
15. Create exactly one itinerary object for every day.
16. Each day should contain multiple locations.
17. Keep the JSON valid and parseable.
`;