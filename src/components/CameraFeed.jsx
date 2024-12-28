import {useCallback, useEffect, useRef} from "react";
import PropTypes from "prop-types";

/**
 * Component that captures a frame from the user's webcam every second and calls the
 * onFrameCaptured callback with the frame data.
 * @param onFrameCaptured {Function} Callback that is called with the frame data
 * @returns {JSX.Element} Camera feed component
 * @constructor
 */
const CameraFeed = ({ onFrameCaptured }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // Start the webcam stream
    useEffect(() => {
        const startCamera = async () => {
            try {
                videoRef.current.srcObject = await navigator.mediaDevices.getUserMedia(
                    {video: true}
                );
            } catch (error) {
                console.error("Error accessing webcam:", error);
            }
        };

        startCamera().then(r => r);
    }, []);

    /**
     * Capture a frame from the webcam and call the onFrameCaptured callback.
     * @type {(function(): void)|*} Callback to capture a frame
     * @returns {void}
     */
    const captureFrame = useCallback(() => {
        const canvas = canvasRef.current;
        const video = videoRef.current;

        if (canvas && video) {
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Get the image in binary format directly
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        blob.arrayBuffer().then((buffer) => {
                            onFrameCaptured(buffer);
                        });
                    }
                },
                "image/jpeg"
            );
        }
    }, [onFrameCaptured]);

    // Capture a frame every 3 seconds
    useEffect(() => {
        const interval = setInterval(captureFrame, 3000);
        return () => clearInterval(interval);
    }, [captureFrame]);

    return (
        <div>
            <video ref={videoRef} autoPlay muted width="640" height="480" />
            <canvas ref={canvasRef} width="640" height="480" style={{ display: "none" }} />
        </div>
    );
};

CameraFeed.propTypes = {
    onFrameCaptured: PropTypes.func.isRequired,
};

export default CameraFeed;
