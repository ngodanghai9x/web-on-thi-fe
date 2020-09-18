
import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';

class CreateExamInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
    };
  }

  next = () => {
    this.props.changeStep(2);
  }

  render() {
    const { isShow } = this.props;
    return (
      <React.Fragment>
        <div className={`CreateExamInfo ${!isShow ? 'd-none' : ''}`}>
          <button onClick={() => this.next()}>Next</button>
        </div>
      </React.Fragment>


    );
  }
}


export default CreateExamInfo;