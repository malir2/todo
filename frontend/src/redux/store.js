import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import userSlices from "./userSlices.js";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Combine reducers (in case you have multiple slices in the future)
const rootReducer = combineReducers({
  user: userSlices,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
});

// Persist store
export const persistor = persistStore(store);
