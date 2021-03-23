import loaderReducer from './loader'
import snackbarReducer from './snackbar'

const utilsReducers = {
  loader: loaderReducer,
  snackbar: snackbarReducer,
}

export default utilsReducers
export * from './loader'
export * from './snackbar'
