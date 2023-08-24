/** @format */

import {
  CREATE_LESSON,
  CREATE_LESSON_SUCCESS,
  CREATE_LESSON_FAILURE,
  FETCH_LESSONS,
  FETCH_LESSONS_SUCCESS,
  FETCH_LESSONS_FAILURE,
  FETCH_LESSON,
  FETCH_LESSON_SUCCESS,
  FETCH_LESSON_FAILURE,
  UPDATE_LESSON,
  UPDATE_LESSON_SUCCESS,
  UPDATE_LESSON_FAILURE,
  DELETE_LESSON,
  DELETE_LESSON_SUCCESS,
  DELETE_LESSON_FAILURE,
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

const lessonReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case CREATE_LESSON:
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
    case CREATE_LESSON_SUCCESS:
      return {
        ...state,
        createLoading: false,
        id: action.payload.id,
      };
    case CREATE_LESSON_FAILURE:
      return {
        ...state,
        createLoading: false,
        error: true,
      };
    case FETCH_LESSONS:
      return {
        ...state,
        loading: true,
        createLoading: false,
        updateLoading: false,
        deleteLoading: false,
        error: false,
        message: "",
      };
    case FETCH_LESSONS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.data,
        total: action.payload.total,
        error: false,
      };
    case FETCH_LESSONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        list: [],
      };
    case FETCH_LESSON:
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
    case FETCH_LESSON_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: action.payload.data,
        error: false,
      };
    case FETCH_LESSON_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        detail: {},
      };
    case UPDATE_LESSON:
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
    case UPDATE_LESSON_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        id: action.payload.id,
      };
    case UPDATE_LESSON_FAILURE:
      return {
        ...state,
        updateLoading: false,
        error: true,
      };
    case DELETE_LESSON:
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
    case DELETE_LESSON_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        id: action.payload.id,
      };
    case DELETE_LESSON_FAILURE:
      return {
        ...state,
        deleteLoading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default lessonReducer;
