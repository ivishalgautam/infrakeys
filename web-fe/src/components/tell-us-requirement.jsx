import React from "react";
import QueryForm from "./forms/query";

export default function TellUsRequirement({ type }) {
  return (
    <div className="space-y-4">
      <QueryForm type={type} />
    </div>
  );
}
