import { Modal } from "flowbite-react";
import React, { useState } from "react";
import CloseButton from "../CloseButton";

const AppModal = ({
  isOpen,
  onClose,
  children,
  maxWidth = "1320px",
  bodyClassName = "",
  className = "",
  dismissible = true,
  closeButton = false,
}) => {
  const customTheme = {
    color: {
      primary: "bg-red-500 hover:bg-red-600",
    },
  };

  return (
    <Modal
      className={`focus:outline-none relative modal-fade-in ${className}`}
      dismissible={dismissible}
      show={isOpen}
      onClose={() => onClose(false)}
    >
      {closeButton ? (
        <CloseButton
          onClick={() => onClose()}
          className={"right-[7px] top-[7px] absolute"}
        />
      ) : null}
      {/* <Modal.Header>Terms of Service</Modal.Header> */}
      <Modal.Body
        className={`modal-body-card p-[20px] w-full max-w-[${maxWidth}] ${bodyClassName}`}
      >
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default AppModal;
