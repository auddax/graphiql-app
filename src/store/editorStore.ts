import { makeAutoObservable } from 'mobx';
import RootStoreModel from './rootStore';

class EditorStore {
  rootStore: RootStoreModel;

  constructor(rootStore: RootStoreModel) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }
}

export default EditorStore;
