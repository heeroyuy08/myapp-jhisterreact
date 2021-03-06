/* global: require*/
import * as counterpart from 'counterpart';
import { setLocale } from '../reducers/locale';
import Storage from '../shared/util/storage-util';

const mergeTranslations = requireContext => requireContext.keys().reduce(
  (merged, key) => ({ ...merged, ...requireContext(key) }),
  {}
);

const translations = {
   en: mergeTranslations(require.context('../../i18n/en', false, /.json$/))
};

let currentLocale;
const savedLocale = Storage.local.get('locale', 'en');

export const locales = Object.keys(translations);

export const registerLocales = store => {
  locales.forEach(key => {
    counterpart.registerTranslations(key, translations[key]);
  });
  store.subscribe(() => {
    const previousLocale = currentLocale;
    currentLocale = store.getState().locale.currentLocale;
    if (previousLocale !== currentLocale) {
      Storage.local.set('locale', currentLocale);
      counterpart.setLocale(currentLocale);
    }
  });
  store.dispatch(setLocale(savedLocale));
  return savedLocale;
};
