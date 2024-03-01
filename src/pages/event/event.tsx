import { Box, Button, Container, Skeleton } from "@mui/material";
import { Event } from "../../components/eventCard/eventCard.interface";
import EventList from "../../components/eventList/EventList";
import { useEffect, useState } from "react";
import { apiService } from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";

function IndexPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const events = await apiService.get<Event[]>("event");
      setEvents(events);
      setLoading(false);
    };
    fetchData();
  }, []);

  const onEventDelete = async (id: string) => {
    await apiService.delete<unknown>(`event/${id}`);
    setEvents(prevEvents => prevEvents.filter(prevEvent => prevEvent._id !== id))
  }


  const onEventUpdate = async (id: string) => {
    navigate(`update-event-page/${id}`)
  }


  return (
    <Container>
      <Box marginY={3} display="flex" justifyContent="end">
        <Link to="/create-event-page">
          <Button variant="contained" color="secondary">
            Create Event
          </Button>
        </Link>
      </Box>

      {loading ? (
        <Skeleton variant="rectangular" width={373} height={181} />
      ) : (
        <EventList events={events} onEventUpdate={onEventUpdate} onEventDelete={onEventDelete}/>
      )}
    </Container>
  );
}

export default IndexPage;
