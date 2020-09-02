import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from '../icons/common';
import './styles/CompletedExam.scss';

class CompletedExam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const subjects = ['Toán Học', 'Ngữ Văn', 'Hóa Học'];
    return (
      <React.Fragment>
        <div className='completed-exam'>
          <h6 className='title-left'>
            ĐỀ BẠN ĐÃ HOÀN THÀNH
          </h6>
          <div className='exam-suggestion'>
            <div className='alert1'>
              Bạn chưa hoàn thành đề nào
              </div>
            <div className='item'>
              > Trắc nghiệm ôn tập kiến thức bài Căn thức bậc hai
              </div>
            <div className='item'>
              > Trắc nghiệm ôn tập kiến thức bài Căn thức bậc hai
              </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => {

};

export default connect(mapStateToProps)(CompletedExam);
