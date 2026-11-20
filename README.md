# Weather App

A small weather application I built while learning React and working with APIs during my four-week frontend development internship.

The project lets a user search for a city and view its current temperature and wind speed. It uses the Open-Meteo geocoding and forecast APIs, so an API key is not required.

## Why I built this

I worked on this project as part of my frontend development learning during an internship with **Estelle Darcy AI and Automation Pvt. Ltd.** The internship ran from **11 May 2026 to 5 June 2026**.

The training included frontend topics such as HTML, CSS, JavaScript, React and Git. We had some trainer-led classes and guidance, and I continued practising by building this application. I used ChatGPT as a learning and debugging mentor while working through parts I could not solve on my own.

This is a learning project, not a claim of professional-level React experience.

## What it does

- Search for a city by name.
- Find the location using the Open-Meteo geocoding API.
- Request current temperature and wind speed for that location.
- Show loading, empty-input, city-not-found and request-error messages.
- Display the result in a layout that works on smaller screens.

## Built with

- React
- JavaScript
- CSS
- Vite
- Open-Meteo Geocoding API
- Open-Meteo Forecast API

## How the API flow works

1. The user enters a city name.
2. The app sends that name to the Open-Meteo geocoding endpoint.
3. The API returns the matching location's latitude and longitude.
4. The app uses those coordinates to request current weather data.
5. React state is updated and the result is displayed.

## Run it locally

You need Node.js and npm installed.

```bash
git clone https://github.com/Muneeb-PT/Weather_App.git
cd Weather_App
npm install
npm run dev
```

Open the local address printed by Vite in your terminal.

## Useful commands

```bash
npm run dev      # Start the development server
npm run lint     # Run ESLint
npm run build    # Create a production build
npm run preview  # Preview the production build
```

## Project structure

```text
Weather_App/
├── public/
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## What I practised

- React components and state with `useState`
- Handling form submissions and user input
- Calling external APIs with `fetch`
- Working with asynchronous functions and `async/await`
- Reading JSON responses
- Handling loading and error states
- Basic responsive CSS
- Running a React project with Vite
- Using Git and GitHub during development

## Things I would like to improve

- Show weather conditions and suitable icons.
- Add a multi-day forecast.
- Add a current-location option.
- Let users switch between Celsius and Fahrenheit.
- Add tests for the search and API states.

## About the internship

**Organisation:** Estelle Darcy AI and Automation Pvt. Ltd.  
**Duration:** 4 weeks  
**Dates:** 11 May 2026 – 5 June 2026  
**Topic:** Frontend Development using HTML, CSS, JavaScript, React and Git

The internship certificate was issued on 16 June 2026.

## Author

**Mohammed Muneeb PT**  
B.Tech Computer Science and Engineering student, KMEA Engineering College

- GitHub: [Muneeb-PT](https://github.com/Muneeb-PT)
- LinkedIn: [Mohammed Muneeb PT](https://linkedin.com/in/mohammed-muneeb-pt)

## Weather data

Weather information is provided by [Open-Meteo](https://open-meteo.com/).
