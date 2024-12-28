# Face Recognition Frontend

This project is the frontend for the face recognition application, built using **React**. It captures video from the user's webcam, processes frames, and communicates with the backend through a **WebSocket** connection to perform real-time facial recognition.

## Features

- **Camera Feed**: Streams video from the user's webcam.
- **Frame Capture**: Captures frames from the video feed at regular intervals and sends them to the backend for processing.
- **WebSocket Communication**: Sends captured frames to the backend and receives recognition results in real-time.
- **Recognized Faces Display**: Displays a list of recognized users returned by the backend.

## Technologies Used

- **React**: Framework for building the user interface.
- **WebSocket**: Real-time communication with the backend.
- **PropTypes**: Type-checking for component props.

## Requirements

To run this project locally, you need:

- **Node.js** (v14 or newer)
- **npm** or **yarn** (for managing dependencies)
- Backend service running (see [Face Recognition Backend](https://github.com/brayanquirozurrutia/face-recognition-backend))

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/brayanquirozurrutia/face-recognition-frontend.git
   cd face-recognition-frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a configuration file for the WebSocket URL:

   Create a file named `src/config.js`:

   ```javascript
   const config = {
       WEBSOCKET_URL: "ws://127.0.0.1:8000/ws/recognize", // Replace with your backend WebSocket URL
   };

   export default config;
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Access the application in your browser:

   Open [http://localhost:5173](http://localhost:5173).

## Directory Structure

```
face-recognition-frontend/
├── src/
│   ├── components/
│   │   ├── CameraFeed.jsx         # Webcam feed and frame capturing
│   │   ├── RecognizedList.jsx     # Display list of recognized faces
│   ├── hooks/
│   │   └── useWebSocket.js        # WebSocket connection logic
│   ├── App.jsx                    # Main application component
│   ├── config.js                  # WebSocket configuration
│   └── index.js                   # Application entry point
├── public/
│   └── index.html                 # Main HTML file
├── package.json                   # Project dependencies and scripts
└── README.md                      # Project documentation
```

## Components

### CameraFeed

- Captures frames from the user's webcam every 3 seconds and sends them to the backend.
- Ensures the video feed is properly displayed and captured.

### RecognizedList

- Displays a list of recognized faces received from the backend.
- Updates in real-time as recognition results arrive.

### useWebSocket

- Manages WebSocket connection to the backend.
- Handles automatic reconnection if the connection is lost.
- Provides methods to send messages and listen for responses.

## Scripts

- `npm start`: Start the development server.
- `npm run build`: Build the application for production.
- `npm test`: Run tests (if implemented).
- `npm run lint`: Check for linting errors.

Developed with ❤️ by [Brayan Nicolas Quiroz Urrutia](https://github.com/brayanquirozurrutia).