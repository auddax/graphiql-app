import EditorStore from "./editorStore";
import SchemaStore from "./schemaStore";
import AuthStore from "./authStore";

class RootStore {
  schemaStore: SchemaStore;
  editorStore: EditorStore;
  authStore: AuthStore;

  
  constructor() {
    this.schemaStore = new SchemaStore(this);
    this.authStore = new AuthStore(this);
    this.editorStore = new EditorStore(this);
  }
}

export default RootStore;