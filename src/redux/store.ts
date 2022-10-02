import { combineReducers, createStore } from 'redux';
import { userAuthReducer } from './Auth';

const saveToLocalStorage = (state: RootReducerInterface): void => {
  try {
    const serializatedState = JSON.stringify(state);
    localStorage.setItem('persistanStateAviato', serializatedState);
  } catch (e) {
    console.warn(e);
  }
};

const loadLocalStorageData = (): RootReducerInterface | undefined => {
  try {
    const serializatedState = localStorage.getItem('persistanStateAviato');
    if (serializatedState === null) return undefined;
    return JSON.parse(serializatedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};

const rootReducer = combineReducers({
  user: userAuthReducer,
});

type RootReducerInterface = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  loadLocalStorageData(),
);
store.subscribe(() => saveToLocalStorage(store.getState()));

export { store, rootReducer };
export type { RootReducerInterface };
