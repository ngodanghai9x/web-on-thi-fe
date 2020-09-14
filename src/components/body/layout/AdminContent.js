import React from 'react';
import { connect } from 'react-redux';
// import './styles/MainContent.scss';

class AdminContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children, marginStyle } = this.props;
    return (
      <React.Fragment>
        <div className='user-content' style={{ background: '#f5f5f5', padding: '20px 0 20px 0' }}>
          <div className='container-fluid d-flex'>
            <div className="wrapper-sidebar h-100">
              abc
            </div>
            <div className='wrapper-user-layout' style={{ borderRadius: 6, padding: '25px 15px', margin: marginStyle || '0 5%', background: '#FFF' }}>
              {children}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => {

};

export default connect(mapStateToProps)(AdminContent);
