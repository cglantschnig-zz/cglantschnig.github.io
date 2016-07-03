import React, {
  Component,
  PropTypes
} from "react";

import CSSModules from "react-css-modules";
import styles from "./Portfolio.less";

import {Grid, Row, Col, Image} from "react-bootstrap";

const mePicture = require("../assets/img/me.jpg");

@CSSModules(styles)
export default class Portfolio extends Component {

  render () {
    return (
      <Grid styleName="content-area">
        <Row>
          <Col xs={12} sm={8} smOffset={2} md={4}>
            <Image src={mePicture} thumbnail />
          </Col>
        </Row>
      </Grid>
    );
  }

}
