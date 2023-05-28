import { makeAutoObservable } from 'mobx';
import RootStoreModel from './rootStore';

class LocaleStore {
  rootStore: RootStoreModel;
  locale: string;

  constructor(rootStore: RootStoreModel) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.locale = localStorage.getItem('locale') || 'ru';
  }

  setLocale(locale: string) {
    this.locale = locale
    if (this.locale) localStorage.setItem('locale', this.locale);
  }
}

export default LocaleStore;
