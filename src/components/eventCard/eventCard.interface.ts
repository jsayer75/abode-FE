export interface Event {
  attendees: Attendee[];
  description: string;
  createdBy: Attendee;
  endAt: string;
  name: string;
  startAt: string;
  _id: string;
}

export interface Attendee {
  id: string;
  email: string;
}
