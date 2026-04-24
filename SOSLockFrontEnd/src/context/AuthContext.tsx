type User = {
  id: string;
  name: string;
  token: string;
};

type State = {
  user: User | null;
};

type Action =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" };

const initialState: State = {
  user: null,
};

const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

const AuthContext = createContext<any>(null);