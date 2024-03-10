<script>

    import {authStore} from "../../store/store.js";
    import Icon from "@iconify/svelte";
    import {getToastStore, Toast} from "@skeletonlabs/skeleton";
    import {langStrings} from "../../text/langText.js";
    import {langStore} from "../../store/langStore.js";


</script>

<div class="flex items-center justify-center pt-12 w">
        <form class="flex items-center  flex-col gap-8 px-16 py-8 border bg-gray-50 rounded w-11/12" method="post" action="?/OAuth2">
            <!-- Separator between social media sign in and email/password sign in -->

            <div class="flex flex-col items-center gap-8">
                <div class=" flex flex-col items-center gap-2">
                    <img src="/logo.png" alt="logo.png" class=" aspect-square w-20">
                    <p class="text-4xl font-extrabold">{langStrings[$langStore]["loginPageTitle"]}</p>
                </div>
                <p>{langStrings[$langStore]["loginPageParagraph"]}</p>
            </div>

            <div class="grid grid-cols-1 gap-4">
                <button class="btn rounded-xl font-semibold border-2 flex items-center gap-2">{langStrings[$langStore]["continueWithGoogle"]}
                    <Icon icon="flat-color-icons:google" width="32"/>
                </button>
            </div>
        </form>
        <Toast/>
</div>
