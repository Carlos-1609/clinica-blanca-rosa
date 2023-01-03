import { configureStore } from "@reduxjs/toolkit";

import { rootPersistConfig, rootReducer } from "./rootReducer";
import { persistStore, persistReducer } from "redux-persist";

export const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export const persistor = persistStore(store);
