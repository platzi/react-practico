import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionEvent } from "../common/utils";
import { RootReducerInterface } from "./store";
import { createEmployeService, listEmployeService, updateEmployeService, deleteEmployeService } from "../services/employeServices";


/**
 * Action Types
 */
enum ContentActionsContants {
  SUCCES_CREATE_EMPLOYE = "SUCCES_CREATE_EMPLOYE",
  ERROR_CREATE_EMPLOYE = "ERROR_CREATE_EMPLOYE",
  SUCCES_LIST_EMPLOYE = "SUCCES_LIST_EMPLOYE",
  ERROR_LIST_EMPLOYE = "ERROR_LIST_EMPLOYE",
  SUCCES_DELETE_EMPLOYE = "SUCCES_DELETE_EMPLOYE",
  ERROR_DELETE_EMPLOYE = "ERROR_DELETE_EMPLOYE",
  SUCCES_UPDATE_EMPLOYE = "UPDATE_EMPLOYE",
  ERROR_UPDATE_EMPLOYE = "ERROR_UPDATE_EMPLOYE",
}

/**
 * Interfaces
 */
interface ContentBaseInterface {
  updateEmploye: IEmployeItem;
  newEmploye: IEmployeItem[];
  employe: IEmployeItem[];
  loading: boolean;
}

export interface IEmployeItem { 
  id: number;
  id_city: number;
  code: number;
  name: string;
  id_job: number;
  infonavit: number;
  fonacot: number;
  id_contractor: number;
  id_user: number;
  created_at: string;
}

export interface IUpdateEmploye {
  id_city: number;
  code: number;
  name: string;
  id_job: number;
  infonavit: number;
  fonacot: number;
};

export interface INewEmploye {
  id_city: number;
  code: number;
  name: string;
  id_job: number;
  infonavit: number;
  fonacot: number;
  id_contractor: number;
  id_user: number;
}

const defaultEmploye: IEmployeItem[] = [];
const defaultUpdateEmploye: IEmployeItem = { id: 0, id_city: 0, code: 0, name: '', id_job: 0, infonavit: 0, fonacot: 0, id_contractor: 0, id_user: 0, created_at: '' };

interface IEmploye extends ContentBaseInterface {
  CreateEmployeRedux: (payload: INewEmploye) => void;
  ListEmployeRedux: (id_user: number) => void;
  UpdateEmployeRedux: (id: number, changes: INewEmploye) => void;
  DeleteEmployeRedux: (id: number) => void;
}

interface ReducerActionsInterface {
  type: ContentActionsContants;
  payload: ContentBaseInterface;
}

/**
 * Hooks
 */
const useEmploye = (): IEmploye => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const { employe, newEmploye, updateEmploye } = useSelector(
    (state: RootReducerInterface) => state.employes
  );

  const CreateEmployeRedux = async (Employe: INewEmploye): Promise<void> => {
    try {
      setLoading(true);
      const response = await createEmployeService(Employe);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateEmploye,
        newEmploye: response,
        employe,
        loading,
      };
       
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_CREATE_EMPLOYE,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const ListEmployeRedux = async (id_business: any): Promise<void> => {
    try {
      setLoading(true);
      const response = await listEmployeService(id_business);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateEmploye,
        newEmploye,
        employe: response,
        loading,
      };
       
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_LIST_EMPLOYE,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const UpdateEmployeRedux = async (id: number, changes: INewEmploye): Promise<void> => {
    try {
      setLoading(true);
      const response = await updateEmployeService(id, changes);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateEmploye: response,
        newEmploye,
        employe,
        loading,
      };
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_UPDATE_EMPLOYE,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const DeleteEmployeRedux = async (id: number): Promise<void> => {
    try {
      setLoading(true);
      const response = await deleteEmployeService(id);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateEmploye,
        newEmploye,
        employe: response,
        loading,
      };
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_DELETE_EMPLOYE,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  }; 

  return {
    updateEmploye,
    newEmploye,
    employe,
    loading,
    CreateEmployeRedux,
    ListEmployeRedux,
    UpdateEmployeRedux,
    DeleteEmployeRedux,
  };
};

/**
 * Reducers
 */
const initialState: ContentBaseInterface = {
  updateEmploye: defaultUpdateEmploye,
  newEmploye: defaultEmploye,
  employe: defaultEmploye,
  loading: false,
};

const employeReducer = (
  state = initialState,
  action: ReducerActionsInterface
): ContentBaseInterface => {
  switch (action.type) {
    case ContentActionsContants.SUCCES_CREATE_EMPLOYE:
      return {
        ...state,
        newEmploye: action.payload.newEmploye,
      };
    case ContentActionsContants.SUCCES_LIST_EMPLOYE:
      return {
        ...state,
        employe: action.payload.employe,
      };
    case ContentActionsContants.SUCCES_UPDATE_EMPLOYE:
      return {
        ...state,
        updateEmploye: action.payload.updateEmploye,
      };
    default:
      return state;
  }
};

export { employeReducer, useEmploye };
