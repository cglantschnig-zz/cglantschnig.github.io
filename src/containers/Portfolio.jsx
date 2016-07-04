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
          <Col xs={12} sm={6} smOffset={3} md={4} mdOffset={0}>
            <Image styleName="image-center" src={mePicture} thumbnail />
          </Col>
          <Col xs={12} sm={12} md={8}>
            <h1>Hi, I am Christopher.</h1>
            <p>
            I am a student at the technical university in vienna. My subject
            there is <i>Software Engineering and Information Management</i>
            I started it, because I am a passionated developer, which the interest
            to learn more techniques in IT. <br />
            Usually I am working as a Web Developer using modern technology stacks,
            like <i>nodejs</i> in the backend or <i>react + redux</i> in the frontend. <br />
            If you want to see some of my code, then just have a look at my&nbsp;
            <a href="https://www.github.com/cglantschnig" target="_blank">github profile</a>.
            </p>
            <p>See you soon!</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <span styleName="copyright">Copyright © 2016 • Christopher Glantschnig</span>
          </Col>
        </Row>
      </Grid>
    );
  }

}
