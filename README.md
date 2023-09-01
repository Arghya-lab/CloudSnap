# Weather React App

This is a simple weather application built using React that allows users to check the weather forecast for different locations.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## Demo

You can check out a live demo of the app [here](#your-demo-url).

![Weather React App Screenshot](/screenshot.png)

## Features

- Get current weather conditions for a specified location.
- View a 5-day weather forecast.
- Search for weather data by city name.
- Responsive design for mobile and desktop.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js: Make sure you have Node.js installed on your computer. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

Clone the repository to your local machine



Navigate to the project directory:

bash
Copy code
cd weather-react-app
Install the project dependencies:

bash
Copy code
npm install
Rename the .env.example file to .env and add your OpenWeatherMap API key:

env
Copy code
REACT_APP_API_KEY=your-api-key-here
Replace your-api-key-here with your actual API key.

Start the development server:

bash
Copy code
npm start
Open your browser and visit http://localhost:3000 to view the app.

Usage
Enter a city name in the search bar and click the "Search" button to get the weather forecast for that location.
The app will display the current weather conditions and a 5-day forecast.
You can switch between Celsius and Fahrenheit units using the toggle button.
Technologies Used
React
OpenWeatherMap API
CSS Modules (for styling)
Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

Fork the repository.
Create a new branch for your feature or bug fix.
Make your changes and commit them with clear, concise commit messages.
Push your changes to your fork.
Submit a pull request to the main repository.