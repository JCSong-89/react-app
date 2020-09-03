import { useState } from "react";

export default (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    const newValue = value.replace(/[^a-zA-Z0-9]/g, "");
    setValue(newValue);
  };
  return { value, onChange };
};
