"use client";

import { checkAuth } from "@/app/utils/checkAuth";
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

const initialState: ReducerState = {
  user: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  },
};

export const AuthContext = createContext<AuthInterface | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const data: AuthDataInterface = useMemo(() => {
    return {
      user: { ...state.user! },
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

  useEffect(() => {
    const initAuth = async () => {
      console.log('Context is fetching...')
      const user = await checkAuth();
      if (user) {
        dispatch({ type: ActionTypes.SETAUTH, payload: user });
      } else {
        dispatch({ type: ActionTypes.CLEARAUTH });
      }
    };

    initAuth();
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
