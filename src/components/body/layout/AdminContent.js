import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';
import { getAvatar, changeLayout } from 'actions/userActions';



import Sidebar from './Sidebar';
import './styles/AdminContent.scss';

class AdminContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.changeLayout(1);
  }

  render() {
    const { children, style } = this.props;
    return (
      <React.Fragment>
        <div className='admin-content d-flex' style={{ background: '#f5f5f5' }}>
          <Sidebar />
          <div className="wrapper-content">
            <div className="header-admin-layout">
              Header
            </div>
            <div className='wrapper-admin-layout' style={{ style }}>
              {children}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


// const mapStateToProps = (state, ownProps) => {

// };

export default connect(null,
  {
    changeLayout,
  }
)(AdminContent);