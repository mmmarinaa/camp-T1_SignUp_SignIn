import React, { useState } from "react";
import InputText from "../atoms/input-text";
import ListRoles from "../molecules/list-roles";
import SecondTitle from "../atoms/h2";
import PrimaryButton from "../atoms/primary-button";
import Message from "../atoms/message";
import { signUp, getCode, setStatus } from "../../http/taskAPI";
import {
  encodeBase64,
  maskString,
  containsOnlyLetters,
  isValidEmail,
} from "../../utils/methods";
import styles from "../../styles/signUp.module.css";

const SignUp = () => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [emailSignUp, setEmailSignUp] = useState("");
  const [emailLogIn, setEmailLogIn] = useState("");
  const [role, setRole] = useState("");
  const [result, setResult] = useState(null);
  const [messageType, setMessageType] = useState("");
  const [activeTab, setActiveTab] = useState("signup");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Проверяем, что введено только имя без цифр
    if (!containsOnlyLetters(firstName) || !containsOnlyLetters(lastName)) {
      setResult("Имя и фамилия не должны содержать цифры.");
      setMessageType("error");
      return;
    }

    // Проверяем корректность формата email при регистрации
    if (!isValidEmail(emailSignUp)) {
      setResult("Пожалуйста, введите корректный email.");
      setMessageType("error");
      return;
    }

    try {
      const data = {
        last_name: lastName,
        first_name: firstName,
        email: emailSignUp,
        role: role,
      };
      const response = await signUp(data);
      setResult(response);
      setMessageType("success");
    } catch (error) {
      setResult("Произошла ошибка при регистрации.");
      setMessageType("error");
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    // Проверяем корректность формата email при авторизации
    if (!isValidEmail(emailLogIn)) {
      setResult("Пожалуйста, введите корректный email.");
      setMessageType("error");
      return;
    }

    try {
      console.log("email:", emailLogIn);
      const codeResponse = await getCode(emailLogIn);
      if (!codeResponse) {
        setResult(
          "Пользователь с таким email не найден. Пожалуйста, зарегистрируйтесь."
        );
        setMessageType("error");
      } else {
        const token = encodeBase64(emailLogIn, codeResponse);
        const data = {
          token: token,
          status: "increased",
        };
        const statusResponse = await setStatus(data);
        setResult(
          <div>
            {statusResponse}
            <br />
            Ваш email: {emailLogIn}
            <br />
            Ваш код: {maskString(codeResponse, 4, 4)}
            <br />
            Ваш токен: {maskString(token, 6, 6)}
          </div>
        );
        setMessageType("success");
      }
    } catch (error) {
      console.error("Ошибка при входе:", error);
      setResult("Произошла ошибка при входе.");
      setMessageType("error");
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setResult(null);
    setLastName("");
    setFirstName("");
    setEmailSignUp("");
    setEmailLogIn("");
    setMessageType("");
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_box}>
        <div className={styles.tabs}>
          <div
            className={`${styles.tab} ${
              activeTab === "login" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("login")}
          >
            Вход
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === "signup" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("signup")}
          >
            Регистрация
          </div>
        </div>
        {activeTab === "signup" && (
          <>
            <SecondTitle value="Регистрация" />
            {result && <Message text={result} type={messageType} />}
            <form onSubmit={handleSubmit}>
              <InputText
                name="secondName"
                label="Фамилия:"
                placeholder="Иванов"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
              <InputText
                name="firstName"
                label="Имя:"
                placeholder="Иван"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
              <InputText
                name="emailSignUp"
                label="Email:"
                placeholder="example@gmail.com"
                onChange={(e) => setEmailSignUp(e.target.value)}
                value={emailSignUp}
              />
              <ListRoles setRole={setRole} />
              <PrimaryButton type="submit" value="Зарегистрироваться" />
            </form>
          </>
        )}
        {activeTab === "login" && (
          <>
            <SecondTitle value="Вход" />
            {result && <Message text={result} type={messageType} />}
            <form onSubmit={handleLoginSubmit}>
              <InputText
                name="emailLogIn"
                label="Email:"
                placeholder="example@gmail.com"
                value={emailLogIn}
                onChange={(e) => setEmailLogIn(e.target.value)}
              />
              <PrimaryButton type="submit" value="Войти" />
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUp;
