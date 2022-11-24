import { useState } from "react";
import { AnyIfEmpty, useDispatch, useSelector } from "react-redux";
import { actionEvent } from "../common/utils";
import { RootReducerInterface } from "./store";
import { createCitiesService, listCitiesService, deleteCitiesService, updateCitiesService } from "../services/citiesServices";

/**
 * Action Types
 */
enum ContentActionsContants {
  SUCCES_CREATE_CITIES = "SUCCES_CREATE_CITIES",
  ERROR_CREATE_CITIES = "ERROR_CREATE_CITIES",
  SUCCES_LIST_CITIES = "SUCCES_LIST_CITIES",
  ERROR_LIST_CITIES = "ERROR_LIST_CITIES",
  SUCCES_DELETE_CITIES = "SUCCES_DELETE_CITIES",
  ERROR_DELETE_CITIES = "ERROR_DELETE_CITIES",
  SUCCES_UPDATE_CITIES = "UPDATE_CITIES",
  ERROR_UPDATE_CITIES = "ERROR_UPDATE_CITIES",
}

/**
 * Interfaces
 */
interface ContentBaseInterface {
  updateCities: any;
  newCities: INewCities[];
  cities: ICitiesItem[];
  deleteCities: number | null;
  loading: boolean;
}

export interface ICitiesItem { 
  id: number;
  name: string;
  id_business: number;
  id_user: number;
  created_at: string;
}

export interface INewCities {
  name: string;
  id_business: number;
  id_user: number;
}

export interface IUpdateCities {
  name: string;
  id_business: number;
  id_user: number;
}

const defaultCities: ICitiesItem[] = [];
const defaultNewCities: INewCities[] = [];

interface ICities extends ContentBaseInterface {
  CreateCitiesRedux: (payload: INewCities) => void;
  ListCitiesRedux: (id_business: number) => void;
  DeleteCitiesRedux: (id: number) => void;
  UpdateCitiesRedux: (id: number, payload: IUpdateCities) => void;
}

interface ReducerActionsInterface {
  type: ContentActionsContants;
  payload: ContentBaseInterface;
}

/**
 * Hooks
 */
const useCities = (): ICities => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const { cities, newCities, deleteCities, updateCities } = useSelector(
    (state: RootReducerInterface) => state.citiess
  );

 

  const CreateCitiesRedux = async (cities: INewCities): Promise<void> => {
    try {
      setLoading(true);
      const response = await createCitiesService(cities);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateCities: null,
        deleteCities: null,
        newCities: response,
        cities: defaultCities,
        loading,
      };
       
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_CREATE_CITIES,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const ListCitiesRedux = async (id_business: number): Promise<void> => {
    try {
      setLoading(true);
      const response = await listCitiesService(id_business);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateCities: null,
        deleteCities: null,
        newCities,
        cities: response,
        loading,
      };   
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_LIST_CITIES,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const DeleteCitiesRedux = async (id: number): Promise<void> => {
    try {
      setLoading(true);
      const response = await deleteCitiesService(id);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateCities: null,
        deleteCities: response,
        newCities,
        cities,
        loading,
      };   
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_DELETE_CITIES,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const UpdateCitiesRedux = async (id:number , changes : IUpdateCities): Promise<void> => {
    try {
      setLoading(true);
      const response = await updateCitiesService(id, changes);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateCities: response,
        deleteCities: null,
        newCities,
        cities,
        loading,
      };
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_UPDATE_CITIES,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };


 

  return {
    updateCities,
    deleteCities,
    newCities,
    cities,
    loading,
    CreateCitiesRedux,
    ListCitiesRedux,
    DeleteCitiesRedux,
    UpdateCitiesRedux,
  };
};

/**
 * Reducers
 */
const initialState: ContentBaseInterface = {
  updateCities: null,
  deleteCities: null,
  newCities: defaultNewCities,
  cities: defaultCities,
  loading: false,
};

const citiesReducer = (
  state = initialState,
  action: ReducerActionsInterface
): ContentBaseInterface => {
  switch (action.type) {
    case ContentActionsContants.SUCCES_CREATE_CITIES:
      return {
        ...state,
        newCities: action.payload.newCities,
      };
    case ContentActionsContants.SUCCES_LIST_CITIES:
      return {
        ...state,
        cities: action.payload.cities,
      };
    case ContentActionsContants.SUCCES_DELETE_CITIES:
      return {
        ...state,
        deleteCities: action.payload.deleteCities,
      };
    case ContentActionsContants.SUCCES_UPDATE_CITIES:
      return {
        ...state,
        updateCities: action.payload.updateCities,
      };
    default:
      return state;
  }
};

export { citiesReducer, useCities };
