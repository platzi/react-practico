import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionEvent } from "../common/utils";
import { RootReducerInterface } from "./store";
import { createJobsService, listJobsService, updateJobsService, deleteJobsService } from "../services/jobsServices";


/**
 * Action Types
 */
enum ContentActionsContants {
  SUCCES_CREATE_JOBS = "SUCCES_CREATE_JOBS",
  ERROR_CREATE_JOBS = "ERROR_CREATE_JOBS",
  SUCCES_LIST_JOBS = "SUCCES_LIST_JOBS",
  ERROR_LIST_JOBS = "ERROR_LIST_JOBS",
  SUCCES_DELETE_JOBS = "SUCCES_DELETE_JOBS",
  ERROR_DELETE_JOBS = "ERROR_DELETE_JOBS",
  SUCCES_UPDATE_JOBS = "UPDATE_JOBS",
  ERROR_UPDATE_JOBS = "ERROR_UPDATE_JOBS",
}

/**
 * Interfaces
 */
interface ContentBaseInterface {
  updateJobs: IJobsItem;
  newJobs: IJobsItem[];
  jobs: IJobsItem[];
  loading: boolean;
}

export interface IJobsItem { 
  id: number;
  name: string;
  salary: string;
  id_business: number;
  id_user: number;
  created_at: string;
}

export interface IUpdateJobs {
  id: number;
  name: string;
  salary: string;
  id_business: number;
  id_user: number;
};

export interface INewJobs {
  name: string;
  salary: string;
  id_business: number;
  id_user: number;
}

const defaultJobs: IJobsItem[] = [];
const defaultUpdateJobs: IJobsItem = { id: 0, name: "", salary: "", id_business: 0, id_user: 0, created_at: "" };

interface IJobs extends ContentBaseInterface {
  CreateJobsRedux: (payload: INewJobs) => void;
  ListJobsRedux: (id_user: number) => void;
  UpdateJobsRedux: (id: number, changes: INewJobs) => void;
  DeleteJobsRedux: (id: number) => void;
}

interface ReducerActionsInterface {
  type: ContentActionsContants;
  payload: ContentBaseInterface;
}

/**
 * Hooks
 */
const useJobs = (): IJobs => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const { jobs, newJobs, updateJobs } = useSelector(
    (state: RootReducerInterface) => state.jobss
  );

  const CreateJobsRedux = async (Jobs: INewJobs): Promise<void> => {
    try {
      setLoading(true);
      const response = await createJobsService(Jobs);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateJobs,
        newJobs: response,
        jobs: [],
        loading,
      };
       
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_CREATE_JOBS,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const ListJobsRedux = async (id_business: any): Promise<void> => {
    try {
      setLoading(true);
      const response = await listJobsService(id_business);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateJobs,
        newJobs,
        jobs: response,
        loading,
      };
       
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_LIST_JOBS,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const UpdateJobsRedux = async (id: number, changes: INewJobs): Promise<void> => {
    try {
      setLoading(true);
      const response = await updateJobsService(id, changes);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateJobs: response,
        newJobs,
        jobs,
        loading,
      };
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_UPDATE_JOBS,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const DeleteJobsRedux = async (id: number): Promise<void> => {
    try {
      setLoading(true);
      const response = await deleteJobsService(id);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateJobs,
        newJobs,
        jobs: response,
        loading,
      };
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_DELETE_JOBS,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  }; 

  return {
    updateJobs,
    newJobs,
    jobs,
    loading,
    CreateJobsRedux,
    ListJobsRedux,
    UpdateJobsRedux,
    DeleteJobsRedux,
  };
};

/**
 * Reducers
 */
const initialState: ContentBaseInterface = {
  updateJobs: defaultUpdateJobs,
  newJobs: defaultJobs,
  jobs: defaultJobs,
  loading: false,
};

const jobsReducer = (
  state = initialState,
  action: ReducerActionsInterface
): ContentBaseInterface => {
  switch (action.type) {
    case ContentActionsContants.SUCCES_CREATE_JOBS:
      return {
        ...state,
        newJobs: action.payload.newJobs,
      };
    case ContentActionsContants.SUCCES_LIST_JOBS:
      return {
        ...state,
        jobs: action.payload.jobs,
      };
    case ContentActionsContants.SUCCES_UPDATE_JOBS:
      return {
        ...state,
        updateJobs: action.payload.updateJobs,
      };
    default:
      return state;
  }
};

export { jobsReducer, useJobs };
