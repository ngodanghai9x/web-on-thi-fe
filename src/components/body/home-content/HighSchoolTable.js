


import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';




import { Link, Redirect, withRouter } from 'react-router-dom';

import { getAvatar, changeLayout } from 'actions/userActions';
import MainContent from 'components/body/layout/MainContent';
import { getObjSubject, subjects2 } from 'actions/common/getInfo';
import { getExamBySubject, changeSubject } from 'actions/examActions';

class HighSchoolTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.getExamBySubject(this.props.activeHSSub, 10);
  }

  renderExams = (list, path) => {
    if (!list || list.length === 0) return 'Chưa có dữ liệu';
    return list.map((item, i) => {
      if (item && i < 5) {
        return (
          <Link className='item d-block' to={`lop-10/${getObjSubject(item.subject).en}/ket-qua/${item.id}`} key={`${item.id}-HighSchoolTable-exam`}>
            {`> ${item.name}`}
          </Link>
        )
      }
      return null;
    });
  }

  getExam = (subject) => {
    this.props.getExamBySubject(subject, 10);
  }


  render() {
    const { highSchool, activeHSSub } = this.props;
    const { activeSub } = this.state;
    return (
      <React.Fragment>
        <h3 className='title-left'>
          LUYỆN THI VÀO LỚP 10
        </h3>

        <div className='div-infor HighSchoolTable'>
          <div className='wrapper-btn-group'>
            <div className="btn-group" role="group" aria-label="Basic example">
              {subjects2.map((item, idx) => {
                if (idx < 3) {
                  return (
                    <button type="button"
                      className={`btn btn-info btn-link-sub ${activeHSSub === item.en ? 'active' : ''}`}
                      onClick={() => this.getExam(item.en)}
                    >
                      {item.vn}
                    </button>
                  );
                }
                return null;
              })}
            </div>
          </div>

          <div className='content' style={{ padding: '15px 20px' }}>
            <h5>Các đề được quan tâm nhiều nhất</h5>
            {this.renderExams(highSchool.all)}
            <Link  to={`/lop-10/${activeHSSub}`} >
              <p className='more' style={{ textAlign: 'right', margin: 0 }}>Xem thêm ></p>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const { exam: { activeHSSub, activeCollegeSub, highSchool } } = state;

  return {
    activeCollegeSub,
    activeHSSub,
    highSchool,
  }
};

export default withRouter(connect(
  mapStateToProps,
  {
    getAvatar,
    getExamBySubject,
    changeSubject,
  }
)(HighSchoolTable));
