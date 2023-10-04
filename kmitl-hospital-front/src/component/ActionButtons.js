import React from "react";
import axios from "axios";
import IconButton from "./IconButton";
import Swal from "sweetalert2";
import { AiOutlineDelete } from "react-icons/ai";
import { MdCheck } from "react-icons/md";

const ConfirmationButton = ({ id, buttonText, confirmationMessage }) => {
  const domain = `${process.env.REACT_APP_DB_DOMAIN}`
  
  const handleClick = async () => {
    const result = await Swal.fire({
      title: confirmationMessage,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: buttonText,
    });

    if (result.isConfirmed) {
      const tempUrl = `${domain}/report-custom/${buttonText.toLowerCase()}/${id}`;

      try {
        const response = await axios.get(tempUrl);
        if (response.status === 200) {
          Swal.fire(
            `${buttonText}!`,
            `Your appoint has been ${buttonText}.`,
            "success"
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }
      } catch (err) {
        console.log(err);
        Swal.fire("Error!", `Cannot process to ${buttonText}`, "error");
      }
    }
  };

  if (buttonText === "Confirm") {
    return <IconButton status='confirm' icon={<MdCheck />} onClick={handleClick} />;
  } else {
    return (
      <IconButton
        status='canceled'
        icon={<AiOutlineDelete />}
        onClick={handleClick}
      />
    );
  }
};

const ActionButtons = ({ id, status, name, age, date }) => {
  const isWaited = status === "waited";

  return (
    <>
      {isWaited && (
        <ConfirmationButton
          id={id}
          buttonText="Confirm"
          confirmationMessage="Are you sure? to Confirm"
          status
        />
      )}
      {isWaited && (
        <ConfirmationButton
          id={id}
          buttonText="Cancel"
          confirmationMessage="Are you sure? to Cancel"
          status
        />
      )}
    </>
  );
};

export default ActionButtons;
