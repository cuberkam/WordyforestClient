import React from "react";
import { Modal, Button } from "react-bootstrap";

type ErrorModalProps = {
  show: boolean;
  onHide: () => void;
  title?: string;
  message: string;
};

const ErrorModal: React.FC<ErrorModalProps> = ({
  show,
  onHide,
  title = "Error",
  message,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
