import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from '../icons/common';
import './styles/Register.scss';
import { Link, Redirect } from 'react-router-dom';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const { location } = this.props;
    return (
      <React.Fragment>
        <div className="register">
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => {

};

export default connect(mapStateToProps)(Register);
