import type {Event} from "../data/userCalendar";
import {writable} from "svelte/store";

export const defaultEvent: Event = {
    id: "",
    userId: "",
    name: "",
    duration: 30,
    location: "",
    imageUrl: null,
}

export const eventStore = writable<Event>(defaultEvent)