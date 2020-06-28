import React, { useContext, useReducer } from "react";
import { Movie } from "../constants/types";

export interface LoggedUserState {
    favouriteMovies: Movie[]
}

enum ActionType {
    SetDetails = 'setDetails'
}

interface IAction {
    type: ActionType,
    payload: LoggedUserState
}

export const AuthStateContext = React.createContext({});

const initialState: LoggedUserState = {
    favouriteMovies: [],
};

const reducer: React.Reducer<{}, IAction> = (state, action) => {
    switch (action.type) {
        case ActionType.SetDetails:
            return {
                favouriteMovies: action.payload.favouriteMovies
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export const AuthProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AuthStateContext.Provider value={[state, dispatch]}>
            { children }
        </AuthStateContext.Provider>
    );
};

export const useAuth: any = () => useContext(AuthStateContext);