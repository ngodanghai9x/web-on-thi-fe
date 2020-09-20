import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';




import MainContent from '../layout/MainContent';
import './styles/EssayExam.scss';
import { Redirect } from 'react-router';

class EssayExam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { match } = this.props;
    const { subjects } = match.params; // type, môn học
  }

  render() {
    const { accessToken } = this.props;
    if (!accessToken) return <Redirect to='/' />
    return (
      <MainContent>
        <div className='EssayExam'>
        EssayExam
        </div>
      </MainContent>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const { auth } = state;
  return {
    user: auth.user,
    accessToken: auth.accessToken,
  };
};

export default connect(mapStateToProps)(EssayExam);
