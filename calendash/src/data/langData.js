import {enUS, fr} from "date-fns/locale";

export const langValues = [
    {
        value : "en",
        display : "English",
        dateFormat : enUS
    },
    {
        value : "fr",
        display : "Français",
        dateFormat : fr
    },
]


export const getDateFormatByValue = (value) => {
    const langValueByValue = langValues.find(langValue => langValue.value === value);
    return langValueByValue.dateFormat
}