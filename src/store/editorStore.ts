import { makeAutoObservable, runInAction, toJS } from 'mobx';
import axios from 'axios';
import RootStoreModel from './rootStore';

class EditorStore {
  rootStore: RootStoreModel;
  queryValue: string | undefined;
  queryVariables: string | undefined;
  headers: object | undefined;
  responseData: object | undefined;

  constructor(rootStore: RootStoreModel) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.queryValue = localStorage.getItem('query') || '';
    this.headers = {
      'Content-Type': 'application/json',
    }
  }

  sendRequest() {
    axios.post(
      'https://rickandmortyapi.com/graphql',
      {
        query: this.queryValue,
        variables: this.queryVariables,
      },
      {
        headers: this.headers,
      }
    ).then(result => {
      runInAction(() => {
        this.responseData = result.data;
      });
    });
  }

  setQueryValue(queryValue: string | undefined) {
    this.queryValue = queryValue;
    if (this.queryValue) localStorage.setItem('query', this.queryValue);
  }
}

export default EditorStore;
