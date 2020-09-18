
import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';
import AdminContent from 'components/body/layout/AdminContent';
import CreateQuestion from './CreateQuestion';
// import CreateQuestion2 from './CreateQuestion2';

import './CreateExam.scss';
import CreateExamInfo from './CreateExamInfo';

class CreateExam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
    };
  }

  changeStep = (step) => {
    this.setState({ step });
  }

  render() {
    const { step } = this.state;
    return (
      <AdminContent>
        <div className="CreateExam">
          <CreateExamInfo isShow={step === 1} changeStep={this.changeStep} />
          <CreateQuestion isShow={step === 2} changeStep={this.changeStep} />
        </div>
      </AdminContent>


    );
  }
}


export default CreateExam;