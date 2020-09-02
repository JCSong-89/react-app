import { createStore } from "redux";
import root from "./root";

const configure = () => {
  const devTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();
  const store = createStore(root, devTools);

  return store;
};

export default configure;
