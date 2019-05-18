import React from "react";
// import EventsCalendar from "react-event-calendar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import interactionPlugin from "@fullcalendar/interaction";

const EventCalendar = props => (
  <FullCalendar
    defaultView="dayGridMonth"
    plugins={[dayGridPlugin, bootstrapPlugin, interactionPlugin]}
    themeSystem="bootstrap"
    events={props.events}
    dateClick={props.handleDateClick}
    eventClick={props.handleEventClick}
  />
);

export default EventCalendar;
