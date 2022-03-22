import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { questionsReducer } from "./reducers/questionsReducer";
import { criteriaReducer } from "./reducers/criteriaReducer";
import { ideasReducer } from "./reducers/ideasReducer";
import { notesReducer } from "./reducers/notesReducer";
import { seanceReducer } from "./reducers/seanceReducer";

import storage from "redux-persist/lib/storage";

import { persistStore, persistReducer } from "redux-persist";
import { stepSReducer } from "./reducers/stepsReducer";

const reducer = combineReducers({
    questions: questionsReducer,
    criteria: criteriaReducer,
    ideas: ideasReducer,
    notes: notesReducer,
    seance: seanceReducer,
    steps: stepSReducer,
});

/* const middleware = [thunk];

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
); */

const persistConfig = {
    key: "reducer",
    storage: storage,
};
const presistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(
    presistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
const persistor = persistStore(store);
export { persistor, store };
