import React from "react";
import { ClipLoader } from "react-spinners";
const Loader = ({ size, color, isLoading, optionalStyle }) => {
  return (
    <div className={optionalStyle}>
      <ClipLoader size={size} color={color} loading={isLoading} />
    </div>
  );
};

Loader.defaultProps = {
  size: 150,
  color: "#123abc",
  isLoading: true,
  optionalStyle: {},
};

export default Loader;
