import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from '../icons/common';
import Ads from '../common/Ads';
import CompletedExam from '../common/CompletedExam';
import { getInfo } from '../../actions/common/getInfo';

import './styles/ExamList.scss';

class ExamList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { match, location } = this.props;
    const { subject } = match.params; // type, môn học
  }

  renderExam = (exams) => {
    return exams.map(item => {
      return (
        <div className='exam'>
          <div className='name'>
            Đề luyện thi vào lớp 10 môn Tiếng Anh 2020 - Đề số 2
            {item}
          </div>
          <div className='description'>
            Mời các em cùng tham khảo đề luyện thi vào lớp 10 2020 môn Tiếng Anh - Đề số 1 (Có đáp án) được chia sẻ để có thêm tài liệu ôn tập chuẩn bị cho kì thi vào lớp 10 năm 2020 sắp tới. Tài liệu đi kèm có đáp án giúp các em so sánh kết quả bài làm và tự đánh giá được lực học của bản thân, từ đó đặt ra kế hoạch ôn tập phù hợp giúp để đạt kết quả cao trong kì thi.
          </div>
          <div className='time'>
            Thời gian làm đề: 60 phút
          </div>
          <div className='amount'>
            Tổng số câu: 46
          </div>
          <div className='wrapper-button d-flex justify-content-end'>
            <button className='btn btn-info'>
              Vào thi
            </button>
            <div className='text-link'>
              Xem chi tiết >
            </div>
          </div>
        </div>
      );
    })
  }


  render() {
    const { match, location } = this.props;
    const { subject } = match.params; // type, môn học
    const info = getInfo(location.pathname, subject);
    const subjects = ['Toán Học', 'Ngữ Văn', 'Hóa Học'];
    return (
      <React.Fragment>
        <div className='exam-list'>
          <div className='path-button d-flex'>
            {subjects.map(item => (
              <button className='btn btn-outline-info'>
                {item}
              </button>
            ))}
          </div>

          <h2 className='title-center'>
            {`${info.title} ${info.subject} ONLINE`}
          </h2>

          <div className='main-content row'>
            <div className='col-lg-8 col-md-12'>
              {this.renderExam(subjects)}
            </div>
            <div className='col-lg-4 col-md-12'>
              <CompletedExam />
              <Ads />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => {

};

export default connect(null)(ExamList);
