import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionEvent } from "../common/utils";
import { RootReducerInterface } from "./store";
import { 
  UpdateCheckersService,
  loginService,
  RegisterUserService,
  RecoveryPasswordUserService,
  SendCredentialsUserService,
  ListCheckersService,
  DeleteCheckersService,
} from "../services/userServices";

/**
 * Action Types
 */
enum ContentActionsContants {
  SUCCES_LOGIN = "SUCCES_LOGIN",
  ERROR_LOGIN = "ERROR_LOGIN",
  SUCCES_LOGOUT = "SUCCES_LOGOUT",
  ERROR_LOGOUT = "ERROR_LOGOUT",
  SUCCES_REGISTER = "SUCCES_REGISTER",
  ERROR_REGISTER = "ERROR_REGISTER",
  SUCCES_RECOVERY = "SUCCES_RECOVERY",
  ERROR_RECOVERY = "ERROR_RECOVERY",
  SUCCES_SEND_CREDENCIAL_CHECKER = "SUCCES_SEND_CREDENCIAL_CHECKER",
  ERROR_SEND_CREDENCIAL_CHECKER = "ERROR_SEND_CREDENCIAL_CHECKER",
  SUCCES_LIST_CHECKERS = "SUCCES_LIST_CHECKERS",
  ERROR_LIST_CHECKERS = "ERROR_LIST_CHECKERS",
  SUCCES_DELETE_CHECKER = "SUCCES_DELETE_CHECKERS",
  ERROR_DELETE_CHECKER = "ERROR_DELETE_CHECKERS",
  SUCCES_UPDATE_CHECKER = "SUCCES_UPDATE_CHECKERS",
  ERROR_UPDATE_CHECKER = "ERROR_UPDATE_CHECKERS",
}

/**
 * Interfaces
 */
interface ContentBaseInterface {
  recovery: number;
  email: string;
  register: number;
  token: string;
  checkers: Profile[];
  user: Profile | undefined;
  loading: boolean;
}

interface IRecovery {
  email: string;
}

export interface Profile {
  id: number;
  createdAt: string;
  email: string;
  name: string;
  recoveryToken: string;
  role: string;
  id_contractor: number;
}

interface IUser {
  email: string;
  password: string;
}

interface INewUser {
  name: string;
  email: string;
  password: string;
  role: string;
};

interface IUseAuth extends ContentBaseInterface {
  UpdateCheckersRedux: (id: number, changes: any) => void;
  DeleteCheckerRedux: (id: number) => void;
  ListCheckersRedux: (id_contractor: number) => void;
  SendCredencialCheckerRedux: (email: string, password: string) => void;
  RecoveryPasswordRedux: (user: IRecovery) => void;
  RegisterUserRedux: (user: INewUser) => void;
  LoginRedux: (user: IUser) => void;
  LogoutRedux: () => void;
}

interface ReducerActionsInterface {
  type: ContentActionsContants;
  payload: ContentBaseInterface;
}

/**
 * Hooks
 */
