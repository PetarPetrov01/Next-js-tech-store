"use client";

import { User } from "@/types/User";
import { ReactNode, createContext, useContext } from "react";

enum ActionTypes {
  SETAUTH = "SETAUTH",
  CLEARAUTH = "CLEARAUTH",
}

interface Action {
  type: ActionTypes;
  payload?: User;
}

interface ReducerState {
  user: User | null;
}

const AuthContext = createContext(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
};

const authReducer = (state: ReducerState, action: Action) => {
  switch (action.type) {
    case ActionTypes.SETAUTH:
      return {
        user: {
          email: action.payload?.email,
          username: action.payload?.username,
        },
      };
    case ActionTypes.CLEARAUTH:
      return {
        user: null,
      };
    default:
      return state;
  }
};
