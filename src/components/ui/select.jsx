import * as React from "react";

const Select = ({ children, ...props }) => {
  return (
    <select {...props} className="border p-2 rounded">
      {children}
    </select>
  );
};

const SelectItem = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};

export { Select, SelectItem };
