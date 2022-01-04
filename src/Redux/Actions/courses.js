import { getAllCourses } from "./../../services/courseService";

export const getCourses = () => {
  return async (dispatch) => {
    const { data } = await getAllCourses();
    await dispatch({ type: "INIT", payload: data.courses });
  };
};
