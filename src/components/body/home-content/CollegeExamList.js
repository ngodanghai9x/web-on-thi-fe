import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';





import Ads from 'components/common/Ads';
import MainContent from 'components/body/layout/MainContent';
import CompletedExam from 'components/common/CompletedExam';

import { getExamBySubject, changeSubject } from 'actions/examActions';
import { getInfo, subjects2, getObjSubject } from 'actions/common/getInfo';

import '../styles/ExamList.scss';
import { Link } from 'react-router-dom';

class CollegeExamList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { match, location } = this.props;
    const { subject } = match.params; // type, môn học
    this.getExamBySubject(subject);
  }

  renderExam = (exams) => {
    const { match, location } = this.props;
    const { subject } = match.params; // type, môn học
    if (!exams || exams.length === 0) return <p className="no-data">Chưa có dữ liệu</p>;
    return exams.map((item, i) => {
      return (
        <div className='exam' style={i === exams.length-1 ? { border: 'none' } : {}}>
          <div className='name'>
            {item.name}
          </div>
          <div className='description'>
            {item.description}
          </div>
          <div className='time'>
            {`Thời gian làm đề: ${item.time} phút`}
          </div>
          <div className='amount'>
            {`Tổng số câu: ${item.numQuestion} câu`}
          </div>
          <div className='wrapper-button d-flex justify-content-end align-items-center'>
            <Link to={`/dai-hoc/${subject}/${item.id}`}>
              <button className='btn btn-info'>
                Vào thi
            </button>
            </Link>
            <Link to={`/dai-hoc/${subject}/ket-qua/${item.id}`}>
              <div className='text-link'>
                Xem chi tiết >
            </div>
            </Link>
          </div>
        </div>
      );
    })
  }

  getExamBySubject = subject => {
    this.props.changeSubject(13, subject);
    this.props.getExamBySubject(subject, 'Đại học');
  }

  render() {
    const { match, location, activeCollegeSub, college } = this.props;
    const { subject } = match.params; // type, môn học
    const objSub = getObjSubject(subject);
    return (
      <MainContent>
        <div className='exam-list college'>
          <div className='path-button d-flex'>
            {subjects2.map((item, idx) => {
              if (item) {
                return (
                  <Link to={`/dai-hoc/${item.en}`} >
                    <button type="button"
                      className={`btn btn-outline-info btn-link-sub ${activeCollegeSub === item.en ? 'active' : ''}`}
                      onClick={() => this.getExamBySubject(item.en)}
                    >
                      {item.vn}
                    </button>
                  </Link>
                );
              }
              return null;
            })}

          </div>

          <h2 className='title-center'>
            {`LUYỆN THI THPT QUỐC GIA ${objSub.vn} ONLINE`}
          </h2>

          <div className='main-content row'>
            <div className='col-lg-8 col-md-12'>
              {this.renderExam(college.all)}
            </div>
            <div className='col-lg-4 col-md-12'>
              <CompletedExam />
              <Ads />
            </div>
          </div>
        </div>
      </MainContent>
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
)(CollegeExamList);
