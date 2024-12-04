import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const StatusTransaksi = {
  pending: 'pending',
  success: 'success',
  failed: 'failed',
  cancelled: 'cancelled',
};

function UpdateStatus({ show, onClose, onSave, currentStatus, setNewStatus }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Status Transaksi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Select New Status</Form.Label>
            <Form.Control
              as="select"
              value={currentStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              {Object.keys(StatusTransaksi).map((key) => (
                <option key={key} value={key}>
                  {StatusTransaksi[key]}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSave}>
          Update Status
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateStatus;