const defaultUser: Profile = {id: 0, createdAt: '', email: '', name: '', recoveryToken: '', role: '', id_contractor: 0};
const useAuth = (): IUseAuth => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const { user, checkers, token, register, email, recovery } = useSelector(
    (state: RootReducerInterface) => state.user
  );

  const LoginRedux = async (user: IUser): Promise<void> => {
    try {
      setLoading(false);
      const response = await loginService(user);
      setLoading(true);
      const payload: ContentBaseInterface = {
        checkers,
        recovery,
        email: '',
        register,
        token: response.token,
        user: response.user,
        loading,
      };
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_LOGIN,
          payload,
        })
      );
    } catch (error) {
      const payload: ContentBaseInterface = {
        checkers,
        recovery,
        email: '',
        register,
        token: '',
        user: undefined,
        loading,
      };
        setLoading(true);
        dispatch(
          actionEvent<ContentActionsContants, ContentBaseInterface>({
            type: ContentActionsContants.SUCCES_LOGIN,
            payload,
          })
        );
    }
  };

  const LogoutRedux = async (): Promise<void> => {
    try {
      const payload: ContentBaseInterface = {
        checkers,
        recovery,
        email: '' ,
        register,
        token: "",
        user: undefined,
        loading,
      };
      //how create function remove localstorage in redux
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('persistanStateAviato');
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_LOGOUT,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const RegisterUserRedux = async (user: INewUser): Promise<void> => {
    try {
      setLoading(false);
      const response = await RegisterUserService(user);
      setLoading(true);
      const payload: ContentBaseInterface = {
        checkers,
        recovery,
        email,
        register: response,
        token,
        user: undefined,
        loading,
      };
       
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_REGISTER,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const RecoveryPasswordRedux= async (user: IRecovery): Promise<void> => {
    try {
      setLoading(false);
      const response =  await RecoveryPasswordUserService(user);
      setLoading(true);
      const payload: ContentBaseInterface = {
        checkers,
        recovery: response,
        email: user.email,
        register,
        token,
        user: undefined,
        loading,
      };
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_RECOVERY,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const SendCredencialCheckerRedux = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(false);
      await SendCredentialsUserService(email, password);
      setLoading(true);
      const payload: ContentBaseInterface = {
        checkers,
        recovery,
        email,
        register,
        token,
        user,
        loading,
      };
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_SEND_CREDENCIAL_CHECKER,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const ListCheckersRedux = async (id_contractor: number): Promise<void> => {
    try {
      setLoading(false);
      const response = await ListCheckersService(id_contractor);
      setLoading(true);
      const payload: ContentBaseInterface = {
        checkers: response,
        recovery,
        email,
        register,
        token,
        user,
        loading,
      };
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_LIST_CHECKERS,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const DeleteCheckerRedux = async (id: number): Promise<void> => {
    try {
      setLoading(false);
      await DeleteCheckersService(id);
      setLoading(true);
      const payload: ContentBaseInterface = {
        checkers,
        recovery,
        email,
        register,
        token,
        user,
        loading,
      };
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_DELETE_CHECKER,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const UpdateCheckersRedux = async (id: number, changes: any): Promise<void> => {
    try {
      setLoading(false);
      await UpdateCheckersService(id, changes);
      setLoading(true);
      const payload: ContentBaseInterface = {
        checkers,
        recovery,
        email,
        register,
        token,
        user,
        loading,
      };
      dispatch(
        actionEvent<ContentActionsContants, ContentBaseInterface>({
          type: ContentActionsContants.SUCCES_UPDATE_CHECKER,
          payload,
        })
      );
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    checkers,
    recovery,
    email,
    register,
    token,
    user,
    loading,
    LoginRedux,
    LogoutRedux,
    RegisterUserRedux,
    RecoveryPasswordRedux,
    SendCredencialCheckerRedux,
    ListCheckersRedux,
    DeleteCheckerRedux,
    UpdateCheckersRedux,
  };
};

/**
 * Reducers
 */
const initialState: ContentBaseInterface = {
  checkers: [],
  recovery: 0,
  email: '',
  register: 0,
  user: defaultUser,
  token: "",
  loading: true,
};

const userAuthReducer = (
  state = initialState,
  action: ReducerActionsInterface
): ContentBaseInterface => {
  switch (action.type) {
    case ContentActionsContants.SUCCES_LOGIN:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    case ContentActionsContants.SUCCES_LOGOUT:
      return {
        ...state,
        user: action.payload.user,
      };
    case ContentActionsContants.SUCCES_REGISTER:
      return {
        ...state,
        register: action.payload.register,
      };
    case ContentActionsContants.SUCCES_RECOVERY:
      return {
        ...state,
        recovery: action.payload.recovery,
        email: action.payload.email,
      };
    case ContentActionsContants.SUCCES_LIST_CHECKERS:
      return {
        ...state,
        checkers: action.payload.checkers,
      };
    default:
      return state;
  }
};

export { userAuthReducer, useAuth };
