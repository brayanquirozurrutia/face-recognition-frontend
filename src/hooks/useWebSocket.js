import { useEffect, useState, useRef, useCallback } from "react";

/**
 * Custom hook that connects to a WebSocket server and returns the messages received.
 * @param url {string} WebSocket server URL to connect to
 * @returns {{messages: *[], sendMessage: sendMessage, isConnected: boolean}} WebSocket hook object
 */
const useWebSocket = (url) => {
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef(null);
    const reconnectAttempts = useRef(0);

    /**
     * Connects to the WebSocket server and sets up the event handlers.
     * If the connection is closed, it will attempt to reconnect every 5 seconds.
     */
    const connectWebSocket = useCallback(() => {
        // Limit reconnection attempts to 5
        if (reconnectAttempts.current > 5) {
            console.warn("Max reconnection attempts reached.");
            return;
        }

        // Connect to the WebSocket server
        socketRef.current = new WebSocket(url);

        // Set up event handlers
        socketRef.current.onopen = () => {
            console.log("WebSocket connected");
            setIsConnected(true);
            reconnectAttempts.current = 0; // Reset reconnection attempts
        };

        // Parse the message and add it to the messages array
        socketRef.current.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setMessages((prev) => [...prev, data]);
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        };

        // Attempt to reconnect if the connection is closed
        socketRef.current.onclose = () => {
            console.warn("WebSocket disconnected. Attempting to reconnect...");
            setIsConnected(false);
            reconnectAttempts.current += 1;
            setTimeout(connectWebSocket, 5000); // Reconnect every 5 seconds
        };

        // Log any errors
        socketRef.current.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
    }, [url]); // Add `url` as a dependency

    // Connect to the WebSocket server when the component mounts
    useEffect(() => {
        connectWebSocket();

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [connectWebSocket]);

    /**
     * Sends a message to the WebSocket server.
     * @param message {string} Message to send
     * @returns {void} Nothing
     */
    const sendMessage = (message) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            // Send the message if the WebSocket connection is open
            socketRef.current.send(message);
        } else {
            console.warn("WebSocket is not open. Message not sent.");
        }
    };

    return { messages, sendMessage, isConnected };
};

export default useWebSocket;
