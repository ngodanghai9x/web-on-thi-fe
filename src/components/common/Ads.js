import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';





import './styles/Ads.scss';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { getObjSubject } from 'actions/common/getInfo';

class Ads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderExams = (list, path) => {
    return list.map((item, i) => {
      if (item && i < 4) {
        return (
          <Link className='item d-block' to={`${path}/${getObjSubject(item.subject).en}/${item.id}`} key={`${item.id}-suggestion-exam`}>
            {`> ${item.name}`}
          </Link>
        )
      }
      return null;
    });
  }

  render() {
    const { location: { pathname }, college, highSchool } = this.props;
    let list = [];
    let path = '';
    if (pathname.includes('/lop-10')) {
      list = highSchool.all;
      path = 'lop-10';
    } else {
      list = college.all;
      path = 'dai-hoc';

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
            {this.renderExams(list, path)}
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
