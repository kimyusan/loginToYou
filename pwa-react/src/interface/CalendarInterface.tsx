interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
}

interface EventItem {
  calendarId: number;
  coupleId: number;
  userId: number;
  startDate: string;
  endDate: string | null;
  eventType: string | null;
  contents: string | null;
}

export type { Event, EventItem };
