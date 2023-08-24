import {
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
} from "../actionTypes";

const initialState = {
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  loading: false,
  error: false,
  message: "",
  detail: {},
  list: [],
  id: "",
};

type ActionType = {
  type: string;
  payload?: any;
};

const userReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        createLoading: true,
        updateLoading: false,
        deleteLoading: false,
        loading: false,
        error: false,
        message: "",
        id: "",
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        createLoading: false,
        id: action.payload.id,
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        createLoading: false,
        error: true,
      };
    case FETCH_USERS:
      return {
        ...state,
        loading: true,
        createLoading: false,
        updateLoading: false,
        deleteLoading: false,
        error: false,
        message: "",
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.data,
        total: action.payload.total,
        error: false,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        list: [],
      };
    case FETCH_USER:
      return {
        ...state,
        loading: true,
        createLoading: false,
        updateLoading: false,
        deleteLoading: false,
        error: false,
        message: "",
        id: "",
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: action.payload.data,
        error: false,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        detail: {},
      };
    case UPDATE_USER:
      return {
        ...state,
        createLoading: false,
        updateLoading: true,
        deleteLoading: false,
        loading: false,
        error: false,
        message: "",
        id: "",
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        id: action.payload.id,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        updateLoading: false,
        error: true,
      };
    case DELETE_USER:
      return {
        ...state,
        createLoading: false,
        updateLoading: false,
        deleteLoading: true,
        loading: false,
        error: false,
        message: "",
        id: "",
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        id: action.payload.id,
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        deleteLoading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default userReducer;
