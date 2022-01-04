import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "../components/Layouts/MainLayout";
import Course from "../components/Course/Course";
import Login from "../components/Login/Login";
import Register from "../components/register/register";
import Archive from "../components/Course/Archive";
import Account from "../components/Account/Account";
import EditAccount from "../components/Account/Edit_Account";
import SingleCourse from "../components/Course/SingleCourse";
import { useSelector, useDispatch } from "react-redux";
import { paginate } from "./../util/paginate";
import { addUser, deleteUser } from "./../Redux/Actions/user";
import { decode } from "../util/decode";
import Logout from "./../components/Login/Logout";
import UserContext from "../components/context/userContext";

const Academy = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodeToken = decode(token);
      const dateNow = Date.now() / 1000; // convert unixTime to  milisecond

      if (decodeToken.payload.exp < dateNow) {
        localStorage.removeItem("token");
        dispatch(deleteUser());
      } else dispatch(addUser(decodeToken.payload.user));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const courses = useSelector((state) => state.courses);
  const indexCourses = paginate(courses, 1, 8);
  return (
    <MainLayout>
      <Routes>
        <Route
          path="/login"
          element={
            <UserContext>
              <Login />
            </UserContext>
          }
        />
        <Route
          path="/register"
          element={
            <UserContext>
              <Register />
            </UserContext>
          }
        />
        <Route path="/logout" element={<Logout />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/account" element={<Account />} />
        <Route path="/editAccount" element={<EditAccount />} />
        <Route path="/course/:id" element={<SingleCourse />} />
        <Route path="/" element={<Course courses={indexCourses} />} />
      </Routes>
    </MainLayout>
  );
};

export default Academy;
