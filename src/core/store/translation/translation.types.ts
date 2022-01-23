import {TranslationModel} from "../../models/translation/translation.model";

export interface ITranslationState {
    loading: boolean;
    translations: TranslationModel[];
    translationSelected: TranslationModel;
    error: any | null;
}
