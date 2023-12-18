<script>
    import {goto} from "$app/navigation";
    import AppointmentDetails from "$lib/appointment/AppointmentDetails.svelte";

    export let data;

    if (!data.appointment){
        goto("/")
    }
</script>

<div class="flex justify-center pt-12">
    <div class="flex flex-col gap-4 p-8 bg-gray-50 rounded max-w-sm w-full">
        <img class="w-1/3 self-center" src="/illustrations/reservationSuccess.png" alt="reservation success">
        <p class="text-2xl font-semibold text-center">You are all set !</p>
        <p>Check your email for the booking details</p>
        <AppointmentDetails {data}/>
    </div>

</div>

