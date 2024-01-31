<script>

    import Icon from "@iconify/svelte";
    import {Accordion, AccordionItem} from "@skeletonlabs/skeleton";

    const statistics = [
        {
            title: "90%",
            description: "of clients prefer Calendash over traditional booking"
        },
        {
            title: "250h+",
            description: "saved annually from phone appointments scheduling"
        },
        {
            title: "-99%",
            description: "headache caused by appointments. Manage your booking schedule like a pro with Google Agenda"
        },
        {
            title: "Adaptable",
            description: "Calendash is suited for hairdressers, lawyers, doctors, teachers, and many others"
        },
        {
            title: "+30%",
            description: "increase in revenue by expanding the number of appointments"
        },
        {
            title: "+90%",
            description: "client satisfaction thanks to our simple 24/7 online scheduling system."
        },
    ];

    const faq = [
        {
            "question": "Why should I switch to Calendash when traditional methods have been working fine for me?",
            "answer": "While traditional methods may have served you well, Calendash offers a more efficient and user-friendly experience. Our online scheduling tool saves time, prevents double bookings, and provides a seamless integration with Google Calendar, ultimately enhancing your overall productivity."
        },
        {
            "question": "Isn't online scheduling too impersonal for my clients?",
            "answer": "Not at all. Calendash is designed to enhance the booking experience for both you and your clients. It provides them with the flexibility to schedule appointments at their convenience, while you can focus on delivering a personalized service during their appointments."
        },
        {
            "question": "How can I be sure that Calendash is secure and my data is safe?",
            "answer": "Security is a top priority for Calendash. We use advanced encryption protocols to ensure the safety of your data. Additionally, we regularly update our security measures to stay ahead of potential threats, providing you with a secure and reliable platform for your appointment scheduling needs."
        },
        {
            "question": "Will I lose control over my schedule with an online tool?",
            "answer": "Quite the opposite. Calendash gives you more control over your schedule. You can easily manage your availability, set preferences, and make adjustments as needed. The tool empowers you to have a clearer overview of your appointments, reducing the risk of scheduling conflicts."
        },
        {
            "question": "What if my clients are not tech-savvy? Won't they find it difficult to use Calendash?",
            "answer": "Calendash is designed with simplicity in mind. It has an intuitive interface that is easy for both tech-savvy and non-tech-savvy users. We also provide comprehensive guides and support to ensure a smooth onboarding process for you and your clients."
        }
    ]


</script>

