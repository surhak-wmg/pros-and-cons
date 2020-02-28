import { createStore } from 'redux';
import { createReducer } from './createReducer';
import { SET_IDS, SET_IS_LOADING, SET_THEME, SET_DATA, UPDATE_DATA } from './actions';
import { IActions, IReducers } from '../helpers/types';
import Cookies from 'js-cookie';
import { light } from '../helpers/constants';

const defaultState = {
    ids: null,
    data: {
        pros: null,
        cons: null,
    },
    isLoading: true,
    theme: Cookies.get('theme') || light
};

const reducer = createReducer<IReducers, IActions>(defaultState, {
    [SET_IDS]: (state, action) => ({
        ...state,
        ids: action.ids
    }),
    [SET_DATA]: (state, action) => ({
        ...state,
        isLoading: false,
        data: action.data
    }),
    [SET_IS_LOADING]: (state, action) => ({
        ...state,
        isLoading: action.isLoading
    }),
    [SET_THEME]: (state, action) => ({
        ...state,
        theme: action.theme
    }),
    [UPDATE_DATA]: (state, action) => ({
        ...state,
        data: action.newData,
    })
});

const store = createStore(reducer);

export default store;
