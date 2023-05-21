import { makeAutoObservable, runInAction, toJS } from 'mobx';
import axios from 'axios';
import config from '../../config.json';
import RootStoreModel from './rootStore';

class EditorStore {
  rootStore: RootStoreModel;
  isLoading: boolean;
  isError: boolean;
  queryValue: string | undefined;
  variablesValue: string | undefined;
  headersValue: string | undefined;
  responseData: object | undefined;

  constructor(rootStore: RootStoreModel) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.isLoading = false;
    this.isError = false;
    this.queryValue = localStorage.getItem('query') || undefined;
    this.variablesValue = localStorage.getItem('variables')  || undefined;
    this.headersValue = localStorage.getItem('headers') || '{ "Content-Type": "application/json" }';
  }

  sendRequest() {
    this.isLoading = true;
    this.isError = false;
    axios.post(
      config.api.baseUrl,
      {
        query: this.queryValue,
        variables: JSON.parse(this.variablesValue || '{}'),
      },
      {
        headers: JSON.parse(this.headersValue || '{}'),
      }
    ).then(result => {
        runInAction(() => {
          this.responseData = result.data;
          this.isLoading = false;
        });
      }
    ).catch(error => {
      runInAction(() => {
        this.isError = true;
        this.isLoading = false;
      })
    });
  }

  setQueryValue(queryValue: string | undefined) {
    this.queryValue = queryValue;
    if (this.queryValue) localStorage.setItem('query', this.queryValue);
  }

  setVariablesValue(variablesValue: string | undefined) {
    this.variablesValue = variablesValue;
    if (this.variablesValue) localStorage.setItem('variables', this.variablesValue);
  }

  setHeadersValue(headersValue: string | undefined) {
    this.headersValue = headersValue;
    if (this.headersValue) localStorage.setItem('headers', this.headersValue);
  }
}

export default EditorStore;
