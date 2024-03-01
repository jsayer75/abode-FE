# Abode Test - FE
## Description
This repository contains the frontend portion of a proof-of-concept (PoC) software system for a simple yet effective calendar event management system. It was built using ReactJS and vite.
## Prerequisites
- Node.js - Ensure you have Node.js installed. If not, you can download it from [here](https://nodejs.org/en).

## Installation

```bash
$ npm install
```
## Setting Up Environment Variables
- **Copy .env.example**: Duplicate the .env.example file in the root of your project.
- **Rename the File**: Remove the .example extension from the duplicated file so that it becomes .env.
- **Add Your Values**: Open the .env file in a text editor and fill in the required values for your MongoDB connection string and JWT token.
- **Save the File**: Save the .env file with your changes.

## Running the app

```bash
# development
$ npm run dev

```
## Design Choices and Future Considerations

- **Vite**: A modern build tool that offers faster development with hot module replacement and optimized builds, making it a compelling alternative to Create React App for React projects. Vite leverages ES Module imports and supports hot module replacement (HMR), which can significantly speed up the development process by allowing you to see changes in your code almost instantly.
- **Material-UI (MUI)**: A popular React UI framework that implements Google's Material Design. MUI offers a wide range of pre-built components and styles, making it easy to create a consistent and visually appealing user interface. Its theming capabilities allow for easy customization to match your brand's look and feel. MUI also provides responsive design features, accessibility support, and a vibrant community, making it a reliable choice for building modern and user-friendly web applications.
- **Axios**: Axios is a versatile JavaScript library for making HTTP requests in both browsers and Node.js, offering a straightforward API and robust features like interceptors and automatic JSON parsing.

#### What would I have done with more time
- Implement a calendar-style design for the event page, similar to Microsoft Teams or Google Meet, to provide users with a more intuitive and visually appealing overview of their scheduled events.
- Enhance the notification system by implementing a toast notification feature that automatically displays errors from the backend as toast notifications on the frontend, providing users with real-time feedback on their actions.
- Improve loading states by implementing a proper loading screen and component to ensure users are aware of the system's activity and prevent confusion or frustration caused by delays in data retrieval or processing.
- Currently, I haven't implemented any validation on date and time selection, but I want to do that. For example, users shouldn't be able to select any previous date to start an event, and they shouldn't be able to select any end date that is before the start date.