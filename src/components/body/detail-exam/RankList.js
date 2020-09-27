import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';
import {
  getResultExam,
  getRankList,
} from 'actions/examActions';



import MainContent from '../layout/MainContent';
// import './styles/RankList.scss';
import { Redirect, withRouter } from 'react-router';

class RankList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params; // type, môn học
    this.props.getRankList(id);
  }

  render() {
    const { accessToken, rankList } = this.props;
    const data = rankList.map(item => (<div>{item.name}</div>));
    // if (!accessToken) return <Redirect to='/' />
    return (
      <div className='EssayExam'>
        RankList
        {data}
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const { auth, exam: {rankList} } = state;
  return {
    user: auth.user,
    accessToken: auth.accessToken,
    rankList,
  };
};

export default withRouter(connect(
  mapStateToProps,
  {
    getRankList,
  }
)(RankList));
