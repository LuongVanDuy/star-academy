import { createUnit, fetchUnitsActive, fetchUnit, fetchUnits, updateUnit } from "@/lib/unit";
import { Unit } from "@/types/unit";
import { AppDispatch } from "../store";

import {
  CREATE_UNIT,
  CREATE_UNIT_SUCCESS,
  CREATE_UNIT_FAILURE,
  FETCH_UNITS,
  FETCH_UNITS_SUCCESS,
  FETCH_UNITS_FAILURE,
  FETCH_UNITS_ACTIVE,
  FETCH_UNITS_ACTIVE_SUCCESS,
  FETCH_UNITS_ACTIVE_FAILURE,
  FETCH_UNIT,
  FETCH_UNIT_SUCCESS,
  FETCH_UNIT_FAILURE,
  UPDATE_UNIT,
  UPDATE_UNIT_SUCCESS,
  UPDATE_UNIT_FAILURE,
} from "../actionTypes";

export const createNewUnit = (
  payload: Unit,
  onSuccess: any,
  onFailure: any
) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: CREATE_UNIT });
    createUnit(payload)
      .then((response) => {
        dispatch({ type: CREATE_UNIT_SUCCESS, payload: response });
        if (onSuccess) {
          onSuccess(response.id);
        }
      })
      .catch((error) => {
        console.log("[ERROR][unitActions] createNewUnit: ", error);
        dispatch({ type: CREATE_UNIT_FAILURE });
        if (onFailure) {
          onFailure();
        }
      });
  };
};

export const fetchUnitList = (option: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_UNITS });
    fetchUnits()
      .then((response) => {
        dispatch({ type: FETCH_UNITS_SUCCESS, payload: response });
      })
      .catch((error) => {
        console.log("[ERROR][unitActions] fetchUnitList: ", error);
        dispatch({ type: FETCH_UNITS_FAILURE });
      });
  };
};

export const fetchUnitListActive = (unitIds: string[]) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_UNITS_ACTIVE });
    fetchUnitsActive(unitIds)
      .then((response) => {
        dispatch({ type: FETCH_UNITS_ACTIVE_SUCCESS, payload: response });
      })
      .catch((error) => {
        console.log("[ERROR][unitActions] fetchUnitListActive: ", error);
        dispatch({ type: FETCH_UNITS_ACTIVE_FAILURE });
      });
  };
};

export const fetchUnitDetail = (id: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_UNIT });
    fetchUnit(id)
      .then((response) => {
        dispatch({ type: FETCH_UNIT_SUCCESS, payload: response });
      })
      .catch((error) => {
        console.log("[ERROR][unitActions] fetchUnitDetail: ", error);
        dispatch({ type: FETCH_UNIT_FAILURE });
      });
  };
};

export const updateUnitInfo = (
  payload: Unit,
  onSuccess: any,
  onFailure: any
) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: UPDATE_UNIT });
    updateUnit(payload)
      .then((response) => {
        dispatch({ type: UPDATE_UNIT_SUCCESS, payload: response });
        if (onSuccess) {
          onSuccess(response.id);
        }
      })
      .catch((error) => {
        console.log("[ERROR][unitActions] updateUnitInfo: ", error);
        dispatch({ type: UPDATE_UNIT_FAILURE });
        if (onFailure) {
          onFailure();
        }
      });
  };
};
