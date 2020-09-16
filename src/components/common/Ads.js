import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';





import './styles/Ads.scss';

class Ads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const subjects = ['Toán Học', 'Ngữ Văn', 'Hóa Học'];
    return (
      <React.Fragment>
        <div className='ads'>
          <small className='title-left'>
            Quảng cáo
        </small>
          <img src='../../images/ads.jpg' />
          <h6 className='title-left'>
            ĐỀ ĐƯỢC QUAN TÂM
          </h6>
          <div className='exam-suggestion'>
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

export default connect(mapStateToProps)(Ads);
