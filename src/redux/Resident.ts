import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionEvent } from "../common/utils";
import { RootReducerInterface } from "./store";
import { createResidentService, listResidentService, updateResidentService, deleteResidentService } from "../services/residentServices";


/**
 * Action Types
 */
enum ContentActionsContants {
  SUCCES_CREATE_RESIDENT = "SUCCES_CREATE_RESIDENT",
  ERROR_CREATE_RESIDENT = "ERROR_CREATE_RESIDENT",
  SUCCES_LIST_RESIDENT = "SUCCES_LIST_RESIDENT",
  ERROR_LIST_RESIDENT = "ERROR_LIST_RESIDENT",
  SUCCES_DELETE_RESIDENT = "SUCCES_DELETE_RESIDENT",
  ERROR_DELETE_RESIDENT = "ERROR_DELETE_RESIDENT",
  SUCCES_UPDATE_RESIDENT = "UPDATE_RESIDENT",
  ERROR_UPDATE_RESIDENT = "ERROR_UPDATE_RESIDENT",
}

/**
 * Interfaces
 */
interface ContentBaseInterface {
  updateResident: IResidentItem;
  newResident: IResidentItem[];
  resident: IResidentItem[];
  loading: boolean;
}

export interface IResidentItem { 
  id: number;
  name: string;
  id_business: number;
  id_user: number;
  created_at: string;
}

export interface IUpdateResident {
  id: number;
  name: string;
  id_business: number;
};

export interface INewResident {
  name: string;
  salary: string;
  id_business: number;
  id_user: number;
}

const defaultResident: IResidentItem[] = [];
const defaultUpdateResident: IResidentItem = { id: 0, name: "", id_business: 0, id_user: 0, created_at: "" };

interface IResident extends ContentBaseInterface {
  CreateResidentRedux: (payload: INewResident) => void;
  ListResidentRedux: (id_user: number) => void;
  UpdateResidentRedux: (id: number, changes: INewResident) => void;
  DeleteResidentRedux: (id: number) => void;
}

interface ReducerActionsInterface {
  type: ContentActionsContants;
  payload: ContentBaseInterface;
}

/**
 * Hooks
 */
const useResident = (): IResident => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const { resident, newResident, updateResident } = useSelector(
    (state: RootReducerInterface) => state.residents
  );

  const CreateResidentRedux = async (Resident: INewResident): Promise<void> => {
    try {
      setLoading(true);
      const response = await createResidentService(Resident);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateResident,
        newResident: response,
        resident: [],
        loading,
      };
       
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_CREATE_RESIDENT,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const ListResidentRedux = async (id_business: any): Promise<void> => {
    try {
      setLoading(true);
      const response = await listResidentService(id_business);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateResident,
        newResident,
        resident: response,
        loading,
      };
       
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_LIST_RESIDENT,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const UpdateResidentRedux = async (id: number, changes: INewResident): Promise<void> => {
    try {
      setLoading(true);
      const response = await updateResidentService(id, changes);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateResident: response,
        newResident,
        resident,
        loading,
      };
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_UPDATE_RESIDENT,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const DeleteResidentRedux = async (id: number): Promise<void> => {
    try {
      setLoading(true);
      const response = await deleteResidentService(id);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateResident,
        newResident,
        resident: response,
        loading,
      };
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_DELETE_RESIDENT,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  }; 

  return {
    updateResident,
    newResident,
    resident,
    loading,
    CreateResidentRedux,
    ListResidentRedux,
    UpdateResidentRedux,
    DeleteResidentRedux,
  };
};

/**
 * Reducers
 */
const initialState: ContentBaseInterface = {
  updateResident: defaultUpdateResident,
  newResident: defaultResident,
  resident: defaultResident,
  loading: false,
};

const residentReducer = (
  state = initialState,
  action: ReducerActionsInterface
): ContentBaseInterface => {
  switch (action.type) {
    case ContentActionsContants.SUCCES_CREATE_RESIDENT:
      return {
        ...state,
        newResident: action.payload.newResident,
      };
    case ContentActionsContants.SUCCES_LIST_RESIDENT:
      return {
        ...state,
        resident: action.payload.resident,
      };
    case ContentActionsContants.SUCCES_UPDATE_RESIDENT:
      return {
        ...state,
        updateResident: action.payload.updateResident,
      };
    default:
      return state;
  }
};

export { residentReducer, useResident };
