import React from 'react';
import { connect } from 'react-redux';
import MainContent from '../layout/MainContent';
import './styles/MultipleChoiceResult.scss';

class MultipleChoiceResult extends React.Component {
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
        <div className='MultipleChoiceResult'>
        <div>
          <div className="exam-result-panel">
              <div className="emoji-result">
                <img src="https://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg" id="exam-images"></img>
              </div>
            <div className="row-infor-panel">
              <div className="exam-label">Tổng điểm</div>
              <div className="exam-result">0.0/10 Điểm</div>
            </div>
            <div className="row-infor-panel">
              <div className="exam-label">Điểm cao nhất</div>
              <div className="exam-result">0.0/10 Điểm</div>
            </div>
            <div className="row-infor-panel">
              <div className="exam-label">Số câu đúng</div>
              <div className="exam-result">0/40</div>
            </div>
            <div className="row-infor-panel">
              <div className="exam-label">Thời gian làm bài</div>
              <div className="exam-result">00m 00s</div>
            </div>
            <div className="row-infor-panel">
              <div className="exam-label">Ngày Thi</div>
              <div className="exam-result">10/09/2020</div>
            </div>
          </div>
          <div className="row-infor-panel">
            <div className="item-left">
              <button className="btn btn-primary">xem lại kết quả</button>
            </div>
            <div className="item-right">
              <button className="btn btn-primary">làm lại</button>
            </div>
        </div>
      </div>
        </div>
      </MainContent>
    );
  }
}


const mapStateToProps = (state, ownProps) => {

};

export default connect(mapStateToProps)(MultipleChoiceResult);
