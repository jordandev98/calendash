<script>
    import {langStrings} from "../text/langText.js";
    import {langStore} from "../store/langStore.js";
</script>

<div class="flex flex-col p-8 border border-t gap-8">
    <a href="/" class="flex ">
        <img src="/logo.png" alt="logo.png" class="aspect-square w-10">
        <p class="text-2xl font-semibold">Calendash</p>
    </a>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 font-bold text-slate-500 pb-8">
        <a href="/product">{langStrings[$langStore]["productMenu"]}</a>
        <a href="/product">{langStrings[$langStore]["pricingMenu"]}</a>
        <a href="/account">{langStrings[$langStore]["accountMenu"]}</a>
        <a href="/product">{langStrings[$langStore]["helpMenu"]}</a>
        <a href="/product">{langStrings[$langStore]["privacyMenu"]}</a>
        <a href="/product">{langStrings[$langStore]["termsMenu"]}</a>
    </div>
</div>