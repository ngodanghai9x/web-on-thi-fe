import React from 'react';
import { connect } from 'react-redux';
import Breadcumb from '../../common/Breadcumb';
import RouterList from '../../router/RouterList';
import './styles/MainContent.scss';
import UserRouterList from '../../router/UserRouterList';

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <React.Fragment>
        <div className='main-content' style={{ padding: '0 0 20px 0' }}>
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


const mapStateToProps = (state, ownProps) => {

};

export default connect(mapStateToProps)(MainContent);
