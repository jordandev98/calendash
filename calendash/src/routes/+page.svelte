<script>

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

<div class="flex flex-col self-center w-11/12 min-h-screen">
    <div class="flex flex-col items-center justify-center h-[35vh] gap-8">
        <div class="flex flex-col justify-center  gap-2">
            <div>
                <p class="text-5xl font-bold text-center break-words">The easy solution manage appointments </p>
            </div>
            <p class="text-2xl text-surface-800 text-center">You are 5 minutes away to start taking online appointements !</p>
            <button class="button">Connect to your Google Calendar app & get started</button>

        </div>
        <div class="flex flex-col gap-2 items-center">
            <button class="btn-xl rounded-full variant-filled">Start for free !</button>

            <p>No credit card required</p>
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
