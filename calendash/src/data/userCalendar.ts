export interface Event {
    id: string | number;
    userId : string;
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
    _id: string;
    calendarId : string;
    name : string;
    schedule: Record<WeekDays, ScheduleEntry[]>;
    timezone: string;
    isValid: boolean;
    events: Event[];
}

export interface UserCalendar {
    calendars: CalendarEntry[];
}
