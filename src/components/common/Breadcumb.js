import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from '../icons/common';
import './styles/Breadcumb.scss';

class Breadcumb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const subjects = ['Toán Học', 'Ngữ Văn', 'Hóa Học'];
    return (
      <React.Fragment>
        <div className='my-breadcumb'>
          <div className='header-content'>
            <div className='container'>
              <a href='#'>Trang chủ</a>
              {` / `}
              <a href='#'>Home</a>
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
