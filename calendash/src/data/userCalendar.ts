export interface Event {
    id: string | number;
    name: string;
    duration: number;
    location: string;
    imageUrl: string;
}
export enum WeekDays {
    Monday = 'Monday',
    Tuesday = 'Tuesday',
    Wednesday = 'Wednesday',
    Thursday = 'Thursday',
    Friday = 'Friday',
    Saturday = 'Saturday',
    Sunday = 'Sunday',
}

export interface ScheduleEntry {
    start: string;
    end: string;
}

export interface CalendarEntry {
    schedule: Record<WeekDays, ScheduleEntry[]>;
    timezone: string;
    isValid: boolean;
    events: Event[];
    email: string;
}

export interface UserCalendar {
    url: string;
    calendars: CalendarEntry[];
}
