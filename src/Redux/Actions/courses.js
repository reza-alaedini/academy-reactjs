import { hideLoading, showLoading } from "react-redux-loading-bar";
import {
  getAllCourses,
  newCourse,
  updateCourse,
} from "./../../services/courseService";
import { success } from "./../../util/message";

export const getCourses = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    const { data } = await getAllCourses();
    await dispatch({ type: "INIT", payload: data.courses });
    dispatch(hideLoading());
  };
};

export const createNewCourse = (course) => {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { data, status } = await newCourse(course);
    if (status === 201) success("دوره با موفقیت اضافه شد !");
    await dispatch({
      type: "ADD_COURSE",
      payload: [...getState().courses, data.course],
    });
    dispatch(hideLoading());
  };
};

export const handleUpdateCourse = (courseId, updatedCourse) => {
  return async (dispatch, getState) => {
    const courses = [...getState().courses];
    const updatedCourses = [...courses];
    const courseIndex = updatedCourses.findIndex(
      (course) => course._id === courseId
    );

    let course = updatedCourses[courseIndex];
    course = { ...Object.fromEntries(updatedCourse) };

    updatedCourses[courseIndex] = course;

    try {
      await dispatch({ type: "UPDATE_COURSE", payload: [...updatedCourses] });
      const { data, status } = await updateCourse(updatedCourse, courseId);
      if (status === 200) {
        success("دوره با موفقيت ويرايش شد !");
      }
    } catch (ex) {
      await dispatch({ type: "UPDATE_COURSE", payload: [...courses] });
    }
  };
};
