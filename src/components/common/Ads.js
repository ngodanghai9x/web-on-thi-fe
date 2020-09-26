import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';





import './styles/Ads.scss';
import { withRouter } from 'react-router';

class Ads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const { location: { pathname }, college, highSchool } = this.props;
    let list = [];
    if (pathname.includes('/lop-10')) {
      list = highSchool.all;
    } else {
      list = college.all;
    }
    return (
      <React.Fragment>
        <div className='ads'>
          <small className='title-left'>
            Quảng cáo
          </small>
          <img src='../../images/ads.jpg' onClick={() => window.open('https://www.google.com.vn/')} />
          <h6 className='title-left'>
            ĐỀ ĐƯỢC QUAN TÂM
          </h6>
          <div className='exam-suggestion'>
            {list.map(item => (
              <div className='item'>
                {`> ${item.name}`}
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const { exam: { college, highSchool } } = state;
  return {
    college,
    highSchool,
  };
};

export default withRouter(connect(
  mapStateToProps,
  {

  },
)(Ads));
