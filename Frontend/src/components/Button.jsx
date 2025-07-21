import React from "react";

const Button = ({buttonIcon}) => {
  return (
    <div>
      <button className="w-[40px] h-[40px] bg-white flex items-center justify-center rounded-[50%]">
        <buttonIcon className="text-2xl text-black " />
      </button>
    </div>
  );
};

export default Button;
