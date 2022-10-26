import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionEvent } from "../common/utils";
import { RootReducerInterface } from "./store";
import { createConstructionSiteService, listConstructionSiteService, updateConstructionSiteService, deleteConstructionSiteService } from "../services/constructionSiteServices";


/**
 * Action Types
 */
enum ContentActionsContants {
  SUCCES_CREATE_CONSTRUCTION_SITE = "SUCCES_CREATE_CONSTRUCTION_SITE",
  ERROR_CREATE_CONSTRUCTION_SITE = "ERROR_CREATE_CONSTRUCTION_SITE",
  SUCCES_LIST_CONSTRUCTION_SITE = "SUCCES_LIST_CONSTRUCTION_SITE",
  ERROR_LIST_CONSTRUCTION_SITE = "ERROR_LIST_CONSTRUCTION_SITE",
  SUCCES_DELETE_CONSTRUCTION_SITE = "SUCCES_DELETE_CONSTRUCTION_SITE",
  ERROR_DELETE_CONSTRUCTION_SITE = "ERROR_DELETE_CONSTRUCTION_SITE",
  SUCCES_UPDATE_CONSTRUCTION_SITE = "UPDATE_CONSTRUCTION_SITE",
  ERROR_UPDATE_CONSTRUCTION_SITE = "ERROR_UPDATE_CONSTRUCTION_SITE",
}

/**
 * Interfaces
 */
interface ContentBaseInterface {
  updateConstructionSite: IConstructionSiteItem;
  newConstructionSite: IConstructionSiteItem[];
  constructionSite: IConstructionSiteItem[];
  loading: boolean;
}

export interface IConstructionSiteItem { 
  id: number;
  name: string;
  location: string;
  id_business: number;
  id_resident: number;
  id_user: number;
  created_at: string;
}

export interface IUpdateConstructionSite {
  id: number;
  name: string;
  location: string;
  id_business: number;
  id_resident: number;
};

export interface INewConstructionSite {
  name: string;
  location: string;
  id_business: number;
  id_resident: number;
  id_user: number;
}

const defaultConstructionSite: IConstructionSiteItem[] = [];
const defaultUpdateConstructionSite: IConstructionSiteItem = { id: 0, name: "", location: "", id_business: 0, id_resident: 0,id_user: 0, created_at: "" };

interface IConstructionSite extends ContentBaseInterface {
  CreateConstructionSiteRedux: (payload: INewConstructionSite) => void;
  ListConstructionSiteRedux: (id_user: number) => void;
  UpdateConstructionSiteRedux: (id: number, changes: INewConstructionSite) => void;
  DeleteConstructionSiteRedux: (id: number) => void;
}

interface ReducerActionsInterface {
  type: ContentActionsContants;
  payload: ContentBaseInterface;
}

/**
 * Hooks
 */
const useConstructionSite = (): IConstructionSite => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const { constructionSite, newConstructionSite, updateConstructionSite } = useSelector(
    (state: RootReducerInterface) => state.constructionSites
  );

  const CreateConstructionSiteRedux = async (ConstructionSite: INewConstructionSite): Promise<void> => {
    try {
      setLoading(true);
      const response = await createConstructionSiteService(ConstructionSite);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateConstructionSite,
        newConstructionSite: response,
        constructionSite: [],
        loading,
      };
       
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_CREATE_CONSTRUCTION_SITE,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const ListConstructionSiteRedux = async (id_business: any): Promise<void> => {
    try {
      setLoading(true);
      const response = await listConstructionSiteService(id_business);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateConstructionSite,
        newConstructionSite,
        constructionSite: response,
        loading,
      };
       
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_LIST_CONSTRUCTION_SITE,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const UpdateConstructionSiteRedux = async (id: number, changes: INewConstructionSite): Promise<void> => {
    try {
      setLoading(true);
      const response = await updateConstructionSiteService(id, changes);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateConstructionSite: response,
        newConstructionSite,
        constructionSite,
        loading,
      };
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_UPDATE_CONSTRUCTION_SITE,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const DeleteConstructionSiteRedux = async (id: number): Promise<void> => {
    try {
      setLoading(true);
      const response = await deleteConstructionSiteService(id);
      setLoading(false);
      const payload: ContentBaseInterface = {
        updateConstructionSite,
        newConstructionSite,
        constructionSite: response,
        loading,
      };
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_DELETE_CONSTRUCTION_SITE,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  }; 

  return {
    updateConstructionSite,
    newConstructionSite,
    constructionSite,
    loading,
    CreateConstructionSiteRedux,
    ListConstructionSiteRedux,
    UpdateConstructionSiteRedux,
    DeleteConstructionSiteRedux,
  };
};

/**
 * Reducers
 */
const initialState: ContentBaseInterface = {
  updateConstructionSite: defaultUpdateConstructionSite,
  newConstructionSite: defaultConstructionSite,
  constructionSite: defaultConstructionSite,
  loading: false,
};

const constructionSiteReducer = (
  state = initialState,
  action: ReducerActionsInterface
): ContentBaseInterface => {
  switch (action.type) {
    case ContentActionsContants.SUCCES_CREATE_CONSTRUCTION_SITE:
      return {
        ...state,
        newConstructionSite: action.payload.newConstructionSite,
      };
    case ContentActionsContants.SUCCES_LIST_CONSTRUCTION_SITE:
      return {
        ...state,
        constructionSite: action.payload.constructionSite,
      };
    case ContentActionsContants.SUCCES_UPDATE_CONSTRUCTION_SITE:
      return {
        ...state,
        updateConstructionSite: action.payload.updateConstructionSite,
      };
    default:
      return state;
  }
};

export { constructionSiteReducer, useConstructionSite };
