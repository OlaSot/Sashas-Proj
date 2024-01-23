import s from "./ModalWindow.module.css";
import React from "react";

function ModalWindow({ onClose }) {
  return (
    <div className={s.overlay}>
      <div className={s.modal}>
        <div className={s.textDivSuccess}>
          <div className={s.upperSide}>
            <h3 className={s.h3Success}>Congratulations!</h3>

            <svg
              onClick={onClose}
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              className={s.closeIcon}
            >
              <path
                d="M33 11L11 33"
                stroke="white"
                strokeWidth="3.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 11L33 33"
                stroke="white"
                strokeWidth="3.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className={s.pSuccess}>
            Your order has been successfully placed <br /> on the website.
          </p>
          <p className={s.pSuccess}>
            A manager will contact you shortly <br /> to confirm your order.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ModalWindow;
