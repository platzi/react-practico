import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionEvent } from "../common/utils";
import { RootReducerInterface } from "./store";
import {
  loginService,
  RegisterUserService,
  RecoveryPasswordUserService,
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
}

/**
 * Interfaces
 */
interface ContentBaseInterface {
  recovery: number | null;
  email: string;
  register: number | null;
  token: string;
  user: Profile | null;
  loading: boolean;
}

interface IRecovery {
  email: string;
}

interface IRegister {
  id: number;
  createdAt: string;
  email: string;
  name: string;
  recoveryToken: string;
  role: string;
}

interface Profile {
  id: number;
  createdAt: string;
  email: string;
  name: string;
  recoveryToken: string;
  role: string;
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
const useAuth = (): IUseAuth => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const { user, token, register, email, recovery } = useSelector(
    (state: RootReducerInterface) => state.user
  );

  const LoginRedux = async (user: IUser): Promise<void> => {
    try {
      setLoading(false);
      const response = await loginService(user);
      setLoading(true);
      const payload: ContentBaseInterface = {
        recovery: null,
        email: '',
        register: null,
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
      setLoading(false);
    }
  };

  const LogoutRedux = async (): Promise<void> => {
    try {
      const payload: ContentBaseInterface = {
        recovery: null,
        email: '' ,
        register: null,
        token: "",
        user: null,
        loading,
      };
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
        recovery: null,
        email: '',
        register: response,
        token: "",
        user: null,
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
        recovery: response,
        email: user.email,
        register: null,
        token: "",
        user: null,
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

  return {
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
  };
};

/**
 * Reducers
 */
const initialState: ContentBaseInterface = {
  recovery: null,
  email: '',
  register: null,
  user: null,
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
    default:
      return state;
  }
};

export { userAuthReducer, useAuth };
