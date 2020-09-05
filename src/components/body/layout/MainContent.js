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
    const { pathname } = window.location;

    if (pathname.includes('thong-tin-ca-nhan')) {
      return (
        <React.Fragment>
          <div className='user-content' style={{ background: '#f5f5f5', padding: '20px 0 20px 0' }}>
            <div className='container'>
              <div className='wrapper-user-layout' style={{ borderRadius: 6, padding: '25px 15px', margin: '0 5%', background: '#FFF' }}>
                <UserRouterList />
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <div className='main-content' style={{ padding: '12px 0 20px 0' }}>
          <Breadcumb />
          <div className='container'>
            <RouterList />
          </div>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => {

};

export default connect(mapStateToProps)(MainContent);
