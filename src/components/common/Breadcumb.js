import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as CommonIcon from 'components/icons/common';

import './styles/Breadcumb.scss';

class Breadcumb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <React.Fragment>
        <div className='my-breadcumb'>
          <div className='header-content'>
            <div className='container'>
              <Link exact to='/'>Trang chủ</Link>
              {` / `}
              <Link exact to='/lop-10/'>Luyện thi vào lớp 10</Link>
              {` / `}
              <Link exact to='/lop-10/toan'>Toán Học</Link>
              {` / `}
              <Link>Đề luyện thi THPT Quốc gia 2020 môn Toán - Đề số 1</Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => {

};

export default connect(mapStateToProps)(Breadcumb);
