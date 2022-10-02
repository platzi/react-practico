import { useCallback, useState } from "react";
import { loginService } from "@services/userServices";

export default function useUser() {
  const [state, setState] = useState({
    isLogin: false,
    loading: false,
    error: false,
    user: {},
    token: "",
  });
  const login = useCallback(async (payload) => {
    setState({ loading: true, error: false });
    await loginService(payload).then((res) => {
      window.sessionStorage.setItem('token', res.token);
      window.sessionStorage.setItem('user', JSON.stringify(res.user));
      setState({
        isLogin: true,
        loading: false,
        error: false,
        user: res.user,
        token: res.token,
      });
    }).catch((err) => {
      window.sessionStorage.removeItem("token");
      window.sessionStorage.removeItem("user");
      setState({
        isLogin: false,
        loading: false,
        user: {},
        token: '',
      });
      console.log("🚀 ~ file: useUser.js ~ line 25 ~ awaitloginService ~ err", err);
    });
  }, []);

  const logout = useCallback(() => {
    window.sessionStorage.removeItem("token");
    window.sessionStorage.removeItem("user");
    setState({
      isLogin: false,
      loading: false,
      user: {},
      token: '',
    });
  }, []);

  return {
    isLogin: state.isLogin,
    loading: state.loading,
    hasLoginError: state.error,
    user: state.user,
    token: state.token,
    login,
    logout,
  };
}
