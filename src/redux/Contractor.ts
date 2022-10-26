import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionEvent } from "../common/utils";
import { RootReducerInterface } from "./store";
import { listContractorService, createContractorService, updateContractorService } from "../services/contractorServices";



/**
 * Action Types
 */
enum ContentActionsContants {
  SUCCES_CREATE_CONTRACTOR = "SUCCES_CREATE_CONTRACTOR",
  ERROR_CREATE_CONTRACTOR = "ERROR_CREATE_CONTRACTOR",
  SUCCES_LIST_CONTRACTOR = "SUCCES_LIST_CONTRACTOR",
  ERROR_LIST_CONTRACTOR = "ERROR_LIST_CONTRACTOR",
}

/**
 * Interfaces
 */
interface ContentBaseInterface {
  newContractor: IContractorItem[];
  contractor: IContractorItem[];
  loading: boolean;
}

export interface IContractorItem {
  id: number;
  name: string;
  rfc: string;
  id_business: number;
  id_user: number;
}

interface IContractor extends ContentBaseInterface {
  ListContractorRedux: (id_user: number) => void;
  CreateContractorRedux: (contractor: any) => void;
  UpdateContractorRedux: (id: number, changes: IContractorItem) => void;
}

interface ReducerActionsInterface {
  type: ContentActionsContants;
  payload: ContentBaseInterface;
}

/**
 * Hooks
 */
const useContractor = (): IContractor => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const { contractor, newContractor } = useSelector(
    (state: RootReducerInterface) => state.contractor
  );

 

  const CreateContractorRedux = async (contractor: any): Promise<void> => {
    try {
      setLoading(true);
      const response = await createContractorService(contractor);
      setLoading(false);
      const payload: ContentBaseInterface = {
        newContractor: response,
        contractor,
        loading,
      };
       
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_CREATE_CONTRACTOR,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const ListContractorRedux = async (id_user: number): Promise<void> => {
    try {
      setLoading(true);
      const response = await listContractorService(id_user);
      setLoading(false);
      const payload: ContentBaseInterface = {
        newContractor,
        contractor: response,
        loading,
      };
       
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_LIST_CONTRACTOR,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const UpdateContractorRedux = async ( id: number, changes: IContractorItem): Promise<void> => {
    try {
      setLoading(true);
      const response = await updateContractorService(id, changes);
      setLoading(false);
      const payload: ContentBaseInterface = {
        newContractor,
        contractor: response,
        loading,
      };

      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_LIST_CONTRACTOR,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

 

  return {
    newContractor,
    contractor,
    loading,
    ListContractorRedux,
    CreateContractorRedux,
    UpdateContractorRedux,
  };
};

/**
 * Reducers
 */
const initialState: ContentBaseInterface = {
  newContractor: [],
  contractor: [],
  loading: false,
};

const contractorReducer = (
  state = initialState,
  action: ReducerActionsInterface
): ContentBaseInterface => {
  switch (action.type) {
    case ContentActionsContants.SUCCES_CREATE_CONTRACTOR:
      return {
        ...state,
        newContractor: action.payload.newContractor,
      };
    case ContentActionsContants.SUCCES_LIST_CONTRACTOR:
      return {
        ...state,
        contractor: action.payload.contractor,
      };
    default:
      return state;
  }
};

export { contractorReducer, useContractor };
