import React from "react";
import s from "./Footer.module.css";
import { Link } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <h1 className={s.title}>Contacts</h1>
        <div className={s.contacts}>
          <div className={s.contacts_item}>
            <p className={s.title_of_contacts}>Phone</p>
            <a className={s.link} href="tel:+499999999999">
              +49 999 999 99 99
            </a>
          </div>

          <div className={s.contacts_item}>
            <p className={s.title_of_contacts}>Socials</p>
            <div className={s.socials}>
              <Link
                className={s.icon}
                to={"https://www.instagram.com/startainstitute/"}
                target="_blank"
              >
                <InstagramIcon sx={{ color: "black" }} />
              </Link>
              <Link className={s.icon} to={"/"} target="_blank">
                <WhatsAppIcon sx={{ color: "black" }} />
              </Link>
            </div>
          </div>

          <div className={s.contacts_item}>
            <p className={s.title_of_contacts}>Address</p>
            <Link
              className={s.link}
              target="_blank"
              to="https://www.google.com/search?q=telranDE"
            >
              Linkstraße 2, 8 OG, 10785, Berlin, Deutschland
            </Link>
          </div>

          <div className={s.contacts_item}>
            <p className={s.title_of_contacts}>Working Hours</p>
            <Link to="/notFound" className={s.link}>
              24 hours a day
            </Link>
          </div>
        </div>
        <div className={s.map}>
          <iframe
            title="tel_ran"
            frameBorder="0"
            width="100%"
            height="400px"
            src="https://maps.google.com/maps?width=500&amp;height=400&amp;hl=en&amp;q=Linkstra%C3%9Fe%202,%208%20OG,%2010785%20Berlin+(tel_ran)&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
