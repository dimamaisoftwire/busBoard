import {BusDetails} from "./busQueries";
import Table from 'react-bootstrap/Table';
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import React, {useEffect, useState} from 'react';

const ModalPopUp = ({opened, showModal, hideModal} : {opened:boolean, showModal:() => void, hideModal:() => void}): React.ReactElement => {
    return (
    <Modal show={opened} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Postcode check</Modal.Title>
        </Modal.Header>
        <Modal.Body>Invalid postcode!</Modal.Body>
        <Modal.Footer>
          <button onClick={hideModal}>Cancel</button>
        </Modal.Footer>
      </Modal>
  );
}

export {ModalPopUp};