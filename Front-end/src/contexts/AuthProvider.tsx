"use client";

import { User } from "@/types/User";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

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

interface AuthDataInterface {
  user: User | null;
}

interface AuthHandlersInterface {
  setAuth: (user: User) => void;
  clearAuth: () => void;
}

interface AuthInterface extends AuthDataInterface, AuthHandlersInterface {}

export const AuthContext = createContext<AuthInterface | null>(null);

export const AuthProvider = ({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser: User | null;
}) => {
  const [state, dispatch] = useReducer(authReducer, { user: initialUser });

  // Sync server-provided initialUser into reducer state.
  // After redirect (e.g. login/logout), the layout re-renders server-side
  // with a new initialUser, but useReducer ignores prop changes after mount.
  useEffect(() => {
    if (initialUser) {
      dispatch({ type: ActionTypes.SETAUTH, payload: initialUser });
    } else {
      dispatch({ type: ActionTypes.CLEARAUTH });
    }
  }, [initialUser?.id]);

  const data: AuthDataInterface = useMemo(() => {
    return {
      user: state.user ? { ...state.user } : null,
    };
  }, [state]);

  const handlers: AuthHandlersInterface = useMemo(() => {
    return {
      setAuth: (user: User) => {
        dispatch({ type: ActionTypes.SETAUTH, payload: user });
      },
      clearAuth: () => dispatch({ type: ActionTypes.CLEARAUTH }),
    };
  }, []);

  const context = {
    ...data,
    ...handlers,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthInterface => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("Missing context! (not provided)");
  }
  return ctx;
};

const authReducer = (state: ReducerState, action: Action): ReducerState => {
  switch (action.type) {
    case ActionTypes.SETAUTH:
      return {
        user:
          action.payload?.email && action.payload.username
            ? {
                id: action.payload.id,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                username: action.payload.username,
                image: action.payload.image || "",
              }
            : null,
      };
    case ActionTypes.CLEARAUTH:
      return {
        user: null,
      };
    default:
      return state;
  }
};
