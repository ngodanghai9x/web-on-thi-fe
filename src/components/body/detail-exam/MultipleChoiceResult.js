import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';




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

  render() {// cái kết quả mới là trang này
    return (
      <MainContent>
        <div className='MultipleChoiceResult container'>
          <div className="row">
            <div className="col-8">

              <div className="exam-infor-panel" >
                <div className="Mul-title" > Đề luyện thi THPT Quốc gia 2020 môn Lý - Đề số 1 </div>
                <div className="description">Gửi đến các bạn học sinh lớp 12 đề luyện thi THPT Quốc gia 2020 môn Lý - Đề số 1 có đáp án do Học Tốt tổng hợp nhằm giúp các em có thêm tư liệu để tham khảo củng cố kiến thức trước khi bước vào kì thi. </div>
                <div className="item-infor-panel">
                  <div className="item-label">
                    <div className="icon">
                      <i className="far fa-calendar-alt" />
                    </div>
                    <div className="label" > Số câu hỏi </div>
                  </div>
                  <div className="gwt-HTML" > 40 Câu </div>
                </div>
                <div className="item-infor-panel" >
                  <div className="item-label" >
                    <div className="icon" >
                      <i className="far fa-calendar-alt" />
                    </div>
                    <div className="label" > Thời gian làm bàii </div>
                  </div>
                  <div className="gwt-HTML" >50 Phút </div>
                </div>
                <div className="item-infor-panel" >
                  <div className="item-label" >
                    <div className="icon" >
                      <i className="far fa-calendar-alt" />
                    </div>
                    <div className="label" >Số lần tạm dừng</div>
                  </div>
                  <div className="gwt-HTML" >0 / Không</div>
                </div>
                <div className="item-infor-panel" >
                  <div className="item-label" >
                    <div className="icon" >
                      <i className="far fa-calendar-alt" />
                    </div>
                    <div className="label" >  </div>
                  </div>
                  <div className="gwt-HTML" >0 / Không giới hạn</div>
                </div>
                <div className="item-infor-panel" >
                  <div className="item-label" >
                    <div className="icon" >
                      <i className="far fa-calendar-alt" />
                    </div>
                    <div className="label" > Số người đã tham gia </div>
                  </div>
                  <div className="gwt-HTML" > 1331 </div>
                </div>
                <div className="button" >
                  <button className="btn btn-primary" type="submit" >làm bài </button>
                </div>
              </div>
             {/* a */}
             <div className="exam-result-panel">
                <div className="emoji-result">
                  {/* sửa lại đường dẫn chỗ này bằng icon1.jpg trong thư mục images */}
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

            <div className="col-7">
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
          </div>

        </div>
      </MainContent>
    );
  }
}


const mapStateToProps = (state, ownProps) => {

};

export default connect(mapStateToProps)(MultipleChoiceResult);
