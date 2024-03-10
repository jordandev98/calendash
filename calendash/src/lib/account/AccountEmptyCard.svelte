<script>
    export let title;
    export let description;

    export let action;

    export let link;
</script>


<div class="flex flex-col gap-4 items-center bg-gray-50 p-8 rounded border w-full">
    <h3 class="text-xl font-semibold">{title}</h3>
    <p class="text-center">{description}</p>

    <a href={link}>
        <button class="btn variant-filled-primary">{action}</button>
    </a>
</div>