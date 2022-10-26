import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionEvent } from "../common/utils";
import { RootReducerInterface } from "./store";
import { createResumePayService, listResumePayService, updateResumePayService, deleteResumePayService } from "../services/resumePayServices";


/**
 * Action Types
 */
enum ContentActionsContants {
  SUCCES_CREATE_RESUME_PAY = "SUCCES_CREATE_RESUME_PAY",
  ERROR_CREATE_RESUME_PAY = "ERROR_CREATE_RESUME_PAY",
  SUCCES_LIST_RESUME_PAY = "SUCCES_LIST_RESUME_PAY",
  ERROR_LIST_RESUME_PAY = "ERROR_LIST_RESUME_PAY",
  SUCCES_DELETE_RESUME_PAY = "SUCCES_DELETE_RESUME_PAY",
  ERROR_DELETE_RESUME_PAY = "ERROR_DELETE_RESUME_PAY",
  SUCCES_UPDATE_RESUME_PAY = "UPDATE_RESUME_PAY",
  ERROR_UPDATE_RESUME_PAY = "ERROR_UPDATE_RESUME_PAY",
}

/**
 * Interfaces
 */
interface ContentBaseInterface {
  updateResumePay: IResumePayItem;
  newResumePay: IResumePayItem[];
  resumePay: IResumePayItem[];
  loading: boolean;
}

export interface IResumePayItem { 
  id: number;
  period: Date;
  name: string;
  id_contractor: number;
  id_user: number;
  created_at: string;
}

export interface IUpdateResumePay {
  period: Date;
  name: string;
};

export interface INewResumePay {
  period: Date;
  name: string;
  id_contractor: number;
  id_user: number;
}

const defaultResumePay: IResumePayItem[] = [];
const defaultUpdateResumePay: IResumePayItem = { id: 0, period: new Date(), name: "", id_contractor: 0, id_user: 0, created_at: "" };

interface IResumePay extends ContentBaseInterface {
  CreateResumePayRedux: (payload: INewResumePay) => void;
  ListResumePayRedux: (id_user: number) => void;
  UpdateResumePayRedux: (id: number, changes: INewResumePay) => void;
  DeleteResumePayRedux: (id: number) => void;
}

interface ReducerActionsInterface {
  type: ContentActionsContants;
  payload: ContentBaseInterface;
}

/**
 * Hooks
 */
const useResumePay = (): IResumePay => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const { resumePay, newResumePay, updateResumePay } = useSelector(
    (state: RootReducerInterface) => state.resumePays
  );

  const CreateResumePayRedux = async (ResumePay: INewResumePay): Promise<void> => {
    try {
      setLoading(true);
      const response = await createResumePayService(ResumePay);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateResumePay,
        newResumePay: response,
        resumePay,
        loading,
      };
       
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_CREATE_RESUME_PAY,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const ListResumePayRedux = async (id_business: any): Promise<void> => {
    try {
      setLoading(true);
      const response = await listResumePayService(id_business);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateResumePay,
        newResumePay,
        resumePay: response,
        loading,
      };
       
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_LIST_RESUME_PAY,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const UpdateResumePayRedux = async (id: number, changes: INewResumePay): Promise<void> => {
    try {
      setLoading(true);
      const response = await updateResumePayService(id, changes);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateResumePay: response,
        newResumePay,
        resumePay,
        loading,
      };
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_UPDATE_RESUME_PAY,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const DeleteResumePayRedux = async (id: number): Promise<void> => {
    try {
      setLoading(true);
      const response = await deleteResumePayService(id);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateResumePay,
        newResumePay,
        resumePay: response,
        loading,
      };
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_DELETE_RESUME_PAY,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  }; 

  return {
    updateResumePay,
    newResumePay,
    resumePay,
    loading,
    CreateResumePayRedux,
    ListResumePayRedux,
    UpdateResumePayRedux,
    DeleteResumePayRedux,
  };
};

/**
 * Reducers
 */
const initialState: ContentBaseInterface = {
  updateResumePay: defaultUpdateResumePay,
  newResumePay: defaultResumePay,
  resumePay: defaultResumePay,
  loading: false,
};

const resumePayReducer = (
  state = initialState,
  action: ReducerActionsInterface
): ContentBaseInterface => {
  switch (action.type) {
    case ContentActionsContants.SUCCES_CREATE_RESUME_PAY:
      return {
        ...state,
        newResumePay: action.payload.newResumePay,
      };
    case ContentActionsContants.SUCCES_LIST_RESUME_PAY:
      return {
        ...state,
        resumePay: action.payload.resumePay,
      };
    case ContentActionsContants.SUCCES_UPDATE_RESUME_PAY:
      return {
        ...state,
        updateResumePay: action.payload.updateResumePay,
      };
    default:
      return state;
  }
};

export { resumePayReducer, useResumePay };
