import React from "react";
import Sidebar from "../components/Sidebar";

//retailer 使用的 routes
import routes from "../routes_retailer";

export default function RetailerAdmin({ ...rest }) {
  return (
    <div>
      <Sidebar routes={routes} />
    </div>
  );
}
