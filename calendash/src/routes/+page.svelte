<script>

    import Icon from "@iconify/svelte";
    import {Accordion, AccordionItem} from "@skeletonlabs/skeleton";
    import {langStore} from "../store/langStore.js";
    import {faq, langStrings} from "../text/langText.js";



    let langKey = "en";
    langStore.subscribe((lang) => {
        langKey = lang;
    });

</script>

<div class="flex flex-col self-center w-11/12 min-h-screen gap-32 items-center py-20 md:w-9/12">
    <div class="flex flex-col items-center justify-around gap-4">
        <div class="flex justify-center flex-col  gap-8 ">
            <p class="text-6xl sm:text-7xl xl:text-8xl font-extrabold break-words text-center">{langStrings[langKey]["hookHeadline"]}</p>

            <p class="text-xl  text-center">{langStrings[langKey]["hookDescription"]} </p>

            <div class="flex flex-col items-center gap-2">
                <p class="text-lg font-semibold text-gray-600 text-center">{langStrings[langKey]["hookAction"]}</p>
                <button class="btn rounded-xl bg-gray-50 font-semibold border-2 flex items-center gap-2 hover:border-surface-900">
                    {langStrings[langKey]["continueWithGoogle"]}
                    <Icon icon="flat-color-icons:google" width="32"/>
                </button>
            </div>
        </div>
        <img class="w-full xl:w-9/12 hidden lg:block" src="/landingPage/main.png" alt="calendar demonstration"/>
        <img class="w-full max-w-sm lg:hidden" src="/landingPage/mainMobile.png" alt="calendar demonstration"/>
    </div>
    <div class="flex flex-col w-full gap-32">

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            <div class="flex flex-col gap-4 w-full">

                <h2 class="text-4xl font-semibold">{langStrings[langKey]["timeSavingTitle"]}</h2>
                <p class="text-xl">{langStrings[langKey]["timeSavingParagraph1"]} <span
                            class="font-bold">{langStrings[langKey]["timeSavingBold1"]}</span>
                    {langStrings[langKey]["timeSavingParagraph2"]} <span
                            class="font-bold">{langStrings[langKey]["timeSavingBold2"]}</span> {langStrings[langKey]["timeSavingParagraph3"]}</p>

                <button class="btn rounded-xl font-semibold bg-gray-50 border-2 flex items-center gap-2 hover:border-surface-900 break-words">
                    {langStrings[langKey]["createYourPageForFree"]}
                    <Icon icon="flat-color-icons:google" width="32"/>
                </button>
            </div>

            <div class="w-full">
                <img src="/landingPage/savetime.png" alt="save time by taking online appointment"/>
            </div>
        </div>

        <div class="flex flex-col items-center md:flex-row md:items-start gap-8">
            <div class="w-full max-w-sm">
                <img src="/landingPage/gCal.png" alt="save time by taking online appointment"/>
            </div>
            <div class="flex flex-col gap-4 w-full">
                <h2 class="text-4xl font-semibold">{langStrings[langKey]["manageSimplyTitle"]}</h2>
                <p class="text-xl">{langStrings[langKey]["manageSimplyParagraph"]}</p>

                <button class="btn rounded-xl font-semibold bg-gray-50 border-2 flex items-center gap-2 hover:border-surface-900 break-words">
                    {langStrings[langKey]["saveTimeNow"]}
                    <Icon icon="flat-color-icons:google" width="32"/>
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            <div class="flex flex-col gap-4 w-full">
                <h2 class="text-4xl font-semibold">{langStrings[langKey]["versatileTitle"]}</h2>
                <p class="text-xl">{langStrings[langKey]["versatileParagraph"]}</p>

                <button class="btn rounded-xl font-semibold bg-gray-50 border-2 flex items-center gap-2 hover:border-surface-900 break-words">
                    {langStrings[langKey]["seeExamples"]}
                </button>
            </div>

<!--            <div class="w-full">-->
<!--                <img src="/landingPage/savetime.png" alt="save time by taking online appointment"/>-->
<!--            </div>-->
        </div>

    </div>

    <div class="block w-full">
        <h2 class="text-3xl font-bold mb-8"> {langStrings[langKey]["faqTitle"]}</h2>
        <div class=" bg-gray-50 rounded-xl border px-8 py-4 self-center">
            <Accordion>
                {#each faq[langKey] as faqItem , i}
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
