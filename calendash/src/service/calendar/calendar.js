const getCalendar = async () => {
    const events = await gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime'
    })

    console.log(events.result.items)
    return events.result.items;

}

export const insertEvent = async () => {
    const date = new Date();
    const startTime = new Date();
    startTime.setDate(date.getDay() + 2);
    const endTime = new Date();
    endTime.setDate(date.getDay() + 2);
    endTime.setMinutes(endTime.getMinutes());

    const insert = await gapi.client.calendar.events.insert({
        calendarId: 'primary',
        start: {
            dateTime: startTime,
            timeZone: 'America/Los_Angeles'
        },
        end: {
            dateTime: endTime,
            timeZone: 'America/Los_Angeles'
        },
        colorId : 1,
        location: "13 Queen Street",
        summary: 'Have Fun!!!',
        description: 'Do some cool stuff and have a fun time doing it'
    })

    return await getCalendar();
}
