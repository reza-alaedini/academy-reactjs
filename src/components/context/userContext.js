import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "./context";
import { useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import { registerUser, loginUser } from "./../../services/userServices";
import { addUser } from "./../../Redux/Actions/user";
import { decode } from "./../../util/decode";
import { error, success } from "./../../util/message";

const UserContext = ({ children }) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [policy, setPolicy] = useState();

  const [, forceUpdate] = useState();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const validator = useRef(
    new SimpleReactValidator({
      messages: {
        required: "پر کردن این فیلد الزامی است.",
        min: "نام و نام خانوادگی نباید کمتر از 5 کاراکتر باشد.",
        email: "ایمیل نوشته شده صحیح نمی باشد.",
      },
      element: (message) => <div style={{ color: "red" }}>{message}</div>,
    })
  );

  const resetStates = () => {
    setFullname("");
    setEmail("");
    setPassword("");
    setPolicy();
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const user = {
      fullname, // --> fullname: fullname,
      email, // --> email: email,
      password, // --> password: password,
    };

    try {
      if (validator.current.allValid()) {
        const { status } = await registerUser(user);
        if (status === 201) {
          success("شخص با موفقیت اضافه شد !");
          navigate("/login", { replace: true });
          resetStates();
        }
      } else {
        validator.current.showMessages();
        forceUpdate(1);
      }
    } catch (ex) {
      error("مشکلی پیش آمد !");
      console.log(ex);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const user = {
      email,
      password,
    };

    try {
      if (validator.current.allValid()) {
        const { status, data } = await loginUser(user);
        if (status === 200) {
          console.log(data);
          success("کاربر با موفقیت وارد شد !");
          localStorage.setItem("token", data.token);
          dispatch(addUser(decode(data.token).payload.user));
          navigate("/", { replace: true });
          resetStates();
        }
      } else {
        validator.current.showMessages();
        forceUpdate(1);
      }
    } catch (ex) {
      console.log(ex);
      error("مشکلی پیش آمد !");
    }
  };

  return (
    <context.Provider
      value={{
        fullname,
        setFullname,
        email,
        setEmail,
        password,
        setPassword,
        policy,
        setPolicy,
        validator,
        handleRegister,
        handleLogin,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default UserContext;
