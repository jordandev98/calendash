import {localStorageStore} from '@skeletonlabs/skeleton';
import {langStrings} from "../text/langText.js";


export const langStore = localStorageStore('lang', 'en');

export const setNewLang = (lang) => {
    langStore.set(lang);
}