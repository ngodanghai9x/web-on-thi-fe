import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';




import { getAvatar, changeLayout } from 'actions/userActions';
import MainContent from 'components/body/layout/MainContent';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { subjects2 } from 'actions/common/getInfo';
import HighSchoolTable from './home-content/HighSchoolTable';
import CollegeTable from './home-content/CollegeTable';

import './styles/Home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getAvatar();
    this.props.changeLayout(0);
  }

  getExamBySubject = (subject) => {

  }


  render() {
    const { location, activeSub, history } = this.props;
    return (
      <MainContent>
        <h2 className='title-center'>
          THI THỬ ONLINE
        </h2>
        {/* <Link  to='/admin' onClick={() => this.props.changeLayout(1)}>Admin</Link> */}
        <div className='home'>
          <div className='img-btn d-flex'>
            <div className='img-btn-item d-table highSchool' onClick={() => history.push(`/lop-10`)}>
              <div className='d-table-cell'>
                Ôn thi
                <br />
                vào lớp 10
              </div>
            </div>
            <div className='img-btn-item d-table college' onClick={() =>  history.push(`/dai-hoc`)}>
              <div className='d-table-cell'>
                Luyện đề
                <br />
                THPT Quốc Gia
              </div>
            </div>
          </div>

          <HighSchoolTable />
          <CollegeTable />
          
          
        </div>
      </MainContent>
    );
  }
}


// const mapStateToProps = (state, ownProps) => {

// };

export default withRouter(connect(
  null,
  {
    getAvatar,
    changeLayout,
  }
)(Home));
