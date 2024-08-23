import React, { Fragment, useContext, useEffect, useState } from "react";
import EditMenuBox from "../components/edit-menu/EditMenuBox";
import { VendorsApi } from "../utils/api";
import Breadcrumb from "../components/common/breadcrumb/Breadcrumb";
import { Button } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../context/auth-context";
import { Skeleton, Stack } from "@mui/material";
import { useQuery } from "react-query";

const EditMenu = () => {
  const authCtx = useContext(AuthContext);
  const vendorsApi = new VendorsApi();
  const { vendorId } = useParams();

  const getVendorCategories = async () => {
    const response = await vendorsApi.fetchVendorCategoriesWithDetails({
      venueId: authCtx.selectedVenueId,
      vendorId: vendorId,
    });
    return response;
  };

  const { data, status } = useQuery("categories", getVendorCategories);

  return (
    <Fragment>
      <Breadcrumb />
      <Link to={`/vendors/${vendorId}/products/new`}>
        <Button className="mt-4 createButton"> Add New Item</Button>
      </Link>
      <div className="mt-4">
        {status == "loading" ? (
          <Stack spacing={1}>
            <Skeleton variant="rectangular" width={"82vw"} height={47} />
            <Skeleton variant="rounded" width={"82vw"} height={47} />
            <Skeleton variant="rectangular" width={"82vw"} height={47} />
            <Skeleton variant="rounded" width={"82vw"} height={47} />
            <Skeleton variant="rectangular" width={"82vw"} height={47} />
            <Skeleton variant="rounded" width={"82vw"} height={47} />
            <Skeleton variant="rounded" width={"82vw"} height={47} />
            <Skeleton variant="rounded" width={"82vw"} height={47} />
            <Skeleton variant="rounded" width={"82vw"} height={47} />
            <Skeleton variant="rounded" width={"82vw"} height={47} />
            <Skeleton variant="rounded" width={"82vw"} height={47} />
            <Skeleton variant="rounded" width={"82vw"} height={47} />
            <Skeleton variant="rounded" width={"82vw"} height={47} />
            <Skeleton variant="rectangular" width={"82vw"} height={47} />
            <Skeleton variant="rounded" width={"82vw"} height={47} />
          </Stack>
        ) : (
          data.content?.map((category, index) => (
            <EditMenuBox category={category} />
          ))
        )}
      </div>
    </Fragment>
  );
};

export default EditMenu;
