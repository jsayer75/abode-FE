import { Grid } from "@mui/material";
import EventCard from "../eventCard/EventCard";
import { Event } from "../eventCard/eventCard.interface";
import { Key } from "react";

interface Props {
  events: Event[];
  onEventDelete: (id: string) => void
  onEventUpdate:  (id: string) => void
}

function EventList({ events, onEventDelete, onEventUpdate }: Props) {
  return (
    <Grid container spacing={2}>
      {events.map((event, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <EventCard event={event} key={event._id as Key} onUpdate={onEventUpdate} onDelete={onEventDelete} />
        </Grid>
      ))}
    </Grid>
  );
}

export default EventList;
