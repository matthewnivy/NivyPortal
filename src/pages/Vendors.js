import React, { useContext, useEffect, useState } from "react";
import VendorBox from "../components/vendors/vendor-box/VendorBox";
import PageTitle from "../components/common/page-title/PageTitle";
import { UsersApi, VendorsApi } from "../utils/api";
import AuthContext from "../context/auth-context";
import { Skeleton, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import "../components/vendors/vendor-box/VendorBox.css";

const Vendors = () => {
  const vendorsApi = new VendorsApi();
  const [pending, setPending] = useState(true);
  const [vendors, setVendors] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    setPending(true);
    getUpcomingCampaignsList();
  }, []);

  const getUpcomingCampaignsList = async () => {
    setPending(true);
    let response = await vendorsApi.getManagedVendorsByDateTime({
      VenueId: authCtx.selectedVenueId,
      //   OrgId: "NivyWebApp",
    });
    if (response.success) {
      setVendors(response.content);
    }
    setPending(false);
  };

  return (
    <div>
      <PageTitle
        heading="Vendors"
        subheading="This page includes list of vendors, manage orders and menus."
        icon="pe-7s-graph icon-gradient bg-ripe-malin"
      />
      <Link
        to={{
          pathname: "/vendors/new",
        }}
        style={{
          padding: 0,
        }}
      >
        <Button className="mb-2 createButton"> Create New Vendor</Button>
      </Link>
      <div>
        {pending ? (
          <Stack spacing={1}>
            <Skeleton variant="rectangular" width={"82vw"} height={47} />
            <Skeleton variant="rounded" width={"82vw"} height={47} />
            <Skeleton variant="rectangular" width={"82vw"} height={47} />
            <Skeleton variant="rounded" width={"82vw"} height={47} />
            <Skeleton variant="rectangular" width={"82vw"} height={47} />
            <Skeleton variant="rounded" width={"82vw"} height={47} />
            <Skeleton variant="rectangular" width={"82vw"} height={47} />
            <Skeleton variant="rounded" width={"82vw"} height={47} />
          </Stack>
        ) : (
          vendors.map((vendor) => (
            <VendorBox
              name={vendor.vendorName}
              isOpen={vendor.isOpen}
              openOrders={vendor.openOrders}
              id={vendor.vendorId}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Vendors;