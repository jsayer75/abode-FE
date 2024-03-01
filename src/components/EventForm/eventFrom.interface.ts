import { Dayjs } from "dayjs";
import { Attendee } from "../eventCard/eventCard.interface";

export interface EvnetFromValues {
    title: string;
    description: string;
    attendees: Attendee[];
}

export interface EventDates  {
    startAt: Dayjs;
    endAt: Dayjs;
}