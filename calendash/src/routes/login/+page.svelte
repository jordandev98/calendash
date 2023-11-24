<script>

    import {authHandler} from "../../store/store.js";
    import {onMount} from "svelte";


    function handleCredentialResponse(response) {
        console.log(response)
        authHandler.signInWithProvider(response.credential);
    }

    onMount(()=> {
        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_CALENDAR_CLIENT_ID,
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" }  // customization attributes
        );
    })

</script>


<div class="flex w-full h-full items-center justify-center ">

    <form class="flex items-center w-2/3 xl:w-1/3 flex-col gap-8 p-4">
        <!-- Separator between social media sign in and email/password sign in -->
        <div class="flex flex-col gap-4">
            <p class="text-4xl font-semibold">Sign in to your account</p>
        </div>

        <div id="buttonDiv">

        </div>
    </form>
</div>