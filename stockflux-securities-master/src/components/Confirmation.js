import React, { useState } from "react";
import "./Confirmation.css";
import Button, { ButtonSize } from "./Button";
import PropTypes from "prop-types";

const Confirmation = ({ children, confirmationText }) => {
  const [clickedStatus, setClickedStatus] = useState(false);

  return (
    <div className="confirmation-button-container">
      {!clickedStatus ? (
        <div
          onClickCapture={event => {
            event.stopPropagation();
            setClickedStatus(true);
          }}
        >
          {children}
        </div>
      ) : (
        <>
          <div className="confirmation-message-container">
            {confirmationText}
          </div>
          <div className="confirmation-option-button-container">
            <Button
              text="Yes"
              size={ButtonSize.EXTRA_SMALL}
              onClick={children.props.onClick}
              className="confirmation-option-button"
              type="button"
            />
            <Button
              text="No"
              size={ButtonSize.EXTRA_SMALL}
              onClick={() => setClickedStatus(false)}
              className="confirmation-option-button"
              type="button"
            />
          </div>
        </>
      )}
    </div>
  );
};

Confirmation.propTypes = {
  confirmationText: PropTypes.string.isRequired
};

export default Confirmation;
