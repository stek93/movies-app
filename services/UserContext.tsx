import React, { useContext, useReducer } from "react";
import { Movie } from "../constants/types";
import { AppRoutePaths, AppRoutes } from "../constants/AppRoutes";

export interface LoggedUserState {
    favouriteMovies: Movie[],
    currentMenuKey: string,
    currentMenuCategory: string
}

enum ActionType {
    SetFavouriteMovies = 'setFavouriteMovies',
    SetCurrentMenuItem = 'setCurrentMenuItem',
}

interface IAction {
    type: ActionType,
    payload: LoggedUserState
}

export const UserStateContext = React.createContext({});

const initialState: LoggedUserState = {
    favouriteMovies: [],
    currentMenuKey: "1",
    currentMenuCategory: AppRoutePaths.TrendingMovies
};

const reducer: React.Reducer<{}, IAction> = (state, action) => {
    switch (action.type) {
        case ActionType.SetFavouriteMovies:
            return {
                favouriteMovies: action.payload.favouriteMovies
            }
        case ActionType.SetCurrentMenuItem:
            return {
                currentMenuKey: action.payload.currentMenuKey,
                currentMenuCategory: action.payload.currentMenuCategory
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