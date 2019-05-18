import React, { useState } from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Alert
} from "reactstrap";
import Autocomplete from "./AutoComplete";
const EventCreationForm = props => {
  const [state, setState] = useState({
    title: "",
    details: "",
    location: "",
    start: "",
    end: ""
  });
  return (
    <Modal
      isOpen={props.modal}
      toggle={props.toggle}
      className={props.className}
    >
      <ModalHeader toggle={props.toggle}>Add Event</ModalHeader>
      <ModalBody>
        {props.errorMessage && (
          <Alert color="danger">{props.errorMessage}</Alert>
        )}
        <div className="form-group">
          <label>Event Title</label>
          <Input
            placeholder="Enter Event Title"
            onChange={text => setState({ ...state, title: text.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Event Location</label>
          <Autocomplete
            onPlaceSelected={place => {
              setState({ ...state, location: place });
            }}
          />
        </div>
        <div className="form-group">
          <label>Event Details</label>
          <textarea
            className="form-control"
            onChange={e => setState({ ...state, details: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Event Start Date</label>
          <Input
            type="datetime-local"
            placeholder="Event Start Date"
            onChange={text =>
              setState({
                ...state,
                start: text.target.value
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Event End Date</label>

          <Input
            type="datetime-local"
            placeholder="Event End Date"
            onChange={text =>
              setState({
                ...state,
                end: text.target.value
              })
            }
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => props.addEvent(state)}>
          Add Event
        </Button>{" "}
        <Button color="secondary" onClick={props.toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EventCreationForm;
