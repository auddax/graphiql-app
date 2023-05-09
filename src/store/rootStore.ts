import EditorStore from "./editorStore";
import SchemaStore from "./schemaStore";

class RootStore {
  schemaStore: SchemaStore;
  editorStore: EditorStore;
  
  constructor() {
    this.schemaStore = new SchemaStore(this);
    this.editorStore = new EditorStore(this);
  }
}

export default RootStore;