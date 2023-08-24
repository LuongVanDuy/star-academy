import { createUser, fetchUsers, updateUser, deleteUser, fetchUser } from "@/lib/user";
import { User } from "@/types/user";
import { AppDispatch } from "../store";

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
import {  } from "firebase/auth";

export const createNewUser = (payload: User, onSuccess: any, onFailure: any) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: CREATE_USER });
    createUser(payload)
      .then((response) => {
        dispatch({ type: CREATE_USER_SUCCESS, payload: response });
        if (onSuccess) {
          onSuccess(response.id);
        }
      })
      .catch((error) => {
        console.log("[ERROR][userActions] createNewUser: ", error);
        dispatch({ type: CREATE_USER_FAILURE });
        if (onFailure) {
          onFailure();
        }
      });
  };
};

export const fetchUserList = (options: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_USERS });
    fetchUsers(options)
      .then((response) => {
        dispatch({ type: FETCH_USERS_SUCCESS, payload: response });
      })
      .catch((error) => {
        console.log("[ERROR][userActions] fetchUserList: ", error);
        dispatch({ type: FETCH_USERS_FAILURE });
      });
  };
};

export const fetchUserDetail = (id: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_USER });
    fetchUser(id)
      .then((response) => {
        dispatch({ type: FETCH_USER_SUCCESS, payload: response });
      })
      .catch((error) => {
        console.log("[ERROR][userActions] fetchUserDetail: ", error);
        dispatch({ type: FETCH_USER_FAILURE });
      });
  };
};

export const updateUserInfo = (payload: User, onSuccess: any, onFailure: any) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: UPDATE_USER });
    updateUser(payload)
      .then((response) => {
        dispatch({ type: UPDATE_USER_SUCCESS, payload: response });
        if (onSuccess) {
          onSuccess(response.id);
        }
      })
      .catch((error) => {
        console.log("[ERROR][userActions] updateUserInfo: ", error);
        dispatch({ type: UPDATE_USER_FAILURE });
        if (onFailure) {
          onFailure();
        }
      });
  };
};

export const deleteUserInfo = (id: string, onSuccess: any, onFailure: any) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: DELETE_USER });
    deleteUser(id)
      .then((response) => {
        dispatch({ type: DELETE_USER_SUCCESS, payload: response });
        if (onSuccess) {
          onSuccess(response.id);
        }
      })
      .catch((error) => {
        console.log("[ERROR][userActions] deleteUserInfo: ", error);
        dispatch({ type: DELETE_USER_FAILURE });
        if (onFailure) {
          onFailure();
        }
      });
  };
};
