import { combineReducers } from '@reduxjs/toolkit';

import auth from './auth';
import app from './app';

const rootReducer = combineReducers({
  auth,
  app,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
