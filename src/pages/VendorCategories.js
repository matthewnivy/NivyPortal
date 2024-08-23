import React, { useContext, useEffect, useState } from "react";
import VendorBox from "../components/vendors/vendor-box/VendorBox";
import CategoryBox from "../components/vendors/category-box/CategoryBox";
import { useParams } from "react-router-dom";
import AuthContext from "../context/auth-context";
import { VendorsApi } from "../utils/api";
import { Skeleton, Stack } from "@mui/material";
import Breadcrumb from "../components/common/breadcrumb/Breadcrumb";

const VendorCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { vendorId } = useParams();
  const authCtx = useContext(AuthContext);
  const vendorsApi = new VendorsApi();

  useEffect(() => {
    const getVendorCategories = async () => {
      const response = await vendorsApi.fetchVendorCategoriesWithDetails({
        venueId: authCtx.selectedVenueId,
        vendorId: vendorId,
      });
      if (response.success) {
        setCategories(response.content);
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    getVendorCategories();
  }, []);
  return (
    <div>
      <Breadcrumb />
      <div className="mt-4">
        {isLoading ? (
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
          categories.map((category, index) => (
            <CategoryBox
              categoryName={category.category}
              key={index}
              items={category.items}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default VendorCategories;
