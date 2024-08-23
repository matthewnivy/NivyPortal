import React, { Fragment, useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
// import SearchBox from "../Pages/Components/SearchBox";
import { Row, Col } from "reactstrap";
// import { getRewardsListByVenueId } from "../utils/ApiHandler";
// import ListRewards from "../components/rewards/ListRewards";
// import AddReward from "../components/rewards/AddReward";
import PageTitle from "../components/common/page-title/PageTitle";
import RewardsListByPhoneNumber from "../components/reward/reward-phone-number/RewardsListByPhoneNumber";
import { RewardsApi } from "../utils/api";
import ListRewards from "../components/reward/ListRewards";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Button } from "reactstrap";
import CustomTableComponent from "../components/events/CustomTableComponent";

const Rewards = () => {
  const [rewards, setRewards] = useState([]);
  const [pending, setPending] = useState(true);
  const [modal, setModal] = useState(false);
  const rewardsApi = new RewardsApi();

  const toggle = () => {
    setModal(!modal);
  };
  useEffect(() => {
    setPending(true);
    getRewardsList(localStorage.getItem("selectedVenueId"));
  }, []);

  const getRewardsList = async (venueId) => {
    let response = await rewardsApi.fetchRewardsListByVenueId({
      venueId: venueId,
      OrgId: "NivyWebApp",
    });
    if (response.success) {
      setRewards(response.content);
    }
    setPending(false);
  };

  return (
    <Fragment>
      <TransitionGroup>
        <CSSTransition
          component="div"
          className="TabsAnimation"
          appear={true}
          timeout={0}
          enter={false}
          exit={false}
        >
          <div>
            <PageTitle
              heading="Create / Manage Rewards"
              subheading="This page includes creation, updation and stats of the rewards."
              icon="pe-7s-graph icon-gradient bg-ripe-malin"
            />
            <Button className="mb-2 createButton_reward">
              {" "}
              Create New Reward
            </Button>
            {/* <AddReward /> */}
            <div className="Title">
              <ListRewards
                rewards={rewards}
                toggle={toggle}
                modal={modal}
                loading={pending}
              />
            </div>
            <div className="toggleDisplay">
              {pending ? (
                <Stack spacing={1}>
                  <Skeleton variant="rectangular" width={"89vw"} height={35} />
                  <Skeleton variant="rounded" width={"89vw"} height={35} />
                  <Skeleton variant="rectangular" width={"89vw"} height={35} />
                  <Skeleton variant="rounded" width={"89vw"} height={35} />
                  <Skeleton variant="rectangular" width={"89vw"} height={35} />
                  <Skeleton variant="rounded" width={"89vw"} height={35} />
                  <Skeleton variant="rectangular" width={"89vw"} height={35} />
                  <Skeleton variant="rounded" width={"89vw"} height={35} />
                  <Skeleton variant="rectangular" width={"89vw"} height={35} />
                  <Skeleton variant="rounded" width={"89vw"} height={35} />
                  <Skeleton variant="rectangular" width={"89vw"} height={35} />
                  <Skeleton variant="rounded" width={"89vw"} height={35} />
                  <Skeleton variant="rectangular" width={"89vw"} height={35} />
                  <Skeleton variant="rounded" width={"89vw"} height={35} />
                  <Skeleton variant="rectangular" width={"89vw"} height={35} />
                  <Skeleton variant="rounded" width={"89vw"} height={35} />
                </Stack>
              ) : (
                <CustomTableComponent
                  data={rewards}
                  id="rewardId"
                  type="rewardType"
                  imageTitle="rewardName"
                  headerImage="rewardImage"
                  amount="abc"
                  points="rewardCost"
                  vendors="rewardCouponVendors"
                  screenName="Reward"
                ></CustomTableComponent>
              )}
            </div>
            <RewardsListByPhoneNumber />
          </div>
        </CSSTransition>
      </TransitionGroup>
    </Fragment>
  );
};

export default Rewards;