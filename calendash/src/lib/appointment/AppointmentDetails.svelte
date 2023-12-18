<script>
    import {format} from "date-fns";

    export let data;

    const itemArray = [
        {label: 'Name:', data: data.appointment.name},
        {label: 'Email:', data: data.appointment.email},
        {label: 'Start time:', data: format(new Date(data.appointment.startTime), "EEE. MMM do yyyy HH:mm")},
        {label: 'End time:', data: format(new Date(data.appointment.endTime), "EEE. MMM do yyyy HH:mm")},
        {label: 'Location:', data: data.appointment.location}
    ];
</script>


{#each itemArray as item}
    <div>
        <p class="font-semibold">{item.label}</p>
        <p>{item.data}</p>
    </div>

{/each}