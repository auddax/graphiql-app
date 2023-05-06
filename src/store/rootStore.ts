import SchemaStore from "./schemaStore";

class RootStore {
  schemaStore: SchemaStore;
  
  constructor() {
    this.schemaStore = new SchemaStore(this);
  }
}

export default RootStore;