# Next.js and Django Integration Dashboard

This is a web application built using **Next.js** on the frontend and **Django** on the backend. The application features a dashboard with charts (Candlestick, Line, Bar, and Pie) that visualize data fetched from a Django API.

## Table of Contents
- [Getting Started](#getting-started)
- [Backend Setup (Django)](#backend-setup-django)
- [Frontend Setup (Next.js)](#frontend-setup-nextjs)
- [Libraries and Tools Used](#libraries-and-tools-used)
- [Running Tests](#running-tests)
- [Notes](#notes)
- [Learn More](#learn-more)
- [Deploying the App](#deploying-the-app)
- [Approach and Thought Process](#approach-and-thought-process)


## Getting Started

Follow these instructions to set up and run both the Django backend and the Next.js frontend.

### Prerequisites

Make sure you have the following installed on your machine:
- **Node.js** (for Next.js)
- **Python** (for Django)

---


## Backend Setup (Django)

1. **Clone the repository** and navigate to the backend directory of the project.

2. **Install the required Python packages** using `pip`.

3. **Run the Django development server** to start the API.

4. Open `http://localhost:8000` to verify the Django API is running.

---

## Frontend Setup (Next.js)

1. **Navigate to the frontend directory** of the project.

2. **Install the dependencies** using `npm` or `yarn`.

3. **Run the Next.js development server** to start the frontend.

4. Open `http://localhost:3000` to view the frontend.

---

## Libraries and Tools Used

### Backend (Django):
- **Django**: Python web framework for the backend API.
- **REST Framework**: For creating the API endpoints.
- **Python**: The language for building the backend.

### Frontend (Next.js):
- **Next.js**: React framework for server-side rendering and static site generation.
-  **Recharts**: For rendering various chart types on the dashboard.
- **Tailwind CSS**: For responsive, modern UI styling.


---

## Notes

- The **frontend** listens on `http://localhost:3000`.
- The **backend API** listens on `http://localhost:8000`.

Ensure the backend server is running before interacting with the frontend charts, as they fetch data from the API endpoints.

## Learn More

To learn more about the frameworks and libraries used in this project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Django Documentation](https://docs.djangoproject.com/en/stable/)
- [Django REST Framework Documentation](https://www.django-rest-framework.org/)

---

## Deployed App 

To deploy the app, you can use platforms like **Vercel** (for Next.js) and **Heroku** or **DigitalOcean** (for Django). Detailed deployment instructions for both platforms are available in their respective documentation.

- [Vercel for Next.js](https://vercel.com/)
- [Heroku for Django](https://www.heroku.com/)

---

## Approach and Thought Process

### 1. **Backend (Django API)**
The backend is built using **Django** and **Django REST Framework** to serve as an API that provides chart data for the frontend. The idea was to keep the backend simple and modular by defining individual endpoints for each chart type:
- **/api/candlestick-data/**
- **/api/line-chart-data/**
- **/api/bar-chart-data/**
- **/api/pie-chart-data**

The data for the charts can either be hardcoded or dynamically fetched from a database, depending on the project requirements. The API follows REST principles, making it easy to expand or integrate with other services.

### 2. **Frontend (Next.js)**
The frontend was built using **Next.js** to leverage server-side rendering and static site generation. The charts are rendered using **Recharts**, which provides an easy and efficient way to visualize data in a React-based environment.

The primary challenge was integrating multiple charts into a unified dashboard while fetching data from the Django API. Each chart (Candlestick, Line, Bar, and Pie) is modularized into its own component to maintain separation of concerns and make the project more maintainable.

### 3. **Styling (Tailwind CSS)**
For the UI, **Tailwind CSS** was chosen due to its ease of use and ability to quickly build responsive and clean interfaces. The layout is simple, focusing on functionality over complex design, making the dashboard intuitive and easy to navigate.

### 4. **State Management (Optional)**
In this project, state management was kept minimal as the components directly fetch data from the API on render. However, if the project scales or if there’s a need for more complex data management, tools like **Redux** can be introduced to handle global state.

### 5. **Testing**
- For the **Django backend**, unit tests ensure that each API endpoint works correctly and returns the expected data structure. 
- For the **Next.js frontend**, unit and integration tests are written using **Jest** and **React Testing Library** to verify that the components render correctly and handle data fetching properly.

### 6. **Docker (Optional)**
While Docker was not used in this particular setup, it can easily be introduced to containerize both the frontend and backend for a more consistent development environment. Dockerizing the project ensures that both the Django and Next.js applications can be easily run in any environment with minimal setup.

This modular approach allows for easy scalability and maintenance of the project. Each component (both frontend and backend) is isolated, making it easier to debug, maintain, and extend in the future.
