<script>
    import {getModalStore} from "@skeletonlabs/skeleton";

    const modalStore = getModalStore();
</script>

{#if $modalStore[0]}
    <div class="modal-example-form {cBase}">
        <header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
        <article>{$modalStore[0].body ?? '(body missing)'}</article>
        <!-- Enable for debugging: -->
        <form method="post" action="?/deleteEvent">
            <label class="label">
                <span>Name</span>
                <input class="input" type="text" bind:value={formData.name} placeholder="Enter name..." />
            </label>
            <label class="label">
                <span>Phone Number</span>
                <input class="input" type="tel" bind:value={formData.tel} placeholder="Enter phone..." />
            </label>
            <label class="label">
                <span>Email</span>
                <input class="input" type="email" bind:value={formData.email} placeholder="Enter email address..." />
            </label>
        </form>
        <!-- prettier-ignore -->
            <button class="btn variant-glass-primary" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
            <button class="btn variant-filled-primary" on:click={onFormSubmit}>Submit Form</button>

    </div>
{/if}

