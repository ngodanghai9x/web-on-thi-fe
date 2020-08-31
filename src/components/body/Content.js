import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from '../icons/common';
import './styles/Content.scss';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <React.Fragment>
        <div className='body content container-fluid'>
          <div className='header-content container'>
            <a href='#'>Trang chủ</a>
            <CommonIcon.play />
            <CommonIcon.chevronRight />
          </div>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => {

};

export default connect(mapStateToProps)(Content);
