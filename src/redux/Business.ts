import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionEvent } from "../common/utils";
import { RootReducerInterface } from "./store";
import { createBusinessService, listBusinessService, updateBusinessService } from "../services/businessServices";


/**
 * Action Types
 */
enum ContentActionsContants {
  SUCCES_CREATE_BUSINESS = "SUCCES_CREATE_BUSINESS",
  ERROR_CREATE_BUSINESS = "ERROR_CREATE_BUSINESS",
  SUCCES_LIST_BUSINESS = "SUCCES_LIST_BUSINESS",
  ERROR_LIST_BUSINESS = "ERROR_LIST_BUSINESS",
  SUCCES_DELETE_BUSINESS = "SUCCES_DELETE_BUSINESS",
  ERROR_DELETE_BUSINESS = "ERROR_DELETE_BUSINESS",
  SUCCES_UPDATE_BUSINESS = "UPDATE_BUSINESS",
  ERROR_UPDATE_BUSINESS = "ERROR_UPDATE_BUSINESS",
}

/**
 * Interfaces
 */
interface ContentBaseInterface {
  updateBusiness: IBusinessItem;
  newBusiness: IBusinessItem[];
  business: IBusinessItem[];
  loading: boolean;
}

export interface IBusinessItem { 
  id: number;
  name: string;
  reg_patronal: string;
  rfc: string;
  id_user: number;
  created_at: string;
}

export interface IUpdateBusiness {
  id: number;
  name: string;
  reg_patronal: string;
  rfc: string;
};

export interface INewBusiness {
  name: string;
  reg_patronal: string;
  rfc: string;
}

const defaultBusiness: IBusinessItem[] = [];
const defaultUpdateBusiness: IBusinessItem = { id: 0, name: "", reg_patronal: "", rfc: "", id_user: 0, created_at: "" };

interface IBusiness extends ContentBaseInterface {
  CreateBusinessRedux: (payload: INewBusiness) => void;
  ListBusinessRedux: (id_user: number) => void;
  UpdateBusinessRedux: (id: number, changes: INewBusiness) => void;
}

interface ReducerActionsInterface {
  type: ContentActionsContants;
  payload: ContentBaseInterface;
}

/**
 * Hooks
 */
const useBusiness = (): IBusiness => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const { business, newBusiness, updateBusiness } = useSelector(
    (state: RootReducerInterface) => state.business
  );

  const CreateBusinessRedux = async (business: INewBusiness): Promise<void> => {
    try {
      setLoading(true);
      const response = await createBusinessService(business);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateBusiness,
        newBusiness: response,
        business: [],
        loading,
      };
       
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_CREATE_BUSINESS,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const ListBusinessRedux = async (business: any): Promise<void> => {
    try {
      setLoading(true);
      const response = await listBusinessService(business);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateBusiness,
        newBusiness,
        business: response,
        loading,
      };
       
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_LIST_BUSINESS,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const UpdateBusinessRedux = async (id: number, changes: INewBusiness): Promise<void> => {
    console.log("🚀 ~ file: Business.ts ~ line 125 ~ UpdateBusinessRedux ~ changes", changes)
    try {
      setLoading(true);
      const response = await updateBusinessService(id, changes);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateBusiness: response,
        newBusiness,
        business,
        loading,
      };
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_UPDATE_BUSINESS,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

 

  return {
    updateBusiness,
    newBusiness,
    business,
    loading,
    CreateBusinessRedux,
    ListBusinessRedux,
    UpdateBusinessRedux
  };
};

/**
 * Reducers
 */
const initialState: ContentBaseInterface = {
  updateBusiness: defaultUpdateBusiness,
  newBusiness: defaultBusiness,
  business: defaultBusiness,
  loading: false,
};

const businessReducer = (
  state = initialState,
  action: ReducerActionsInterface
): ContentBaseInterface => {
  switch (action.type) {
    case ContentActionsContants.SUCCES_CREATE_BUSINESS:
      return {
        ...state,
        newBusiness: action.payload.newBusiness,
      };
    case ContentActionsContants.SUCCES_LIST_BUSINESS:
      return {
        ...state,
        business: action.payload.business,
      };
    case ContentActionsContants.SUCCES_UPDATE_BUSINESS:
      return {
        ...state,
        updateBusiness: action.payload.updateBusiness,
      };
    default:
      return state;
  }
};

export { businessReducer, useBusiness };
