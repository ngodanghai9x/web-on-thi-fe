
import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';
import AdminContent from 'components/body/layout/AdminContent';
import CreateQuestion from './CreateQuestion';
// import CreateQuestion2 from './CreateQuestion2';

import './CreateExam.scss';

class CreateExam extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AdminContent>
        <div className="CreateExam">
          <CreateQuestion />
        </div>
      </AdminContent>


    );
  }
}


export default CreateExam;