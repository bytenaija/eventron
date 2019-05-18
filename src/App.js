import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Map from "./components/Map";
import EventCreation from "./components/EventCreation";
import { Button, Alert } from "reactstrap";
import EventCalendar from "./components/EventCalendar";
import EventView from "./components/EventView";
import axios from "axios";
import moment from "moment";

class App extends React.Component {
  state = {
    errorMessage: "",
    modalEvent: false,
    selectedEvent: null,
    events: [],
    modal: false,
    places: [],
    initialCenter: { lat: "9.0765", lng: "7.3986" },
    bounds: [
      {
        lat: 5.593222,
        lng: -0.140138
      },

      {
        lat: 9.0765,
        lng: 0.3986
      }
    ]
  };

  componentDidMount() {
    axios.get("http://localhost:5000/events").then(res => {
      let {
        data: { events }
      } = res;

      let places = [...this.state.places],
        bounds = [];

      console.log(events);

      for (const [index, event] of events.entries()) {
        events[index].id = event._id;

        if (
          (moment().isSameOrAfter(moment(event.start), "days") &&
            moment(event.end).isSameOrBefore(moment(), "days")) ||
          (moment().isSame(moment(event.start), "days") ||
            moment(event.end).isSame(moment(), "days"))
        ) {
          places.push({
            name: event.location.address,
            position: event.location.latLng,
            event: event.title
          });
          bounds.push(event.location.latLng);
        }
      }

      console.log("Places", places);
      this.setState({
        ...this.state,
        places,
        bounds,
        events
      });
    });
  }

  handleDateClick = arg => {
    // bind with an arrow function
    console.log(arg);
    this.setState({ ...this.state, selectedEvent: null });
  };

  handleEventClick = event => {
    // bind with an arrow function
    console.log(event);
    let {
      event: { id }
    } = event;

    let selectedEvent = this.state.events.filter(e => e.id === id)[0];
    this.setState({ ...this.state, selectedEvent });
    console.log(selectedEvent);
    this.setState(prevState => ({
      modalEvent: true
    }));
  };
  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  toggleEvent = () => {
    this.setState(prevState => ({
      modalEvent: !prevState.modalEvent
    }));
  };

  addEvent = details => {
    this.setState({ ...this.state, errorMessage: "" });
    axios
      .post("http://localhost:5000/events", details)
      .then(res => {
        let {
          data: { event }
        } = res;

        let { events } = this.state;
        event.id = event._id;
        events.push(event);
        let places = [...this.state.places];
        if (
          moment()
            .startOf("day")
            .diff(moment(event.start)) <= 0 ||
          moment()
            .endOf("day")
            .diff(moment(event.end)) <= 0
        ) {
          places.push({
            name: event.location.address,
            position: event.location.latLng,
            event: event.title
          });
        }
        this.setState({
          ...this.state,
          places,
          bounds: [...this.state.bounds, event.location.latLng],
          events,
          modal: false
        });
      })
      .catch(err => {
        if (err.response) {
          this.setState({
            ...this.state,
            errorMessage: err.response.data.message
          });
        }
      });
  };
  render() {
    return (
      <div>
        <div className="header">
          <div className="header-text">
            <h3>Eventron - Event Management System</h3>
          </div>
          <div className="cta">
            <Button color="danger" onClick={this.toggle}>
              Add Event
            </Button>
          </div>
          <EventCreation
            errorMessage={this.state.errorMessage}
            addEvent={this.addEvent}
            toggle={this.toggle}
            modal={this.state.modal}
          />

          <EventView
            editEvent={this.editEvent}
            toggle={this.toggleEvent}
            modal={this.state.modalEvent}
            selectedEvent={this.state.selectedEvent}
          />
        </div>
        <div className="events">
          <h3> This Month's Events</h3>
          <div className="map-container">
            <div className="display">
              <EventCalendar
                events={this.state.events}
                handleDateClick={this.handleDateClick}
                handleEventClick={this.handleEventClick}
              />
            </div>

            <div className="map">
              <Map
                markers={this.state.places}
                bounds={this.state.bounds}
                initialCenter={this.state.initialCenter}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
