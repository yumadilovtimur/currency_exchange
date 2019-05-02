import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { currencyRequest } from './actions/currency';

class App extends PureComponent {
  componentDidMount = () => {
    this.props.currencyRequest();
  };

  render() {
    return <div className="wrapper">d</div>;
  }
}

const mapStateToProps = state => ({
  currency: state.currency
});

const mapDispatchToProps = {
  currencyRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
