import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import DateAndTimePicker from "../../components/dateAndTimePicker/DateAndTimePicker";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import AttendeesAutoComplete from "../../components/attendeesAutoComplete/AttendeesAutoComplete";
import { Attendee } from "../../components/eventCard/eventCard.interface";
import { Event } from "../eventCard/eventCard.interface";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
});

interface EventFormProps {
  event?: Event;
  onSubmit: (values: any, dates: any) => void;
  loading: boolean;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit, loading, event }) => {
  const [dates, setDates] = useState({
    startAt: dayjs(),
    endAt: dayjs().add(15, "minute"),
  });

  useEffect(() => {
    if (event) {
      formik.setValues({
        title: event.name,
        description: event.description,
        attendees: event.attendees,
      });
      setDates({
        startAt: dayjs(event.startAt),
        endAt: dayjs(event.endAt),
      });
    }
  }, [event]);

  const changeDate = (key: string) => {
    return (value: Dayjs) =>
      setDates((prev) => ({
        ...prev,
        [key]: value,
      }));
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      attendees: [] as Attendee[],
    },
    validationSchema,
    onSubmit: async (values) => {
      onSubmit(values, dates);
    },
  });

  const changeAttendeesSelection = (attendees: Attendee[]) => {
    formik.setFieldValue("attendees", attendees);
  };

  return (
    <Container component="main">
      <Box
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="start"
              gap={2}
              color="GrayText"
              alignItems="center"
            >
              <DateAndTimePicker
                value={dates.startAt}
                onDateChange={changeDate("startAt")}
              />
              <Typography variant="body2">to</Typography>
              <DateAndTimePicker
                value={dates.endAt}
                onDateChange={changeDate("endAt")}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={() => formik.setFieldTouched("email", true)}
              error={formik.touched.title && !!formik.errors.title}
              helperText={(formik.touched.title && formik.errors.title) || " "}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              rows={4}
              multiline
              name="description"
              label="Description"
              id="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <AttendeesAutoComplete
            defaultValue={event?.attendees || []} 
              onChangeAttendeesSelection={changeAttendeesSelection}
            />
          </Grid>
        </Grid>

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!formik.isValid || loading}
            >
              {event ? "Update Event" : "Create Event"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default EventForm;
