import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';




import Breadcumb from '../../common/Breadcumb';
import RouterList from '../../router/RouterList';
import './styles/MainContent.scss';
import UserRouterList from '../../router/UserRouterList';
import { getAvatar, changeLayout } from 'actions/userActions';

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.changeLayout(0);
  }

  render() {
    return (
      <React.Fragment>
        <div className='main-content' style={{ padding: '50px 0 20px 0' }}>
          <Breadcumb />
          <div className='container'>
            {/* <RouterList /> */}
            {this.props.children}
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
)(MainContent);
