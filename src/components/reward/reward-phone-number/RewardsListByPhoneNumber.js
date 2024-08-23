import React, { Fragment, useState } from "react";
import DataTable from "react-data-table-component";
import Loader from "react-loaders";
import { Card, CardBody, Col, Row } from "reactstrap";
import SearchBox from "../../common/search-box/SearchBox";
// import { getRewardsListByUserPhoneNumber } from "../../utils/ApiHandler";
// import { notify } from "../../utils/Notification";
import { RewardsApi } from "../../../utils/api";
import './style.css'
const columns = [
  {
    name: <div>ID</div>,
    selector: (row) => row.rewardId,
    sortable: true,
  },
  {
    name: "Reward Name",
    selector: (row) => row.rewardName,
    sortable: true,
  },
  {
    name: "Reward Type",
    id: "lastName",
    selector: (row) => row.rewardType,
    sortable: true,
  },

  {
    name: "Rewards Amount",
    selector: (row) =>
      `${row.rewardCouponAmmountUnit} ${row.rewardCouponAmmount}`,
    sortable: true,
  },

  {
    name: "Points Required",
    selector: (row) => row.rewardCost,
    sortable: true,
  },

  {
    name: "Status",
    selector: (row) => row.rewardStatus,
    sortable: true,
  },

  {
    name: "Vendor's Applicable",
    selector: (row) => row.rewardCouponVendors,
    sortable: true,
  },
];

const RewardsListByPhoneNumber = () => {
  const [rewards, setRewards] = useState([]);
  const [pending, setPending] = useState(false);
  const rewardsApi = new RewardsApi();

  const getRewardsListByPhoneNumber = async (phoneNumber) => {
    setPending(true);
    let response = await rewardsApi.fetchRewardsListByUserPhoneNumber({
      phoneNumber: phoneNumber,
      orgId: "NivyWebApp",
    });
    if (response.success) {
      setRewards(response.content);
    }
    setPending(false);
  };

  // const validator = (phoneNumber) => {
  //   if (phoneNumber == "") {
  //     notify("Please enter phone number to get the results", "warning");
  //     return false;
  //   }
  //   if (phoneNumber.length < 10) {
  //     notify("Phone number must be of at least 10 digits", "error");
  //     return false;
  //   }
  //   return true;
  // };

  const getRewardsHandler = (e) => {
    setRewards([]);
    e.preventDefault();
    // if (validator(e.target[0].value)) {
      getRewardsListByPhoneNumber(e.target[0].value);
    // }
  };
  return (
    <Fragment>
      <Card>
        <Row>
          <Col md="12">
            <div className="card-header">Search By User Phone Number</div>
            <div className="card-header-title font-size-lg text-capitalize fw-bold mt-4 text-center">
              <form onSubmit={getRewardsHandler}>
                Get Rewards By User Phone Number:
                <div className="d-flex flex-row justify-content-center align-items-center my-4">
                  <SearchBox />
                </div>
              </form>
            </div>
          </Col>
        </Row>
        <CardBody>
          <DataTable
            data={rewards}
            columns={columns}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="400px"
            progressPending={pending}
            progressComponent={<Loader />}
          />
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default RewardsListByPhoneNumber;
