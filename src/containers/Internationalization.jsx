import React, {Component, PropTypes} from "react";

import {addLocaleData, IntlProvider} from "react-intl";

import {connect} from "react-redux";

import {I18N_DEFAULT_LOCALE} from "../constants";

@connect((state) => {
  return {lang: state.lang};
})
export default class Internationalization extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired
  };

  render() {

    const {lang} = this.props;

    const locale = lang.locale;
    const messages = lang.messages;

    return (
      <IntlProvider key={locale} locale={locale} messages={messages} defaultLocale={I18N_DEFAULT_LOCALE}>
        {this.props.children}
      </IntlProvider>
    );
  }

}
