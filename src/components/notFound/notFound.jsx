import React from "react";
import s from "./notFound.module.css";
import four from "../../assets/images/notFound/4.svg";
import kaktus from "../../assets/images/notFound/kaktus.svg";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={s.notFound}>
      <div className={s.imges}>
        <img className={s.image} src={four} alt="img" />
        <img className={s.image} src={kaktus} alt="img" />
        <img className={s.image} src={four} alt="img" />
      </div>
      <h1 className={s.title}>Page Not Found</h1>
      <p className={s.text}>
        We’re sorry, the page you requested could not be found.
      </p>
      <p className={s.text}> Please go back to the homepage.</p>
      <Link to="/" className={s.home_btn}>
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
