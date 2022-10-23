import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionEvent } from "../common/utils";
import { RootReducerInterface } from "./store";
/**
 * Action Types
 */
enum ContentActionsContants {
    SUCCES_SET_CONTRACTOR = "SUCCES_SET_CONTRACTOR",
    ERROR_SET_CONTRACTOR = "ERROR_SET_CONTRACTOR",
    SUCCESS_SET_BUSINESS = "SUCCESS_SET_BUSINESS",
    ERROR_SET_BUSINESS = "ERROR_SET_BUSINESS",
}

/**
 * Interfaces
 */
interface ContentBaseInterface {
    business: IBusinessItem;
    contractor: IContractorItem;
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


export interface IContractorItem {
  id: number;
  name: string;
  rfc: string;
  id_business: number;
  id_user: number;
}
interface IAviato extends ContentBaseInterface {
  setContractorRedux: (contractor: any) => void;
  setBusinessRedux: (business: any) => void;
}

interface ReducerActionsInterface {
  type: ContentActionsContants;
  payload: ContentBaseInterface;
}

/**
 * Hooks
 */
const useAviato = (): IAviato => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const { contractor, business } = useSelector(
    (state: RootReducerInterface) => state.aviato
  );

  const setContractorRedux = async (contractor: any): Promise<void> => {
    try {
      setLoading(true);
      const payload: ContentBaseInterface = {
        business: null,
        contractor: contractor,
        loading,
      };
      setLoading(false);
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_SET_CONTRACTOR,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const setBusinessRedux = async (business: any): Promise<void> => {
    try {
      setLoading(true);
      const payload: ContentBaseInterface = {
        business: business,
        contractor: null,
        loading,
      };
      setLoading(false);
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCESS_SET_BUSINESS,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

return {
    business,
    contractor,
    loading,
    setContractorRedux,
    setBusinessRedux,
  };
};

/**
 * Reducers
 */
const initialState: ContentBaseInterface = {
  business: null,
  contractor: null,
  loading: false,
};

const aviatoReducer = (
  state = initialState,
  action: ReducerActionsInterface
): ContentBaseInterface => {
  switch (action.type) {
    case ContentActionsContants.SUCCES_SET_CONTRACTOR:
      return {
        ...state,
        business: action.payload.business,
        contractor: action.payload.contractor,
      };
      case ContentActionsContants.SUCCESS_SET_BUSINESS:
        return {
          ...state,
          business: action.payload.business,
          contractor: action.payload.contractor,
        };
    default:
      return state;
  }
};

export { aviatoReducer, useAviato };
