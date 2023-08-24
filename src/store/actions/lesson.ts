import { AppDispatch } from "../store";

import {
  CREATE_LESSON,
  CREATE_LESSON_SUCCESS,
  CREATE_LESSON_FAILURE,
  FETCH_LESSONS,
  FETCH_LESSONS_SUCCESS,
  FETCH_LESSONS_FAILURE,
  UPDATE_LESSON,
  UPDATE_LESSON_SUCCESS,
  UPDATE_LESSON_FAILURE,
  FETCH_LESSON,
  FETCH_LESSON_SUCCESS,
  FETCH_LESSON_FAILURE,
} from "../actionTypes";
import { createLesson, fetchLesson, fetchLessons, updateLesson } from "@/lib/lesson";
import { Lesson } from "@/types/lesson";

export const createNewLesson = (
  payload: Lesson,
  onSuccess: any,
  onFailure: any
) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: CREATE_LESSON });
    createLesson(payload)
      .then((response) => {
        dispatch({ type: CREATE_LESSON_SUCCESS, payload: response });
        if (onSuccess) {
          onSuccess(response.id);
        }
      })
      .catch((error) => {
        console.log("[ERROR][lessonActions] createNewLesson: ", error);
        dispatch({ type: CREATE_LESSON_FAILURE });
        if (onFailure) {
          onFailure();
        }
      });
  };
};

export const fetchLessonList = (option: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_LESSONS });
    fetchLessons(option)
      .then((response) => {
        dispatch({ type: FETCH_LESSONS_SUCCESS, payload: response });
      })
      .catch((error) => {
        console.log("[ERROR][lessonActions] fetchLessonList: ", error);
        dispatch({ type: FETCH_LESSONS_FAILURE });
      });
  };
};

export const fetchLessonDetail = (id: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_LESSON });
    fetchLesson(id)
      .then((response) => {
        dispatch({ type: FETCH_LESSON_SUCCESS, payload: response });
      })
      .catch((error) => {
        console.log("[ERROR][unitActions] fetchLessonDetail: ", error);
        dispatch({ type: FETCH_LESSON_FAILURE });
      });
  };
};

export const updateLessonInfo = (
  payload: Lesson,
  onSuccess: any,
  onFailure: any
) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: UPDATE_LESSON });
    updateLesson(payload)
      .then((response) => {
        dispatch({ type: UPDATE_LESSON_SUCCESS, payload: response });
        if (onSuccess) {
          onSuccess(response.id);
        }
      })
      .catch((error) => {
        console.log("[ERROR][lessonActions] updateLessonInfo: ", error);
        dispatch({ type: UPDATE_LESSON_FAILURE });
        if (onFailure) {
          onFailure();
        }
      });
  };
};
