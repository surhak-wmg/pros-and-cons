import { TypedUseSelectorHook, useSelector as useSelectorGeneric } from 'react-redux';
import { IReducers } from '../helpers/types';

interface IAction {
    type: string;
}

export function createReducer<State, Action extends IAction>(initialState: State, handlers: { [key: string]: (state: State, action: Action) => State}) {
    return function reducer(state: State = initialState, action: Action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        }

        return state;
    };
}

export const useSelector: TypedUseSelectorHook<IReducers> = useSelectorGeneric;
