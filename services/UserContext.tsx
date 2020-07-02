import React, { useContext, useReducer } from "react";
import { Search } from "../constants/types";
import { AppRoutePaths } from "../constants/AppRoutes";

export interface LoggedUserState {
    key?: string,
    category?: string,
    isSearch?: boolean,
    search?: Search,
    isInitialLoad?: boolean,
}

enum ActionType {
    SetCurrentMovieCategory = 'setCurrentMovieCategory',
    SetCurrentSearchContext = 'setCurrentSearchContext',
}

interface IAction {
    type: ActionType,
    payload: LoggedUserState
}

export const UserStateContext = React.createContext({});

const initialState: LoggedUserState = {
    key: "1",
    category: AppRoutePaths.TrendingMovies,
    search: {
        searchType: '',
    },
};

const reducer: React.Reducer<{}, IAction> = (state, action) => {
    switch (action.type) {
        case ActionType.SetCurrentMovieCategory:
            return {
                ...state,
                search: { searchType: '' },
                key: action.payload.key,
                category: action.payload.category
            }
        case ActionType.SetCurrentSearchContext:
            return {
                ...state,
                search: action.payload.search
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export const UserProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <UserStateContext.Provider value={[state, dispatch]}>
            { children }
        </UserStateContext.Provider>
    );
};

export const useUserState: any = () => useContext(UserStateContext);