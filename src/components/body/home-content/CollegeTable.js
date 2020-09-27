


import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';




import { Link, Redirect } from 'react-router-dom';

import { getAvatar, changeLayout } from 'actions/userActions';
import MainContent from 'components/body/layout/MainContent';
import { getExamBySubject, changeSubject } from 'actions/examActions';
import { getObjSubject, subjects2 } from 'actions/common/getInfo';

class CollegeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.getExamBySubject(this.props.activeHSSub, 13);
  }

  renderExams = (list, path) => {
    if (!list || list.length === 0) return 'Chưa có dữ liệu';
    return list.map((item, i) => {
      if (item && i < 5) {
        return (
          <Link className='item d-block' to={`dai-hoc/${getObjSubject(item.subject).en}/ket-qua/${item.id}`} key={`${item.id}-CollegeTable-exam`}>
            {`> ${item.name}`}
          </Link>
        )
      }
      return null;
    });
  }

  getExamBySubject = (subject) => {
    this.props.getExamBySubject(subject, 13);
  }


  render() {
    const { college, activeCollegeSub } = this.props;
    const { activeSub } = this.state;
    return (
      <React.Fragment>
        <h3 className='title-left'>
          LUYỆN THI THPT QUỐC GIA
        </h3>

        <div className='div-infor CollegeTable'>
          <div className='wrapper-btn-group'>
            <div className="btn-group" role="group" aria-label="Basic example">
              {subjects2.map((item, idx) => {
                return (
                  <button type="button"
                    className={`btn btn-info btn-link-sub ${activeCollegeSub === item.en ? 'active' : ''}`}
                    onClick={() => this.getExamBySubject(item.en)}
                  >
                    {item.vn}
                  </button>
                );
              })}
            </div>
          </div>
          <div className='content' style={{ padding: '15px 20px' }}>
            <h5>Các đề được quan tâm nhiều nhất</h5>
            {this.renderExams(college.all)}
            <Link  to={`/dai-hoc/${activeCollegeSub}`} >
              <p className='more' style={{ textAlign: 'right', margin: 0 }}>Xem thêm ></p>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const { exam: { activeHSSub, activeCollegeSub, college } } = state;

  return {
    activeCollegeSub,
    activeHSSub,
    college,
  }
};

export default connect(
  mapStateToProps,
  {
    changeSubject,
    getExamBySubject,
  }
)(CollegeTable);
