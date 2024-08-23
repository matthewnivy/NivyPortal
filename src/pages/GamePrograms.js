import React, { Fragment, useContext, useEffect, useState } from "react";
import Modal from "../components/common/custom-modal/Modal";
import { Button, Col } from "reactstrap";
import PageTitle from "../components/common/page-title/PageTitle";
import ListGamePrograms from "../components/common/game/list-game-programs/ListGamePrograms";
import { GameProgramsApi } from "../utils/api";
import AuthContext from "../context/auth-context";
import CustomTableComponent from "../components/events/CustomTableComponent";
import { useNavigate, useNavigation } from "react-router-dom";

const GamePrograms = () => {
  const [gamePrograms, setGamePrograms] = useState([]);
  const [pending, setPending] = useState(true);
  const [modalScreen, setModalScreen] = useState("manageGamePrograms");
  const gameProgramsApi = new GameProgramsApi();
  const authCtx = useContext(AuthContext);
  const navigation = useNavigate();
  const handlenavigation = () => {
    navigation("/manageGames/new");
  };

  const getGamePrograms = async () => {
    let response = await gameProgramsApi.fetchGamePrograms({
      OrgId: "una_lions",
    });
    if (response.success) {
      setGamePrograms(response.content);
    }
    setPending(false);
  };

  const deleteGameProgram = async (id) => {
    const response = await gameProgramsApi.deleteExistingGameProgram({
      Id: id,
      OrgId: "UNA_LIONS",
    });
    const notify = {};

    if (response.success) {
      notify.severity = "success";
      notify.message = response.content;
    } else {
      notify.severity = "success";
      notify.message = response.content;
    }
    authCtx.setNotification(notify);
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
      getGamePrograms();
    }, 3000);
  };

  useEffect(() => {
    getGamePrograms();
    authCtx.fetchGamePrograms = getGamePrograms;
  }, []);
  return (
    <Fragment>
      <div>
        <PageTitle
          heading="Add / Edit Game Programs"
          subheading="This page includes creation, updation and stats of the game programs."
          icon="pe-7s-graph icon-gradient bg-ripe-malin"
        />
        <>
          <Col>
            <Button className="mb-2 createButton" onClick={handlenavigation}>
              {" "}
              Add New Program
            </Button>
          </Col>
          <ListGamePrograms
            modalScreen={modalScreen}
            data={gamePrograms}
            setData={setGamePrograms}
            loading={pending}
            tableTitle={"Game Programs"}
            deleteGameProgram={deleteGameProgram}
          />
        </>
      </div>
      <CustomTableComponent
        data={gamePrograms}
        gameProgramimage="image"
        date="date"
        gameprogrameditbuttonroute="title"
      />

      {/* {modal && (
        <Modal
          openModal={setModal}
          changeModalScreen={setModalScreen}
          modalScreen={modalScreen}
        />
      )} */}
    </Fragment>
  );
};

export default GamePrograms;