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


  render() {
    const subjects = ['Toán Học', 'Ngữ Văn', 'Hóa Học'];
    return (
      <React.Fragment>
        <h2 className='title-center'>
          LUYỆN THI VÀO LỚP 10
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
