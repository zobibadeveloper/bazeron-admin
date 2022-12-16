import { createContext, useEffect, useReducer } from 'react';
import axios from '../utils/axios';
import PropTypes from 'prop-types';

const initialAuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  success: "",
  message: ""
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  }
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext(
  {
    ...initialAuthState,
    method: 'COOKIE',
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    register: () => Promise.resolve()
  }
);

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const response = await axios.get('/admin/me');
        if (response.data.status === 200) {
          const user = response.data.user;
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user
            }
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/admin/login', {
        email,
        password
      });

      if (response.data.status === 200) {
        const { user } = response.data;

        dispatch({
          type: 'LOGIN',
          payload: {
            user
          }
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post('/admin/logout');
      console.log(response);
      dispatch({ type: 'LOGOUT' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'COOKIE',
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthContext;