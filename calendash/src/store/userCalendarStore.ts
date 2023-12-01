import {writable} from "svelte/store";
import {UserCalendar} from "../data/userCalendar";

export const userCalendarStore = writable<UserCalendar[]>([])