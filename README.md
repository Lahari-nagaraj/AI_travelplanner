# ✈️ AI Travel Planner

## Smart Travel Companion for Personalized Itineraries

AI Travel Planner is a React + Vite web application that generates personalized travel itineraries based on a user's destination, trip duration, budget, and number of travelers.

The application uses **Google Gemini** for AI-powered itinerary generation, **Google Places API** for destination and place information, and **Firebase** for authentication and storing generated trips.

The project focuses on creating an end-to-end AI-powered travel planning experience with personalized recommendations and dynamically generated itineraries.

---

## 🚀 Features

- 🔐 Google Sign-In authentication
- 📍 Google Places integration for destination and place details
- 🤖 AI-powered travel itinerary generation using Google Gemini
- 🏨 Hotel recommendations
- 🗺️ Places-to-visit recommendations
- 📅 Day-wise travel itinerary
- 💰 Budget-based trip planning
- 👥 Traveler-based personalization
- 💾 Firebase Firestore trip storage
- 📋 My Trips section to view previously generated trips
- 🔗 Shareable trip links
- 🖼️ Google Places photos for destinations and activities
- 📱 Responsive React UI

---

## 🧠 AI-Powered Trip Generation

The application collects the following information from the user:

- Destination
- Number of days
- Budget
- Number of travelers

This information is sent to **Google Gemini**, which generates:

- Destination information
- Hotel recommendations
- Hotel addresses
- Day-wise itinerary
- Places to visit
- Activity descriptions
- Travel time between locations

The generated response is then processed before being displayed in the frontend.

---

## 🛡️ AI Response Validation & Normalization

One of the challenges with generative AI is that the model may return slightly different JSON structures even when given the same prompt.

For example, Gemini may generate itinerary data using different property names or structures.

To make the application reliable, the generated AI response is **validated and normalized before being used by the frontend**.

This ensures that:

- Unexpected AI response structures do not break the UI
- Different itinerary formats can be handled safely
- Missing fields have fallback values
- Hotel and itinerary data are mapped into a consistent structure
- The frontend does not need to be changed every time Gemini produces a slightly different response

### Flow

```text
User Input
    ↓
Google Gemini
    ↓
Generated JSON
    ↓
Validation / Normalization
    ↓
Consistent Trip Structure
    ↓
Firebase Firestore
    ↓
React Frontend
```

This makes the application more robust against variations in AI-generated output.

---

## 🏗️ Application Architecture

```text
                    ┌─────────────────────┐
                    │      React UI       │
                    │      + Vite         │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
      Google OAuth       Google Places       Gemini AI
      Authentication         API            Trip Generation
             │                 │                 │
             └─────────────────┼─────────────────┘
                               │
                               ▼
                      Response Validation
                       & Normalization
                               │
                               ▼
                       Firebase Firestore
                               │
                               ▼
                         Saved Trips
```

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- ShadCN
- React Router

### AI

- Google Gemini
- `@google/generative-ai`

### Authentication & Database

- Firebase Authentication
- Firebase Firestore

### APIs

- Google Places API
- Google Places Photos API
- Google OAuth

### Libraries

- Axios
- `react-google-places-autocomplete`
- `@react-oauth/google`
- React Icons
- Sonner

---
``

## 📸 Screenshots

Add your own screenshots here.

### Landing Page

```text
Add your landing page screenshot
```

### Create Trip

```text
Add your create trip screenshot
```

### AI Trip Generation

```text
Add your AI generation screenshot
```

### Generated Trip

```text
Add your generated trip screenshot
```

### Hotels

```text
Add your hotel section screenshot
```

### Places to Visit

```text
Add your places-to-visit screenshot
```

---

## 👩‍💻 Author

### Lahari Priya N
