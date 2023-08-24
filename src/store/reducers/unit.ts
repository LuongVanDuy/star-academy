import {
  CREATE_UNIT,
  CREATE_UNIT_SUCCESS,
  CREATE_UNIT_FAILURE,
  FETCH_UNITS,
  FETCH_UNITS_SUCCESS,
  FETCH_UNITS_FAILURE,
  UPDATE_UNIT,
  UPDATE_UNIT_SUCCESS,
  UPDATE_UNIT_FAILURE,
  FETCH_UNIT,
  FETCH_UNIT_SUCCESS,
  FETCH_UNIT_FAILURE,
  DELETE_UNIT,
  DELETE_UNIT_SUCCESS,
  DELETE_UNIT_FAILURE,
  FETCH_UNITS_ACTIVE,
  FETCH_UNITS_ACTIVE_SUCCESS,
  FETCH_UNITS_ACTIVE_FAILURE,
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
  listAvtive: [],
  id: "",
};

type ActionType = {
  type: string;
  payload?: any;
};

const unitReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case CREATE_UNIT:
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
    case CREATE_UNIT_SUCCESS:
      return {
        ...state,
        createLoading: false,
        id: action.payload.id,
      };
    case CREATE_UNIT_FAILURE:
      return {
        ...state,
        createLoading: false,
        error: true,
      };
    case FETCH_UNITS:
      return {
        ...state,
        loading: true,
        createLoading: false,
        updateLoading: false,
        deleteLoading: false,
        error: false,
        message: "",
      };
    case FETCH_UNITS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.data,
        total: action.payload.total,
        error: false,
      };
    case FETCH_UNITS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        list: [],
      };
      case FETCH_UNITS_ACTIVE:
        return {
          ...state,
          loading: true,
          createLoading: false,
          updateLoading: false,
          deleteLoading: false,
          error: false,
          message: "",
        };
      case FETCH_UNITS_ACTIVE_SUCCESS:
        return {
          ...state,
          loading: false,
          listAvtive: action.payload.data,
          total: action.payload.total,
          error: false,
        };
      case FETCH_UNITS_ACTIVE_FAILURE:
        return {
          ...state,
          loading: false,
          error: true,
          listAvtive: [],
        };
    case FETCH_UNIT:
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
    case FETCH_UNIT_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: action.payload.data,
        error: false,
      };
    case FETCH_UNIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        detail: {},
      };
    case UPDATE_UNIT:
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
    case UPDATE_UNIT_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        id: action.payload.id,
      };
    case UPDATE_UNIT_FAILURE:
      return {
        ...state,
        updateLoading: false,
        error: true,
      };
    case DELETE_UNIT:
      return {
        ...state,
        deleteLoading: true,
        updateLoading: false,
        createLoading: false,
        loading: false,
        error: false,
        message: "",
        id: "",
      };
    case DELETE_UNIT_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        id: action.payload.id,
      };
    case DELETE_UNIT_FAILURE:
      return {
        ...state,
        deleteLoading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default unitReducer;
