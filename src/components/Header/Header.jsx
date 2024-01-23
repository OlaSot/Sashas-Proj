import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import s from "./Header.module.css";
import mainLogo from "../../assets/images/header/main-logo.svg";
import basketImg from "../../assets/images/header/basket.svg";
import menuIcon from "../../assets/images/header/menu.svg";
import closeAside from "../../assets/images/basket/x.svg";

function Header() {
  const navigate = useNavigate();
  const productsCount = useSelector(
    (state) => state.productsBasket.productsBasket.length
  );

  let [style, setStyle] = useState(null);
  const menuOpener = () => {
    {
      style = setStyle(s.menuIsOpen);
    }
  };
  const menuCloser = () => {
    {
      style = setStyle(null);
    }
  };
  return (
    <>
      <header className={s.headerDesktop}>
        <img
          id={s.mainLogo}
          src={mainLogo}
          alt="main-logo"
          onClick={() => {
            navigate("/");
          }}
        />
        <nav>
          <Link to="/" {...window.scrollTo({ top: 0, behavior: "smooth" })}>
            Main Page
          </Link>
          <Link to="/categories">Categories</Link>
          <Link to="/products">All products</Link>
          <Link to="/sales">All sales</Link>
        </nav>
        <img
          id={s.basket}
          src={basketImg}
          alt="basket"
          onClick={() => {
            navigate("/basket");
          }}
        />
        {productsCount > 0 ? (
          <p className={s.productsCount}>{productsCount}</p>
        ) : null}
      </header>
      <header className={s.headerMobile}>
        <div className={s.headerWrapper}>
          <div className={s.iconWrapper}>
            <img
              id={s.mainLogo}
              src={mainLogo}
              alt="main-logo"
              onClick={() => {
                navigate("/");
              }}
            />
            <img
              id={s.basket}
              src={basketImg}
              alt="basket"
              onClick={() => {
                navigate("/basket");
              }}
            />
            {productsCount > 0 ? (
              <p className={s.prodCountMobile}>{productsCount}</p>
            ) : null}
          </div>
          <img
            className={s.menuIcon}
            src={menuIcon}
            alt="menu"
            onClick={() => menuOpener()}
          />
        </div>
        <aside className={style}>
          <img
            className={s.closeAside}
            src={closeAside}
            alt="X"
            onClick={() => menuCloser()}
          />
          <nav className={s.navMobile}>
            <Link
              to="/"
              {...window.scrollTo({ top: 0, behavior: "smooth" })}
              onClick={() => menuCloser()}
            >
              Main Page
            </Link>
            <Link to="/categories" onClick={() => menuCloser()}>
              Categories
            </Link>
            <Link to="/products" onClick={() => menuCloser()}>
              All products
            </Link>
            <Link to="/sales" onClick={() => menuCloser()}>
              All sales
            </Link>
          </nav>
        </aside>
      </header>
    </>
  );
}
export default Header;
