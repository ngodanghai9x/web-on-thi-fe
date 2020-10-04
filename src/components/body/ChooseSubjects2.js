import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';
import { getExamBySubject, changeSubject } from 'actions/examActions';
import MainContent from 'components/body/layout/MainContent';
import Ads from 'components/common/Ads';

import './styles/ChooseSubjects.scss';
import { subjects2 } from 'actions/common/getInfo';
import { Link } from 'react-router-dom';

class ChooseSubjects2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  changeSubject = (subject) => {
    this.props.changeSubject(13, subject);
  }

  render() {
    const { location } = this.props;
    const btnSub = subjects2.map((item, i) => {
      return (
        <Link to={`/dai-hoc/${item.en}`}>
          <div className='subject' onClick={() => this.changeSubject(item.en)}>
            {/* <img src={`${process.env.PUBLIC_URL}/images/${item.eng}.jpg`} alt='subject' /> */}
            <img src={`/images/${item.eng}.jpg`} alt='subject' />
            <h4 className='title-center'>
              {item.vn}
            </h4>
            <button className='btn btn-outline-info'>
              Xem chi tiết
          </button>
          </div>
        </Link>

      );
    })
    return (
      <MainContent>
        <h2 className='title-center'>
          LUYỆN THI THPT QUỐC GIA
        </h2>
        <div className='row choose-subjects'>
          <div className='col-lg-9 col-md-12'>
            <div className='subject-list d-flex'>
              {btnSub}
            </div>
          </div>
          <div className='col-lg-3 col-md-12'>
            <Ads />
          </div>
        </div>
      </MainContent>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {

  };
};

export default connect(
  mapStateToProps,
  {
    changeSubject,
  },
)(ChooseSubjects2);
