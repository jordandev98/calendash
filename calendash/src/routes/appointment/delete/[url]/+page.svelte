<script>
    import {goto} from "$app/navigation";
    import {format} from "date-fns";
    import {enhance} from '$app/forms';
    import {getToastStore, Toast} from "@skeletonlabs/skeleton";
    import AppointmentDetails from "$lib/appointment/AppointmentDetails.svelte";

    export let data;
    if (!data.appointment) {
        goto("/")
    }


    const toastStore = getToastStore();


</script>

<div class="flex justify-center pt-12">
    <form method="post" action="?" class="flex flex-col gap-4 p-8 bg-gray-50 rounded max-w-sm w-full"
          use:enhance={({ formElement, formData, action, cancel, submitter }) => {
		return async ({ result }) => {
			if (result.status === 200) {
				goto("/").then(
                    () => {toastStore.trigger({message : "Deleted successfully !" , autohide : true , background : "bg-success-400"})}
				)

			} else {
                toastStore.trigger({message : "Your appointement has not been deleted. Please try again" , autohide : true , background : "bg-error-400"})
			}
		};
	}}>

        <img class="w-1/3 self-center" src="/illustrations/reservationDelete.png" alt="delete reservation">
        <p class="text-2xl font-semibold text-center">My appointement</p>
        <AppointmentDetails {data}/>
        <input name="id" class="hidden" value={data.appointment._id}/>

        <button class="btn variant-filled-primary mt-4">Cancel your appointement</button>
    </form>
    <Toast/>
</div>
