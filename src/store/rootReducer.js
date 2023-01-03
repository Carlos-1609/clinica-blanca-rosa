import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authSlice } from "./auth/authSlice";
import { pacientesSlice } from "./pacientes/pacientesSlice";
import { consultasSlice } from "./consultas/consultasSlice";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["settings"],
};

const authPersistConfig = {
  key: "authSlice",
  storage: storage,
  keyPrefix: "redux-",
  whitelist: [
    "status",
    "uid",
    "email",
    "displayName",
    "photoURL",
    "errorMessage",
  ],
};

const pacientesPersistConfig = {
  key: "pacientesSlice",
  storage: storage,
  keyPrefix: "redux-",
  whitelist: [
    "pacientes",
    "activePaciente",
    "firstPaciente",
    "lastPaciente",
    "counter",
  ],
};

const consultasPersistConfig = {
  key: "consultasSlice",
  storage: storage,
  keyPrefix: "redux-",
  whitelist: [
    "isSavingConsulta",
    "onBackPage",
    "messageInsert",
    "messageSaved",
    "consultas",
    "activeConsulta",
    "firstConsulta",
    "lastConsulta",
    "counter",
    "typeAction",
    "consultaInfo",
  ],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice.reducer),
  pacientes: persistReducer(pacientesPersistConfig, pacientesSlice.reducer),
  consultas: persistReducer(consultasPersistConfig, consultasSlice.reducer),
});

export { rootPersistConfig, rootReducer };
