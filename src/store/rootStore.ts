import SchemaStore from "./schemaStore";
import AuthStore from "./authStore";
import EditorStore from "./editorStore";

class RootStore {
  schemaStore: SchemaStore;
  authStore: AuthStore;
  editorStore: EditorStore;

  constructor() {
    this.schemaStore = new SchemaStore(this);
    this.authStore = new AuthStore(this);
    this.editorStore = new EditorStore(this);
  }
}

export default RootStore;