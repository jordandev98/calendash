<script>
    import {fly} from 'svelte/transition'

    export let url;
</script>

{#key url}

    <div in:fly={{y: -50 , duration : 250 , delay : 200}}
         out:fly={{y: -50 , duration : 250}}>
        <slot/>
    </div>
{/key}