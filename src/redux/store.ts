import { combineReducers, createStore } from 'redux';
import { userAuthReducer } from './Auth';
import { businessReducer } from './Business';
import { contractorReducer } from './Contractor';
import { aviatoReducer } from './Aviato';
import { citiesReducer } from './Cities';
import { jobsReducer } from './Jobs';
import { residentReducer } from './Resident';
import { constructionSiteReducer } from './ConstructionSite';
import { employeReducer } from './Employe';
import { resumePayReducer } from './ResumePay';
import { resumePayDataReducer } from './ResumePayData';
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
  aviato: aviatoReducer,
  user: userAuthReducer,
  business: businessReducer,
  contractor: contractorReducer,
  citiess: citiesReducer,
  jobss: jobsReducer,
  residents: residentReducer,
  constructionSites: constructionSiteReducer,
  employes: employeReducer,
  resumePays: resumePayReducer,
  resumePayDatas: resumePayDataReducer,
});

type RootReducerInterface = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  loadLocalStorageData(),
);
store.subscribe(() => saveToLocalStorage(store.getState()));

export { store, rootReducer };
export type { RootReducerInterface };
