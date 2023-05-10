import { makeAutoObservable } from 'mobx';
import RootStoreModel from './rootStore';

class EditorStore {
  rootStore: RootStoreModel;
  queryValue: string | undefined;

  constructor(rootStore: RootStoreModel) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  setQueryValue(queryValue: string | undefined) {
    this.queryValue = queryValue;
  }
}

export default EditorStore;
