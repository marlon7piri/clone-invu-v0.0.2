'use client'

import React from "react";

const Input = ({ onChange, placeholder }) => {
  return (
    <input
      type="text"
      onChange={onChange}
      className="outline-none p-2 border border-slate-900 rounded-md focus:border-sky-500"
      placeholder={placeholder}
    />
  );
};

export default Input;
