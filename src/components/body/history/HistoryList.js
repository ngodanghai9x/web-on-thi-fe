import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';
import { Link } from 'react-router-dom';

import { getListHistoryExam } from 'actions/examActions';
import { logout, changeLayout, init } from 'actions/userActions';
import './HistoryList.scss';
import UserContent from '../layout/UserContent';
import TittleUserInfo from '../user/TittleUserInfo';
import MainContent from '../layout/MainContent';
import HistoryDetail from './HistoryDetail';


class HistoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 'detail',
      examQuestions: [],
      doTime: 0,
    };
  }
  componentDidMount() {
    this.props.getListHistoryExam();
  }

  resetState = () => {
    this.setState({
      screen: 'list',
      examQuestions: [],
      doTime: 0,
    });
  }


  seeDetailExam = (e, examQuestions, doTime) => {
    e.stopPropagation();
    this.setState({
      screen: 'detail',
      examQuestions,
      doTime,
    });
    const { history } = this.props;
    // history.push(`/admin/update-exam/${id}`);
  }



  renderBody = (historyExam) => {
    return historyExam.map(item => {
      return (
        <tr onClick={(e) => this.seeDetailExam(e, item.id)}>
          <td className="col col-name">{item.examName}</td>
          <td className="col col-date">{`${item.doTime}/${item.totalTime}`}</td>
          <td className="col col-result">{`${item.numAns}/${item.totalQuestion}`}</td>
          <td className="col col-point">
            {parseFloat(item.numCorrectAns * 10 / item.totalQuestion).toFixed(2)}
          </td>
        </tr>
      )
    })
  }

  getScreen = screen => {
    const { examQuestions, doTime } = this.state;
    if (screen === 'detail') {
      return (
        <MainContent>
          <HistoryDetail examQuestions={examQuestions} doTime={doTime} back={this.resetState}/>
        </MainContent>
      );
    }
    return (
      <UserContent>
        <TittleUserInfo
          title='Lịch sử thi'
        // description='Xem lại những đề bạn đã làm'
        />
        <div className="HistoryList">
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="col col-name">Tên đề</th>
                <th className="col col-date">Thời gian</th>
                <th className="col col-result">Đã làm</th>
                <th className="col col-point">Điểm</th>
              </tr>
            </thead>
            <tbody>
              {this.renderBody(this.props.historyExam)}
            </tbody>
          </table>
        </div>
      </UserContent>
    );
  }

  render() {
    const { screen } = this.state;

    return (
      <React.Fragment>
        {this.getScreen(screen)}
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const {
    auth: {
      layout,
      accessToken,
      account,
      user: { name, avatar, examHistories },
    },
    exam: { historyExam, paginationHistory },
  } = state;
  return {
    name,
    role: account.role,
    avatar,
    layout,
    accessToken,
    historyExam,
    paginationHistory,
    // examHistories: examHistories || [],
  };
};

export default connect(
  mapStateToProps,
  {
    logout,
    changeLayout,
    init,
    getListHistoryExam,
  }
)(HistoryList);
// export default Header;