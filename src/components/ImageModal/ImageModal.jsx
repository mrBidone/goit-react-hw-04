import ReactModal from "react-modal";
import css from "./ImageModal.module.css";
ReactModal.setAppElement("#root");

const ImageModal = ({ isOpen, closeModal, imgUrl, imgAlt }) => {
  const customStyles = {
    content: {
      maxWidth: "50%",
      maxHeight: "50%",
      margin: "auto",
      padding: 0,
      overflow: "hidden",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      border: "1px solid black",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className={css.modalContent}>
        <img src={imgUrl} alt={imgAlt} className={css.modalImage} />
      </div>
    </ReactModal>
  );
};

export default ImageModal;
