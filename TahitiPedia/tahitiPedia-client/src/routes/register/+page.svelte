<script>
    import {popup, Toast, toastStore} from '@skeletonlabs/skeleton';
    import {PUBLIC_BASE_URL} from "$env/static/public";

    let user = {
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    }
    let repeatPassword = "";
    let registerData;
    const handleRegister = async () => {
        const res = await fetch(`${PUBLIC_BASE_URL}/user/register`, {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(user)
        })
        registerData = await res.json();
        if (res.status > 299) {
            toastStore.trigger({...registerData, background: 'variant-ghost-error',})
        } else {
            toastStore.trigger({message: "Inscription réussite", background: 'variant-ghost-success'})
        }
    }


    const hoverPasswordLength = {
        event: 'hover',
        target: 'hoverPasswordLength',
        placement: 'top'
    };
    const hoverPasswordRepeat = {
        event: 'hover',
        target: 'hoverPasswordRepeat',
        placement: 'top'
    };

</script>


<div class=" flex w-full h-screen items-center justify-center flex-col gap-4">
    <div class="card p-8 flex flex-col items-center">
        <div class="flex items-center gap-2">
            <img src="/image/logo.png" class="w-12" alt="logo"/>
            <p class="text-2xl font-bold">One Fenua</p>
        </div>
        <div class=" flex flex-col lg:w-2/6 md:w-400 p-4 gap-4 items-center">

            <p class="text-2xl font-bold">
                Créer un compte
            </p>
            <form class="flex flex-col gap-4 w-full" on:submit={handleRegister}>
                <div class="flex gap-4">
                    <label class="label">
                        <span>Prénom</span>
                        <input name="prénom" class="input" type="text" bind:value={user.firstName}/>
                    </label>
                    <label class="label">
                        <span>Nom</span>
                        <input name="nom" class="input" type="text" bind:value={user.lastName}/>
                    </label>

                </div>

                <label class="label">
                    <span>Email</span>
                    <input name="email" class="input" type="email" bind:value={user.email}/>
                </label>
                <label class="label">
                    <span>Mot de passe</span>
                    <input name="password" class="input" use:popup={hoverPasswordLength} type="password"
                           bind:value={user.password}/>
                </label>

                <div class={user.password.length > 7 ? "card p-4 variant-outline-success" : "card p-4 variant-outline-error"}
                     data-popup="hoverPasswordLength">
                    <p>Le mot de passe contenir au moins 8 caractères</p>
                </div>

                <label class="label">
                    <span>Répétez le mot de passe </span>
                    <input name="password" class="input" type="password" bind:value={repeatPassword}
                           use:popup={hoverPasswordRepeat}/>
                </label>

                <div class={user.password === repeatPassword ? "card p-4 variant-outline-success" : "card p-4 variant-outline-error"}
                     data-popup="hoverPasswordRepeat">
                    <p>Les mots de passe doivent correspondre</p>
                </div>

                <div></div>

                {#if user.password.length > 7 && user.password === repeatPassword  }
                    <button class="btn variant-filled-primary" type="submit"> Inscription</button>
                {:else}
                    <div class="flex flex-col gap-4">
                        <button class="btn variant-glass-primary w-full" disabled> Créer un compte</button>
                    </div>

                {/if}


            </form>

        </div>
    </div>


    <Toast/>
</div>
