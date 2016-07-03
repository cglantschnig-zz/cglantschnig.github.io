import React, {
  Component,
  PropTypes
} from "react";

import {
  Input
} from "react-bootstrap";

import { FormattedMessage } from "react-intl";

import CSSModules from "react-css-modules";

import {
  connect
} from "react-redux";

import { changeLanguage } from "../reducers/lang/actions";

const languages = ["de", "en"];

@connect((state) => {
  return {lang: state.lang};
})
export default class ChangeLanguage extends Component {

  static propTypes = {
    lang: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  setLanguage = (event) => {
    this.props.dispatch(changeLanguage(event.target.value));
  }

  render () {

    const {
      lang
    } = this.props;

    const options = languages.map((code) => {
      return (
        <FormattedMessage id={code} key={code}>
          {(message) => <option value={code}>{message}</option>}
        </FormattedMessage>
      );
    });

    return (
      <Input type="select" value={lang.locale} onChange={this.setLanguage}>
        {options}
      </Input>
    );
  }

}
