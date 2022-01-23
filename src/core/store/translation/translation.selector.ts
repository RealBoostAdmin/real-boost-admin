import {RootState} from '../store.reducer';

export const Translations = (store: RootState) => {
    return store.translation.translations
};

export const TranslationSelected = (store: RootState) => store.translation.translationSelected;
