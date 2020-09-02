import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from '../icons/common';
import './styles/ChooseSubjects.scss';
import Ads from '../common/Ads';

class ChooseSubjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getTitle = pathname => {
    if (pathname.includes('lop-10')) {
      return 'LUYỆN THI VÀO LỚP 10';
    }
    if (pathname.includes('dai-hoc')) {
      return 'LUYỆN THI THPT QUỐC GIA';
    }
    return null;
  }

  render() {
    const { location } = this.props;
    return (
      <React.Fragment>
        <h2 className='title-center'>
          {this.getTitle(location.pathname)}
        </h2>
        <div className='row choose-subjects'>
          <div className='col-lg-9 col-md-12'>
            <div className='subject-list d-flex'>
              <div className='subject'>
                <img src='../../images/logo.png' alt='subject'/>
                <h4 className='title-center'>
                  Toán
                </h4>
                <button className='btn btn-outline-info'>
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>
          <div className='col-lg-3 col-md-12'>
            <Ads/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => {

};

export default connect(mapStateToProps)(ChooseSubjects);
