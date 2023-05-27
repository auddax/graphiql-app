import { makeAutoObservable, runInAction } from 'mobx';
import RootStoreModel from './rootStore';
import config from '../../config.json';
import axios from 'axios';

const { headers } = config.api.placeholders;
const { queryTypes } = config.api.introspection.schema;

class SchemaStore {
  rootStore: RootStoreModel;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | undefined;
  queryValue: string | undefined;
  headersValue: string | undefined;
  responseData: object | undefined;

  constructor(rootStore: RootStoreModel) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.isLoading = false;
    this.isError = false;
    this.queryValue = queryTypes;
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
        this.responseData = error.response.data;
        this.isError = true;
        this.errorMessage = error.message;
        this.isLoading = false;  
      });
    });
  }

}

export default SchemaStore;
