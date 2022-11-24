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
    businessSelected: IBusinessItem;
    contractorSelected: IContractorItem;
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
  const { contractorSelected, businessSelected } = useSelector(
    (state: RootReducerInterface) => state.aviato
  );

  const setContractorRedux = async (contractor: any): Promise<void> => {
    try {
      setLoading(true);
      const payload: ContentBaseInterface = {
        businessSelected,
        contractorSelected: contractor,
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
        businessSelected: business,
        contractorSelected,
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
    businessSelected,
    contractorSelected,
    loading,
    setContractorRedux,
    setBusinessRedux,
  };
};

/**
 * Reducers
 */
const initialState: ContentBaseInterface = {
  businessSelected: {id: 0, name: "", reg_patronal: "", rfc: "", id_user: 0, created_at: ""},
  contractorSelected: {id: 0, name: "", rfc: "", id_business: 0, id_user: 0},
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
        contractorSelected: action.payload.contractorSelected,
      };
      case ContentActionsContants.SUCCESS_SET_BUSINESS:
        return {
          ...state,
          businessSelected: action.payload.businessSelected,
        };
    default:
      return state;
  }
};

export { aviatoReducer, useAviato };
