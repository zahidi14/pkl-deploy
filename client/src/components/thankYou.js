import React from "react";
import { Row, Col } from "reactstrap";

export default _ => {
  return (
    <div>
      <Row noGutters className="text-center">
        <Col>
          <p className="thanks-header">Terima Kasih!</p>
          <i className="fas fa-pizza-slice thank-you-pizza"></i>
          <p className="thanks-subtext">
            Anda Akan Menerima pesan konfirmasi pemesanan Melalui Whatsapp
          </p>
        </Col>
      </Row>
    </div>
  );
};
