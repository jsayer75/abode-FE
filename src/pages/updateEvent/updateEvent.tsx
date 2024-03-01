import { useNavigate, useParams } from "react-router-dom";
import { apiService } from "../../utils/api";
import { useEffect, useState } from "react";
import EventForm from "../../components/EventForm/EventForm";
import {
  EventDates,
  EvnetFromValues,
} from "../../components/EventForm/eventFrom.interface";
import { Event } from "../../components/eventCard/eventCard.interface";
import { Skeleton, Stack } from "@mui/material";

const UpdateEventPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingEvent, setLoadingEvent] = useState(false);
  const [event, setEvent] = useState<Event | undefined>(undefined);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoadingEvent(true);
      const event = await apiService.get<Event>(`event/${id}`);
      setLoadingEvent(false);
      setEvent(event);
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (values: EvnetFromValues, dates: EventDates) => {
    const reqBody = {
      name: values.title,
      description: values.description,
      startAt: dates.startAt.toISOString(),
      endAt: dates.endAt.toISOString(),
      attendees: values.attendees,
    };

    console.log("reqBody",reqBody)
    try {
      await apiService.put(`event/${id}`, reqBody);
      navigate("/");
    } catch (e: any) {
      const errorMessage = e.response.data.message;
      console.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loadingEvent ? (
        <Stack my={10} maxWidth={1000} mx="auto">
          <Skeleton height={50} animation="wave" />
          <Skeleton height={50} animation="wave" />
          <Skeleton height={50} animation="wave" />
        </Stack>
      ) : (
        <EventForm onSubmit={handleSubmit} loading={loading} event={event} />
      )}
    </>
  );
};

export default UpdateEventPage;