<div class="flex flex-col self-center w-11/12 min-h-screen gap-32 items-center py-20">
    <div class="flex flex-col items-center justify-around gap-4">
        <div class="flex justify-center flex-col  gap-8 w-9/12">
            <p class="text-5xl xl:text-7xl font-bold break-words text-center">The easy online booking solution </p>

            <p class="text-lg text-gray-600 text-center">Stop wasting time with appointments. A smart scheduling app
                that allows you to book appointments online and sync them with Google Calendar for smooth
                management. </p>

            <div class="flex flex-col items-center gap-2">
                <p class="text-lg font-semibold text-gray-600 text-center">Get your booking page for free !</p>
                <button class="btn rounded-xl bg-gray-50 font-semibold border-2 flex items-center gap-2 hover:border-surface-900">
                    Continue with Google
                    <Icon icon="flat-color-icons:google" width="32"/>
                </button>
            </div>
        </div>
        <img class="w-full xl:w-9/12 hidden lg:block" src="/landingPage/main.png" alt="calendar demonstration"/>
        <img class="w-full max-w-sm lg:hidden" src="/landingPage/mainMobile.png" alt="calendar demonstration"/>
    </div>
    <div class="flex flex-col w-full gap-8">

        <h2 class="text-3xl font-semibold">Save time over phone booking</h2>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
                <div class="flex flex-col gap-4 w-full">
                    <p>Calendash is an online appointment tool that eliminates the need for lengthy phone calls or managing
                        paper
                        calendars. Clients can effortlessly schedule appointments online based on their availability and
                        preferences. Our system seamlessly syncs with Google Calendar, preventing double bookings and
                        oversights.
                        Experience increased efficiency and peace of mind as you reclaim valuable time.</p>

                    <button class="btn rounded-xl font-semibold bg-gray-50 border-2 flex items-center gap-2 hover:border-surface-900 break-words">
                        Save time now
                        <Icon icon="flat-color-icons:google" width="32"/>
                    </button>
                </div>

                <div class="w-full">
                    <img src="/landingPage/savetime.png" alt="save time by taking online appointment"/>
                </div>
            </div>
        <h2 class="text-3xl font-semibold">Manage your schedule with simplicty</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            <div class="flex flex-col gap-4 w-full">
                <p>Calendash is an online appointment tool that eliminates the need for lengthy phone calls or managing
                    paper
                    calendars. Clients can effortlessly schedule appointments online based on their availability and
                    preferences. Our system seamlessly syncs with Google Calendar, preventing double bookings and
                    oversights.
                    Experience increased efficiency and peace of mind as you reclaim valuable time.</p>

                <button class="btn rounded-xl font-semibold bg-gray-50 border-2 flex items-center gap-2 hover:border-surface-900 break-words">
                    Save time now
                    <Icon icon="flat-color-icons:google" width="32"/>
                </button>
            </div>

            <div class="w-full">
                <img src="/landingPage/savetime.png" alt="save time by taking online appointment"/>
            </div>
        </div>
        <h2 class="text-3xl font-semibold">Versatile</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            <div class="flex flex-col gap-4 w-full">
                <p>Calendash is an online appointment tool that eliminates the need for lengthy phone calls or managing
                    paper
                    calendars. Clients can effortlessly schedule appointments online based on their availability and
                    preferences. Our system seamlessly syncs with Google Calendar, preventing double bookings and
                    oversights.
                    Experience increased efficiency and peace of mind as you reclaim valuable time.</p>

                <button class="btn rounded-xl font-semibold bg-gray-50 border-2 flex items-center gap-2 hover:border-surface-900 break-words">
                    Save time now
                    <Icon icon="flat-color-icons:google" width="32"/>
                </button>
            </div>

            <div class="w-full">
                <img src="/landingPage/savetime.png" alt="save time by taking online appointment"/>
            </div>
        </div>
        <h2 class="text-3xl font-bold">How does it works ?</h2>
        <div class="flex flex-col w-full">
            <h4 class="text-lg font-semibold">Create your page for free</h4>
            <h4 class="text-lg font-semibold">Create or link a new Google Agenda</h4>
            <h4 class="text-lg font-semibold">Set up your work schedule</h4>
            <h4 class="text-lg font-semibold">Create events types</h4>
            <h4 class="text-lg font-semibold">Start taking online appointements</h4>
        </div>

    </div>
    <div class="flex flex-col gap-8">
        <h2 class="text-3xl font-bold">Calendash benefits</h2>
        <div class="self-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:w-2/3 lg:gr w-full gap-4 ">
            {#each statistics as stat}
                <div class="flex flex-col  items-center jus gap-4 border rounded-xl p-8 bg-gray-50">
                    <p class="text-2xl font-semibold text-center">{stat.title}</p>
                    <p class="text-lg ">{stat.description}</p>
                </div>
            {/each}
            <button class="btn variant-glass">See more</button>
        </div>
    </div>
    <div class="block w-full">
        <h2 class="text-3xl font-bold mb-8">Frequently asked questions</h2>
        <div class=" bg-gray-50 rounded-xl border px-8 py-4 self-center">
            <Accordion>
                {#each faq as faqItem , i}
                    <AccordionItem open={i ===0}>
                        <svelte:fragment slot="summary"><span class="font-semibold">{faqItem.question}</span>
                        </svelte:fragment>
                        <svelte:fragment slot="content">{faqItem.answer}</svelte:fragment>
                    </AccordionItem>
                {/each}
            </Accordion>
        </div>
    </div>

</div>
