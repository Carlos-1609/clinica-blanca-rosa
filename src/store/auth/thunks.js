import { async } from "@firebase/util";
import { logoutFirebase, signInWithGoogle } from "../../firebase/provider";
import { clearLogoutPacientes } from "../pacientes/pacientesSlice";
import { checkingCredentials, login, logout } from "./authSlice";

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();
    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(clearLogoutPacientes());
    dispatch(logout());
  };
};
