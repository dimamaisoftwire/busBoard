import Modal from "react-bootstrap/Modal";
import React from "react";

const ModalPopUp = ({opened, hideModal} : {opened:boolean, hideModal:() => void}): React.ReactElement => {
    return (
    <Modal show={opened} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Postcode check</Modal.Title>
        </Modal.Header>
        <Modal.Body>Invalid postcode!</Modal.Body>
        <Modal.Footer>
          <button onClick={hideModal}>Got it.</button>
        </Modal.Footer>
      </Modal>
  );
}

export {ModalPopUp};