import AuthStore from "./authStore";
import EditorStore from "./editorStore";
import LocaleStore from "./localeStore";
import SchemaStore from "./schemaStore";

class RootStore {
  authStore: AuthStore;
  editorStore: EditorStore;
  localeStore: LocaleStore;
  schemaStore: SchemaStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.editorStore = new EditorStore(this);
    this.localeStore = new LocaleStore(this);
    this.schemaStore = new SchemaStore(this);
  }
}

export default RootStore;