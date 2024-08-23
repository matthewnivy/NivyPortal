import React from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import notepad from "../../../assets/order.svg";
import EastIcon from "@mui/icons-material/East";

const CategoryBox = ({ categoryName, items }) => {
  return (
    <Card className="mb-3 customized-card">
      <CardBody>
        <div className="box">
          <div className="customized-card-title-l1">{categoryName}</div>
          <div className="customized-card-title-l2">
            <img src={notepad} />
            <pre> </pre>
            {items?.length} Items
          </div>
          <Link to={`${categoryName}/manage-products`} state={{items: items}}>
            <EastIcon
              fontSize="large"
              color="black"
              style={{
                cursor: "pointer",
              }}
            />
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default CategoryBox;
