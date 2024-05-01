import React from "react";
import Select from "react-select";

export default function ReactSelect({ defaultValue, onChange, options }) {
  return (
    <Select defaultValue={defaultValue} onChange={onChange} options={options} />
  );
}
