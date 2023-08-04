
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use local storage

import { reducer as authReducer } from "../redux/authReducer/reducer.js";
import { reducer as productReducer } from "../redux/productReducer/reducer.js"
import thunk from "redux-thunk"



const rootReducer = combineReducers({
  authReducer,
  productReducer
})

const persistConfig = {
  key: "root", // Key to access the persisted state in storage
  storage, // Use local storage as the storage engine
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);