import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import rootReducer from './reducers'

const persistConfig = {
  key: 'root',
  storage,
	stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
}

const pReducer = persistReducer(persistConfig, rootReducer)

/*export  () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}*/


export const store =createStore(pReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)