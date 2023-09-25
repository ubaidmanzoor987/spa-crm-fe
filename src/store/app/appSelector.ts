import { createSelector } from 'reselect';

import { AppState } from '../rootReducer';

export const getAppDataSelector = (state: AppState) => state.app;

export const getAppSelector = createSelector(getAppDataSelector, (appSelecor: any) => appSelecor.app);
