import React from 'react';
import { connect } from 'react-redux';
import MainContent from '../layout/MainContent';
import './styles/MultipleChoiceExam.scss';

class MultipleChoiceExam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { match } = this.props;
    const { subjects } = match.params; // type, môn học
  }

  render() {
    return (
      <MainContent>
          <div className="exam-infor-panel">
            <div className="Mul-title">Đề luyện thi THPT Quốc gia 2020 môn Lý - Đề số 1</div>
            <div className="description">
              Gửi đến các bạn học sinh lớp 12 đề luyện thi THPT Quốc gia 2020 môn Lý - Đề số 1 có đáp án do Học Tốt tổng hợp nhằm giúp các em có thêm tư liệu để tham khảo củng cố kiến thức trước khi bước vào kì thi.
            </div>
        <div className="item-infor-panel">
          <div className="item-label">
            <div className="icon">
              <i className="far fa-calendar-alt" />
            </div>
            <div className="label">Số câu hỏi</div>
          </div>
          <div className="gwt-HTML">40 Câu</div>
        </div>
        <div className="item-infor-panel">
          <div className="item-label">
            <div className="icon">
              <i className="far fa-calendar-alt" />
            </div>
            <div className="label">Thời gian làm bàii</div>
          </div>
          <div className="gwt-HTML">
            50 Phút</div>
        </div>
        <div className="item-infor-panel">
          <div className="item-label">
            <div className="icon">
              <i className="far fa-calendar-alt" />
            </div>
            <div className="label">Số lần tạm dừng</div>
          </div>
          <div className="gwt-HTML">
            0 / Không
          </div>
        </div>
        <div className="item-infor-panel">
          <div className="item-label">
            <div className="icon">
              <i className="far fa-calendar-alt" />
            </div>
            <div className="label">Số lần làm lại</div>
          </div>
          <div className="gwt-HTML">0 / Không giới hạn</div>
        </div>
        <div className="item-infor-panel">
          <div className="item-label">
            <div className="icon">
              <i className="far fa-calendar-alt" />
            </div>
            <div className="label">Số người đã tham gia</div>
          </div>
          <div className="gwt-HTML">1331</div>
        </div>
        <div className="button">
          <button className="btn btn-primary" type="submit">làm bài</button>
        </div>
      </div>
      </MainContent>
    );
  }
}


const mapStateToProps = (state, ownProps) => {

};

export default connect(mapStateToProps)(MultipleChoiceExam);
