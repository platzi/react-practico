import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionEvent } from "../common/utils";
import { RootReducerInterface } from "./store";
import { createResumePayDataService, listResumePayDataService, updateResumePayDataService, deleteResumePayDataService } from "../services/resumePayDataServices";


/**
 * Action Types
 */
enum ContentActionsContants {
  SUCCES_CREATE_RESUME_PAY_DATA = "SUCCES_CREATE_RESUME_PAY_DATA",
  ERROR_CREATE_RESUME_PAY_DATA = "ERROR_CREATE_RESUME_PAY_DATA",
  SUCCES_LIST_RESUME_PAY_DATA = "SUCCES_LIST_RESUME_PAY_DATA",
  ERROR_LIST_RESUME_PAY_DATA = "ERROR_LIST_RESUME_PAY_DATA",
  SUCCES_DELETE_RESUME_PAY_DATA = "SUCCES_DELETE_RESUME_PAY_DATA",
  ERROR_DELETE_RESUME_PAY_DATA = "ERROR_DELETE_RESUME_PAY_DATA",
  SUCCES_UPDATE_RESUME_PAY_DATA = "UPDATE_RESUME_PAY_DATA",
  ERROR_UPDATE_RESUME_PAY_DATA = "ERROR_UPDATE_RESUME_PAY_DATA",
}

/**
 * Interfaces
 */
interface ContentBaseInterface {
  updateResumePayData: IResumePayDataItem;
  newResumePayData: IResumePayDataItem[];
  resumePayData: IResumePayDataItem[];
  loading: boolean;
}

export interface IResumePayDataItem { 
  id: number;
  id_resume_pay: number;
  id_city: number;
  code: number;
  name: string;
  id_job: number;
  deposit: number;
  salary: number;
  infonavit: number;
  fonacot: number;
  overtime: number;
  total_pay: number;
  faults: number;
  comments: string;
  id_construction_site: number;
  id_resident: number;
  created_at: string;
}

export interface IUpdateResumePayData {
  id_city: number;
  code: number;
  name: string;
  id_job: number;
  deposit: number;
  salary: number;
  infonavit: number;
  fonacot: number;
  overtime: number;
  total_pay: number;
  faults: number;
  comments: string;
  id_construction_site: number;
  id_resident: number;
};

export interface INewResumePayData {
  id_resume_pay: number;
  id_city: number;
  code: number;
  name: string;
  id_job: number;
  deposit: number;
  salary: number;
  infonavit: number;
  fonacot: number;
  overtime: number;
  total_pay: number;
  faults: number;
  comments: string;
  id_construction_site: number;
  id_resident: number;
}

const defaultResumePayData: IResumePayDataItem[] = [];
const defaultUpdateResumePayData: IResumePayDataItem = { id: 0, id_resume_pay: 0, id_city: 0, code: 0, name: "", id_job: 0, deposit: 0, salary: 0, infonavit: 0, fonacot: 0, overtime: 0, total_pay: 0, faults: 0, comments: "", id_construction_site: 0, id_resident: 0, created_at: "" };

interface IResumePayData extends ContentBaseInterface {
  CreateResumePayDataRedux: (payload: INewResumePayData) => void;
  ListResumePayDataRedux: (id_user: number) => void;
  UpdateResumePayDataRedux: (id: number, changes: INewResumePayData) => void;
  DeleteResumePayDataRedux: (id: number) => void;
}

interface ReducerActionsInterface {
  type: ContentActionsContants;
  payload: ContentBaseInterface;
}

/**
 * Hooks
 */
const useResumePayData = (): IResumePayData => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const { resumePayData, newResumePayData, updateResumePayData } = useSelector(
    (state: RootReducerInterface) => state.resumePayDatas
  );

  const CreateResumePayDataRedux = async (ResumePayData: INewResumePayData): Promise<void> => {
    try {
      setLoading(true);
      const response = await createResumePayDataService(ResumePayData);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateResumePayData,
        newResumePayData: response,
        resumePayData,
        loading,
      };
       
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_CREATE_RESUME_PAY_DATA,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const ListResumePayDataRedux = async (id_business: any): Promise<void> => {
    try {
      setLoading(true);
      const response = await listResumePayDataService(id_business);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateResumePayData,
        newResumePayData,
        resumePayData: response,
        loading,
      };
       
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_LIST_RESUME_PAY_DATA,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const UpdateResumePayDataRedux = async (id: number, changes: INewResumePayData): Promise<void> => {
    try {
      setLoading(true);
      const response = await updateResumePayDataService(id, changes);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateResumePayData: response,
        newResumePayData,
        resumePayData,
        loading,
      };
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_UPDATE_RESUME_PAY_DATA,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const DeleteResumePayDataRedux = async (id: number): Promise<void> => {
    try {
      setLoading(true);
      const response = await deleteResumePayDataService(id);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateResumePayData,
        newResumePayData,
        resumePayData: response,
        loading,
      };
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_CREATE_RESUME_PAY_DATA,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  }; 

  return {
    updateResumePayData,
    newResumePayData,
    resumePayData,
    loading,
    CreateResumePayDataRedux,
    ListResumePayDataRedux,
    UpdateResumePayDataRedux,
    DeleteResumePayDataRedux,
  };
};

/**
 * Reducers
 */
const initialState: ContentBaseInterface = {
  updateResumePayData: defaultUpdateResumePayData,
  newResumePayData: defaultResumePayData,
  resumePayData: defaultResumePayData,
  loading: false,
};

const resumePayDataReducer = (
  state = initialState,
  action: ReducerActionsInterface
): ContentBaseInterface => {
  switch (action.type) {
    case ContentActionsContants.SUCCES_CREATE_RESUME_PAY_DATA:
      return {
        ...state,
        newResumePayData: action.payload.newResumePayData,
      };
    case ContentActionsContants.SUCCES_LIST_RESUME_PAY_DATA:
      return {
        ...state,
        resumePayData: action.payload.resumePayData,
      };
    case ContentActionsContants.SUCCES_UPDATE_RESUME_PAY_DATA:
      return {
        ...state,
        updateResumePayData: action.payload.updateResumePayData,
      };
    default:
      return state;
  }
};

export { resumePayDataReducer, useResumePayData };
