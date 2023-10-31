<script>
    import {PUBLIC_BASE_URL} from "$env/static/public";
    import {SlideToggle, Toast, toastStore} from '@skeletonlabs/skeleton';
    import {userStore} from "../../stores/userStore.js";
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";
    import {navStore} from "../../stores/navStore.js";

    let email = ""
    let password = ""
    let loginData = ""
    let rememberMe = false;

    onMount(()=> {
        navStore.set("login")
    })

    const handleLogin = async () => {
        const res = await fetch(`${PUBLIC_BASE_URL}/user/login`, {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({"email": email, "password": password}),
            withCredentials: true,
            credentials : "include"
        })
        loginData = await res.json();
        if (res.status > 299) {
            toastStore.trigger({...loginData, background: 'variant-ghost-error'})
            return
        }

        userStore.set(loginData)
        document.cookie = `user=${loginData.refreshToken}`
        document.cookie = `token=${loginData.token}`
        await goto("/")
    }


</script>
<div class="flex w-full h-screen items-center justify-center flex-col gap-4 px-6">
    <div class="flex flex-col items-center card w-full md:w-2/3 xl:w-4/12 gap-4 p-8 w-xl rounded">
        <div class="flex items-center gap-2">
            <img src="/image/logo.png" class="w-12" alt="logo"/>
            <p class="text-2xl font-bold">One Fenua</p>
        </div>

        <div class="w-full space-y-4 md:space-y-6">

            <p class="text-2xl font-bold">
                Connectez-vous à votre compte
            </p>
            <form class="flex flex-col space-y-4 md:space-y-6" on:submit={handleLogin}>
                <div class="label text-lg">
                    <span>Email</span>
                    <input name="email" class="input" type="email" bind:value={email}/>
                </div>
                <label class="label text-lg">
                    <span>Mot de passe</span>
                    <input name="password" class="input" type="password" bind:value={password}/>
                </label>

                <div class="flex justify-between gap-1">
                    <div class="flex items-center gap-2">
                        <SlideToggle name="slider-large" bind:checked={rememberMe} active="bg-primary-500" size="sm"/>
                        <span>Se souvenir de moi ?</span>
                    </div>
                    <a class="anchor" href="/forgotPassword">Mot de passe oublié ?</a>

                </div>


                <button class="btn variant-filled-primary" type="submit">Connexion</button>

                <p>Pas encore de compte ? <a class="anchor" href="/register">Inscrivez-vous !</a></p>
            </form>
        </div>
        <Toast/>

    </div>
    </div>


