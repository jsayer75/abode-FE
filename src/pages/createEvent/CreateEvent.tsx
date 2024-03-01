import { useNavigate } from "react-router-dom";
import { apiService } from "../../utils/api";
import { useState } from "react";
import EventForm from "../../components/EventForm/EventForm";
import { EventDates, EvnetFromValues } from "../../components/EventForm/eventFrom.interface";

const CreateEventPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values: EvnetFromValues, dates: EventDates) => {
    const reqBody = {
      name: values.title,
      description: values.description,
      startAt: dates.startAt.toISOString(),
      endAt: dates.endAt.toISOString(),
      attendees: values.attendees,
    };

    try {
      await apiService.post("event", reqBody);
      navigate("/");
    } catch (e: any) {
      const errorMessage = e.response.data.message;
      console.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <EventForm onSubmit={handleSubmit} loading={loading} />
  );
};

export default CreateEventPage;
