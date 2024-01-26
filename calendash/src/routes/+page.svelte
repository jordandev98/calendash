<script>

    import Icon from "@iconify/svelte";

    const statistics = [

        {
            title: "90%",
            description: "of clients prefer Calendash over traditional booking"
        },
        {
            title: "200h+",
            description: "saved annualy from appointments scheduling"
        },
        {
            title: "30%",
            description: "increase in booked appointments"
        },
    ]
</script>

<div class="flex flex-col self-center w-11/12 min-h-screen gap-8 items-center">
    <div class="flex flex-col items-center justify-center pt-32 gap-8">
        <div class="flex flex-col justify-center gap-8">
                <p class="text-5xl font-bold break-words">The simple way to manage your online appointments </p>

            <p class="text-lg text-gray-600 ">Stop wasting time with appointments. A smart scheduling app that allows you to book appointments online and sync them with Google Calendar for smooth management. </p>

            <div class="flex flex-col items-center gap-4">
                <p class="text-gray-600 text-center">Get your booking page for free !</p>
                <button class="btn rounded-xl font-semibold border-2 flex items-center gap-2 hover:border-surface-900">Continue with Google
                    <Icon icon="flat-color-icons:google" width="32"/>
                </button>
                <p>No credit card required.</p>
            </div>
        </div>


    </div>

    <div class="grid grid-cols-1 lg:gr w-full gap-4">
        {#each statistics as stat}
            <div class="flex flex-col  items-center jus gap-4 border rounded-xl p-8">
                <p class="text-5xl font-semibold">{stat.title}</p>
                <p class="text-lg ">{stat.description}</p>

            </div>
        {/each}
    </div>


    <div>

    </div>
</div>
