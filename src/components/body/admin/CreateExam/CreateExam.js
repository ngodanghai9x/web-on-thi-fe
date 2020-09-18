
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
    const { step, name, image, subject, level, description, time } = this.state;
    const exam1 = { name, image, subject, level, description, time };
    return (
      <AdminContent>
        <div className="CreateExam">
          <div className={`CreateExamInfo ${step !== 1 ? 'd-none' : ''}`}>
            <div className="profile-left d-flex flex-column">
              <div className="profile-row">
                <div className="key">Họ và tên</div>
                <div className="value">
                  <input
                    type="text" value={name || ''}
                    className={false ? 'error' : ''}
                    placeholder="Nhập họ và tên"
                    // title={errorName}
                    required
                    onBlur={e => this.onBlurName(e)}
                    onChange={(e) => this.changeName(e.target.value)}
                  />
                </div>
              </div>

            </div>
            <button className="btn btn-info" onClick={() => this.next()}>
              Next
            </button>
          </div>
          {/* <CreateExamInfo isShow={step === 1} changeStep={this.changeStep} /> */}
          <CreateQuestion isShow={step === 2} changeStep={this.changeStep} exam1={exam1} />
        </div>
      </AdminContent>


    );
  }
}


export default CreateExam;