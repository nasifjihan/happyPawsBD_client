import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { useUserAuth } from "../../context/UserAuthContext";

const LogOut = () => {
  const { logOut } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );
};

export default LogOut;
