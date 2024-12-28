import { useState, useEffect } from "react";
import CameraFeed from "./components/CameraFeed";
import RecognizedList from "./components/RecognizedList";
import useWebSocket from "./hooks/useWebSocket";
import config from "./config";

/**
 * Main application component that connects to the WebSocket server and displays the camera feed.
 * @returns {JSX.Element}
 * @constructor
 */
const App = () => {
    const [recognizedFaces, setRecognizedFaces] = useState([]);
    const {
        sendMessage,
        messages,
        isConnected
    } = useWebSocket(config.WEBSOCKET_URL);

    /**
     * Callback that is called when a frame is captured by the CameraFeed component.
     * @param frameBuffer {ArrayBuffer} Frame data buffer
     * @returns {void}
     */
    const handleFrameCaptured = (frameBuffer) => {
        console.log("Captured frame size:", frameBuffer.byteLength); // We use the frame data buffer to log the size of the captured frame
        sendMessage(frameBuffer); // Send the frame data to the WebSocket server
    };

    // Update the recognized faces when a new message is received
    useEffect(() => {
        if (messages.length > 0) {
            const latestMessage = messages[messages.length - 1];
            setRecognizedFaces(latestMessage.recognized_faces || []);
        }
    }, [messages]);

    return (
        <div>
            <h1>Face Recognition</h1>
            <p>Status: {isConnected ? "Connected" : "Disconnected"}</p>
            <CameraFeed onFrameCaptured={handleFrameCaptured} />
            <RecognizedList recognizedFaces={recognizedFaces} />
        </div>
    );
};

export default App;
