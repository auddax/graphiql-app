import { makeAutoObservable } from 'mobx';
import RootStoreModel from './rootStore';

class AuthStore {
  rootStore: RootStoreModel;

  constructor(rootStore: RootStoreModel) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }
}

export default AuthStore;
