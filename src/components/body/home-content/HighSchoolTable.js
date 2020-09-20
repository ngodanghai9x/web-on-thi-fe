


import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';




import { Link, Redirect } from 'react-router-dom';

import { getAvatar, changeLayout } from 'actions/userActions';
import MainContent from 'components/body/layout/MainContent';
import { subjects2 } from 'actions/common/getInfo';
import { getExamBySubject, changeSubject } from 'actions/examActions';

class HighSchoolTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.getExamBySubject();
  }

  getExam = (subject) => {
    this.props.changeSubject(10, subject);
  }


  render() {
    const { location, activeHSSub } = this.props;
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
            <div className='item'>
              > Trắc nghiệm ôn tập kiến thức bài Căn thức bậc hai
              </div>
            <div className='item'>
              > Trắc nghiệm ôn tập kiến thức bài Căn thức bậc hai
              </div>
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
  const { exam: { activeHSSub, activeCollegeSub } } = state;

  return {
    activeCollegeSub,
    activeHSSub,
  }
};

export default connect(
  mapStateToProps,
  {
    getAvatar,
    getExamBySubject,
    changeSubject,
  }
)(HighSchoolTable);
