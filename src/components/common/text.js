import React from "react";

export const Text = (props) => (
  <p className={`text-gray-800 n-font-size ${props.className}`}>
    {props.children}
  </p>
);
