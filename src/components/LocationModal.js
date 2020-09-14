import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class LocationModal extends React.Component{
    render() {
        let prop = this.props;
        return(
            <Modal show={prop.show} onHide={prop.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={prop.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={prop.handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default LocationModal;