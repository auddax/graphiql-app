import SchemaStore from "./schemaStore";
import AuthStore from "./authStore";

class RootStore {
  schemaStore: SchemaStore;
  authStore: AuthStore;

  
  constructor() {
    this.schemaStore = new SchemaStore(this);
    this.authStore = new AuthStore(this);
  }
}

export default RootStore;