import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import config from '../../config.json';
import RootStoreModel from './rootStore';

const { query, variables, headers } = config.api.placeholders;

class EditorStore {
  rootStore: RootStoreModel;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | undefined;
  queryValue: string | undefined;
  variablesValue: string | undefined;
  headersValue: string | undefined;
  responseData: object | undefined;

  constructor(rootStore: RootStoreModel) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.isLoading = false;
    this.isError = false;
    this.queryValue = localStorage.getItem('query') || query;
    this.variablesValue = localStorage.getItem('variables')  || variables;
    this.headersValue = localStorage.getItem('headers') || headers;
  }

  sendRequest() {
    this.isLoading = true;
    this.isError = false;
    this.errorMessage = '';

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
        runInAction(() => {
          this.responseData = error.response.data;
          this.isError = true;
          this.errorMessage = error.message;
          this.isLoading = false;  
        });
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
