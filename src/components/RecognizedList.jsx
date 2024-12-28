import PropTypes from "prop-types";

/**
 * Component that displays a list of recognized faces.
 * @param recognizedFaces {Array} List of recognized faces
 * @returns {JSX.Element} Recognized list component
 * @constructor
 */
const RecognizedList = ({ recognizedFaces }) => {
    return (
        <div>
            <h3>Rostros Reconocidos</h3>
            <ul>
                {recognizedFaces.map((face, index) => (
                    <li key={index}>{face.name}</li>
                ))}
            </ul>
        </div>
    );
};

RecognizedList.propTypes = {
    recognizedFaces: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired, // Every `recognizedFace` object must have a `name` property
        })
    ).isRequired, // `recognizedFaces` is an array of objects
};

export default RecognizedList;
