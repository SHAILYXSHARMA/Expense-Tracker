import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <img
        src="./src/assets/logoo.png"
        alt="logo"
        style={{
          width: "200px", // Adjust the width as needed
          height: "64px", // Adjust the height as needed
          objectFit: "contain", // Ensures the image is not distorted
        }}
      />
    </Link>
  );
};

export default Logo;
