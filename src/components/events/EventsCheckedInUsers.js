import { useState } from "react";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
  Row,
  Table,
  UncontrolledDropdown,
} from "reactstrap";
import avatar2 from "../../assets/1.jpg";
import { EventsApi } from "../../utils/api";
import styles from "./style.module.css";

const EventsCheckedInUsers = ({ eventsList }) => {
  const [checkedInUsers, setCheckedInUsers] = useState([]);
  const [IsResultFetched, setIsResultFetched] = useState(false);
  const eventsApi = new EventsApi();

  const selectEventHandler = (event) => {
    console.log(event);
    getCheckedInUsersListHandler(
      localStorage.getItem("selectedVenueId") ?? null,
      event?.id
    );
  };

  const getCheckedInUsersListHandler = async (venueId, eventId) => {
    setCheckedInUsers([]);
    const response = await eventsApi.getUserCheckInDetails({
      venueId: venueId,
      eventId: eventId,
      orgId: "UNA_LIONS",
    });
    if (response.success) {
      console.log(response);
      setCheckedInUsers(response.content);
    }
    setIsResultFetched(true);
  };
  return (
    <Row>
      <Col md="12">
        <Card className={styles.checkedinusers_card}>
          <CardHeader
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            CHECKED IN USERS
            <div className="btn-actions-pane-right">
              <div className="btn-actions-pane-right actions-icon-btn">
                <UncontrolledDropdown className="me-2" direction="start">
                  <DropdownToggle
                    caret
                    color="primary"
                    style={{ backgroundColor: "#0d6efd" }}
                  >
                    Select Event to get the checked in users
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Select Event:</DropdownItem>
                    {eventsList ? (
                      eventsList.map((event) => (
                        <DropdownItem onClick={() => selectEventHandler(event)}>
                          {event.eventName}
                        </DropdownItem>
                      ))
                    ) : (
                      <DropdownItem>No venue available</DropdownItem>
                    )}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </div>
          </CardHeader>
          <Table
            responsive
            hover
            striped
            borderless
            className="align-middle mb-0"
          >
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th>Name</th>
                <th className="text-center">Email</th>
                <th className="text-center">Visits</th>
              </tr>
            </thead>
            <tbody>
              {checkedInUsers.length > 0
                ? checkedInUsers.map((user) => (
                    <tr>
                      <td className="text-center text-muted"># {user?.id}</td>
                      <td>
                        <div className="widget-content p-0">
                          <div className="widget-content-wrapper">
                            <div className="widget-content-left me-3">
                              <div className="widget-content-left">
                                <img
                                  width={40}
                                  className="rounded-circle"
                                  src={
                                    user?.imageUrl == ""
                                      ? avatar2
                                      : user?.imageUrl
                                  }
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="widget-content-left flex2">
                              <div className="widget-heading">{user?.name}</div>
                              <div className="widget-subheading opacity-7">
                                Customer / Client
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">{user?.email}</td>
                      <td className="text-center">{user?.visitCounts}</td>
                    </tr>
                  ))
                : null}
              {/* <tr>
                <td className="text-center text-muted">#347</td>
                <td>
                  <div className="widget-content p-0">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-left me-3">
                        <div className="widget-content-left">
                          <img
                            width={40}
                            className="rounded-circle"
                            src={avatar1}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="widget-content-left flex2">
                        <div className="widget-heading">Ruben Tillman</div>
                        <div className="widget-subheading opacity-7">
                          Etiam sit amet orci eget
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-center">Berlin</td>
                <td className="text-center">
                  <div className="badge bg-success">Completed</div>
                </td>
                <td className="text-center" style={{ width: "150px" }}>
                  <Sparklines height={60} data={sampleData}>
                    <SparklinesBars
                      style={{
                        stroke: "none",
                        fill: "#3ac47d",
                        fillOpacity: ".5",
                      }}
                    />
                  </Sparklines>
                </td>
                <td className="text-center">
                  <Button
                    size="sm"
                    color="primary"
                    id={"PopoverCustomT-2"}
                    // onClick={this.togglePop2}
                  >
                    Details
                  </Button>
                  <Popover
                    className="popover-custom rm-pointers"
                    placement="auto"
                    // isOpen={this.state.popoverOpen2}
                    target={"PopoverCustomT-2"}
                    // toggle={this.togglePop2}
                  >
                    <PopoverBody>
                      <div className="dropdown-menu-header">
                        <div
                          className={classnames(
                            "dropdown-menu-header-inner bg-danger"
                          )}
                        >
                          <div
                            className="menu-header-image"
                            style={{
                              backgroundImage: "url(" + bg1 + ")",
                            }}
                          />
                          <div className="menu-header-content">
                            <h5 className="menu-header-title">Settings</h5>
                            <h6 className="menu-header-subtitle">
                              Manage all of your options
                            </h6>
                          </div>
                        </div>
                      </div>
                      <Nav vertical>
                        <NavItem className="nav-item-header">Activity</NavItem>
                        <NavItem>
                          <NavLink href="#">
                            Chat
                            <div className="ms-auto badge rounded-pill bg-info">
                              8
                            </div>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink href="#">Recover Password</NavLink>
                        </NavItem>
                        <NavItem className="nav-item-divider" />
                        <NavItem className="nav-item-btn text-end">
                          <Button
                            size="sm"
                            className="btn-wide btn-shadow"
                            color="success"
                          >
                            Save
                          </Button>
                        </NavItem>
                      </Nav>
                    </PopoverBody>
                  </Popover>
                </td>
              </tr>
              <tr>
                <td className="text-center text-muted">#321</td>
                <td>
                  <div className="widget-content p-0">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-left me-3">
                        <div className="widget-content-left">
                          <img
                            width={40}
                            className="rounded-circle"
                            src={avatar3}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="widget-content-left flex2">
                        <div className="widget-heading">Elliot Huber</div>
                        <div className="widget-subheading opacity-7">
                          Lorem ipsum dolor sic
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-center">London</td>
                <td className="text-center">
                  <div className="badge bg-danger">In Progress</div>
                </td>
                <td className="text-center" style={{ width: "150px" }}>
                  <Sparklines height={60} data={sampleData}>
                    <SparklinesBars
                      style={{
                        stroke: "none",
                        fill: "#d92550",
                        fillOpacity: ".5",
                      }}
                    />
                  </Sparklines>
                </td>
                <td className="text-center">
                  <Button
                    size="sm"
                    color="primary"
                    id={"PopoverCustomT-3"}
                    // onClick={this.togglePop3}
                  >
                    Details
                  </Button>
                  <Popover
                    className="popover-custom rm-pointers"
                    placement="auto"
                    // isOpen={this.state.popoverOpen3}
                    target={"PopoverCustomT-3"}
                    // toggle={this.togglePop3}
                  >
                    <PopoverBody>
                      <div className="dropdown-menu-header">
                        <div
                          className={classnames(
                            "dropdown-menu-header-inner bg-focus"
                          )}
                        >
                          <div
                            className="menu-header-image"
                            style={{
                              backgroundImage: "url(" + bg1 + ")",
                            }}
                          />
                          <div className="menu-header-content">
                            <h5 className="menu-header-title">Settings</h5>
                            <h6 className="menu-header-subtitle">
                              Manage all of your options
                            </h6>
                          </div>
                        </div>
                      </div>
                      <Nav vertical>
                        <NavItem className="nav-item-header">Activity</NavItem>
                        <NavItem>
                          <NavLink href="#">
                            Chat
                            <div className="ms-auto badge rounded-pill bg-info">
                              8
                            </div>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink href="#">Recover Password</NavLink>
                        </NavItem>
                        <NavItem className="nav-item-divider" />
                        <NavItem className="nav-item-btn text-center">
                          <Button
                            size="sm"
                            className="btn-wide btn-shadow"
                            color="danger"
                          >
                            Cancel
                          </Button>
                        </NavItem>
                      </Nav>
                    </PopoverBody>
                  </Popover>
                </td>
              </tr>
              <tr>
                <td className="text-center text-muted">#55</td>
                <td>
                  <div className="widget-content p-0">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-left me-3">
                        <div className="widget-content-left">
                          <img
                            width={40}
                            className="rounded-circle"
                            src={avatar4}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="widget-content-left flex2">
                        <div className="widget-heading">Vinnie Wagstaff</div>
                        <div className="widget-subheading opacity-7">
                          UI Designer
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-center">Amsterdam</td>
                <td className="text-center">
                  <div className="badge bg-info">On Hold</div>
                </td>
                <td className="text-center" style={{ width: "150px" }}>
                  <Sparklines height={60} data={sampleData}>
                    <SparklinesLine
                      style={{
                        strokeWidth: 3,
                        stroke: "#f7b924",
                        fill: "#f7b924",
                        fillOpacity: ".2",
                      }}
                    />
                  </Sparklines>
                </td>
                <td className="text-center">
                  <Button
                    size="sm"
                    color="primary"
                    id={"PopoverCustomT-4"}
                    // onClick={this.togglePop4}
                  >
                    Details
                  </Button>
                  <Popover
                    className="popover-custom rm-pointers"
                    placement="auto"
                    // isOpen={this.state.popoverOpen4}
                    target={"PopoverCustomT-4"}
                    // toggle={this.togglePop4}
                  >
                    <PopoverBody>
                      <div className="dropdown-menu-header">
                        <div
                          className={classnames(
                            "dropdown-menu-header-inner bg-focus"
                          )}
                        >
                          <div
                            className="menu-header-image"
                            style={{
                              backgroundImage: "url(" + bg1 + ")",
                            }}
                          />
                          <div className="menu-header-content">
                            <h5 className="menu-header-title">Settings</h5>
                            <h6 className="menu-header-subtitle">
                              Manage all of your options
                            </h6>
                          </div>
                        </div>
                      </div>
                      <Nav vertical>
                        <NavItem className="nav-item-header">Activity</NavItem>
                        <NavItem>
                          <NavLink href="#">
                            Chat
                            <div className="ms-auto badge rounded-pill bg-info">
                              8
                            </div>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink href="#">Recover Password</NavLink>
                        </NavItem>
                        <NavItem className="nav-item-divider" />
                        <NavItem className="nav-item-btn text-center">
                          <Button
                            size="sm"
                            className="btn-wide btn-shadow"
                            color="danger"
                          >
                            Cancel
                          </Button>
                        </NavItem>
                      </Nav>
                    </PopoverBody>
                  </Popover>
                </td>
              </tr> */}
            </tbody>
          </Table>
          {/* <CardFooter className="d-block text-center">
            <Button
              className="me-2 btn-icon btn-icon-only"
              outline
              color="danger"
            >
              <i className="pe-7s-trash btn-icon-wrapper"> </i>
            </Button>
            <Button className="btn-wide" color="success">
              Save
            </Button>
          </CardFooter> */}

          {IsResultFetched ? (
            checkedInUsers.length == 0 && (
              <CardFooter className="d-block text-center">
                <b className="my-8"> No Checked In Users For This Event</b>
              </CardFooter>
            )
          ) : (
            <CardFooter className="d-block text-center">
              <b className="my-8">
                {" "}
                Please select the venue to search for the checked in users
              </b>
            </CardFooter>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default EventsCheckedInUsers;