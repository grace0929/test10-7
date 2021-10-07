import React from "react";
import SideForSup from "../components/SideForSup";

//retailer 使用的 routes
import routes from "../routes_supplier";

export default function SupplierAdmin() {
  return (
    <div>
      <SideForSup routes={routes} />
    </div>
  );
}
