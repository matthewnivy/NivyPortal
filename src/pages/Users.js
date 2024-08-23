import React, { Fragment, useEffect, useState } from "react";
import { Row, Container, Button } from "reactstrap";
import { Link } from "react-router-dom";
import ListUsers from "../components/users/ListUsers";
import { UsersApi } from "../utils/api";
import PageTitle from "../components/common/page-title/PageTitle";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import CustomTableComponent from "../components/events/CustomTableComponent";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [pending, setPending] = useState(true);
  const usersApi = new UsersApi();

  useEffect(() => {
    setPending(true);
    getUsersList();
  }, []);

  const getUsersList = async () => {
    setPending(true);
    let response = await usersApi.fetchUsersListByOrganizationId();
    if (response.success) {
      setUsers(response.content);
    }
    setPending(false);
  };
  return (
    <Fragment>
      <>
        <PageTitle
          heading="Create / Manage Accounts"
          subheading="This page includes creation, updation and stats of the associate accounts."
          icon="pe-7s-graph icon-gradient bg-ripe-malin"
        />
        <Row>
          <Link
            to={{
              pathname: "/users/new",
            }}
          >
            <Button className="mb-2 createButton">
              {" "}
              Create New Associate Account
            </Button>
          </Link>
          <div className="Title">
            <ListUsers
              data={users}
              setData={setUsers}
              getUsersList={getUsersList}
              loading={pending}
              tableTitle={"Manage Accounts"}
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
                data={users}
                venues="venueIds"
                usersvendors="managedVendors"
                headerImage="profileImage"
                imageTitle={{ firstName: "firstName", lastName: "lastName" }}
                editButtonRoute="id"
              ></CustomTableComponent>
            )}
          </div>
        </Row>
      </>
    </Fragment>
  );
};

export default Users;