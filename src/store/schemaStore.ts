import { makeAutoObservable, runInAction, toJS } from 'mobx';
import RootStoreModel from './rootStore';
import config from '../../config.json';
import { ISchema, IField, IType, ITypeField } from '../types'
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
  responseSchema: ISchema | undefined;
  responseType: IType | undefined;
  schemaView: string;
  schemaTypeName: string | undefined;
  schemaFieldName: string | undefined;

  constructor(rootStore: RootStoreModel) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.isLoading = false;
    this.isError = false;
    this.schemaView = 'root';
    this.queryValue = queryTypes;
    this.headersValue = localStorage.getItem('headers') || headers;
  }

  requestSchema() {
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
          this.responseSchema = result.data;
          this.isLoading = false;
        });
      }
    ).catch(error => {
      runInAction(() => {
        this.responseSchema = error.response.data;
        this.isError = true;
        this.errorMessage = error.message;
        this.isLoading = false;  
      });
    });
  }

  requestType() {
    this.isLoading = true;
    this.isError = false;
    this.errorMessage = '';
    if (this.schemaTypeName) {
      axios.post(
        config.api.baseUrl,
        {
          query: `{
            __type(name: "${this.schemaTypeName}") {
              fields {
                name
                description
                type {
                  name
                }
              }
            }
          }`
        },
        {
          headers: JSON.parse(this.headersValue || '{}'),
        }
      ).then(result => {
          runInAction(() => {
            this.responseType = result.data;
            this.isLoading = false;
          });
        }
      ).catch(error => {
        runInAction(() => {
          this.responseSchema = error.response.data;
          this.isError = true;
          this.errorMessage = error.message;
          this.isLoading = false;  
        });
      });
    }
  }

  setSchemaView(view: string) {
    runInAction(() => {
      this.schemaView = view;
    })
  }

  setSchemaТypeName(name: string) {
    runInAction(() => {
      this.schemaTypeName = name;
    })
  }

  setSchemaFieldName(name: string) {
    runInAction(() => {
      this.schemaFieldName = name;
    })
  }


  get getFields() {
    let fields: IField[] | undefined = [];
    if (this.responseSchema) {
      fields = this.responseSchema?.data?.__schema?.queryType?.fields;
    }
    return fields;
  }

  get getTypes() {
    let types: ITypeField[] | undefined = [];
    if (this.responseType) {
      types = this.responseType?.data?.__type?.fields;
    }
    return types;
  }

  get getSchemaTypeName() {
    let name;
    if (this.schemaTypeName) {
      name = this.schemaTypeName;
    }
    return name;
  }

  get getSchemaFieldName() {
    let name;
    if (this.schemaFieldName) {
      name = this.schemaFieldName;
    }
    return name;
  }


}

export default SchemaStore;
