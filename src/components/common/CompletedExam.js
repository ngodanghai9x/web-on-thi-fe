import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';





import './styles/CompletedExam.scss';

class CompletedExam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // this.props.getCompletedExam();
  }


  render() {
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
  return {

  };
};

export default connect(mapStateToProps)(CompletedExam);
