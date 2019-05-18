import React, { useState } from "react";
import Map from "./Map";
import moment from "moment";

import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Autocomplete from "./AutoComplete";
const EventView = props => {
  return (
    <Modal
      isOpen={props.modal}
      toggle={props.toggle}
      className={props.className}
    >
      <ModalHeader toggle={props.toggle}>
        {props.selectedEvent && <h3>{props.selectedEvent.title}</h3>}
      </ModalHeader>
      <ModalBody>
        {props.selectedEvent && (
          <div className="event-display">
            <div className="display-event">
              <h4>Details</h4>
              <span>{props.selectedEvent.details}</span>
              <h4>Address: {props.selectedEvent.location.address}</h4>
              <h4>
                Event Dates:{" "}
                {moment(props.selectedEvent.start).format("DD/MM/YYYY h:mm A")}{" "}
                {props.selectedEvent.end && (
                  <span>
                    {" "}
                    to{" "}
                    {moment(props.selectedEvent.end).format(
                      "DD/MM/YYYY h:mm A"
                    )}{" "}
                  </span>
                )}
              </h4>
            </div>
            <div className="map-display">
              <Map
                bounds={[
                  {
                    lat: props.selectedEvent.location.latLng.lat,
                    lng: props.selectedEvent.location.latLng.lng
                  }
                ]}
                initialCenter={{
                  lat: props.selectedEvent.location.latLng.lat,
                  lng: props.selectedEvent.location.latLng.lng
                }}
                markers={[
                  {
                    name: props.selectedEvent.location.address,
                    position: props.selectedEvent.location.latLng,
                    event: props.selectedEvent.title
                  }
                ]}
              />
            </div>
          </div>
        )}
      </ModalBody>
    </Modal>
  );
};

export default EventView;
