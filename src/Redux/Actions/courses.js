import { hideLoading, showLoading } from "react-redux-loading-bar";
import { getAllCourses, newCourse } from "./../../services/courseService";
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
