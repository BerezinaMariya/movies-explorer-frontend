import { useRef, useState, useEffect } from "react";
import sucsess from "../../images/info-tooltip-sucsess.svg";
import unsucsess from "../../images/info-tooltip-unsucsess.svg";

function InfoTooltip(props) {
  const { isOpen, successStatusMessage, isRegOrLogSucsess, onClose, onCloseByOverlay, onCloseByEsc } = props;
  
  const popupRef = useRef();
  const [sucsessImage, setSucsessImage] = useState("");

  useEffect(() => {
    onCloseByOverlay(popupRef.current);
  }, []);

  useEffect(() => {
    if (props.isOpen) {
      // Список действий внутри одного хука
      document.addEventListener("keydown", onCloseByEsc);
      // Возвращаем функцию, которая удаляет эффекты
      return () => {
        document.removeEventListener("keydown", onCloseByEsc);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isRegOrLogSucsess) {
      setSucsessImage(sucsess);
    } else {
      setSucsessImage(unsucsess);
    }
  }, [isRegOrLogSucsess]);

  return (
    <div
      className={`popup info-tooltip ${
        isOpen ? "popup_opened" : ""
      }`}
      ref={popupRef}
    >
      <div className="info-tooltip__container">
        <button
          type="button"
          className="button-hover info-tooltip__close-button"
          onClick={onClose}
          aria-label="Закрыть"
        ></button>
        <img
          className="info-tooltip__image"
          src={sucsessImage}
          alt={`Статус регистрации или авторизации (удачная или нет)`}
        />
        <h3 className="title__24-29-med info-tooltip__title">{successStatusMessage}</h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
