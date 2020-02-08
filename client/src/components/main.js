import React from "react";
import { Row, Col, Button } from "reactstrap";

export default props => {
  return (
    <div>
      <Row noGutters className="text-center align-items-center mb-cta">
        <Col>
          <p className="looking-for-mb">
            Sewa Mobil Nahwa
            <i className="fas fa-mb-slice mb-slice"></i>
          </p>
          <Button
            color="none"
            className="book-mobil-btn"
            onClick={_ => {
              props.setPage(1);
            }}
          >
            Sewa Mobil
          </Button>
        </Col>
      </Row>
      <Row noGutters className="text-center big-img-container">
        <Col>
          
        </Col>
      </Row>
    </div>
  );
};
