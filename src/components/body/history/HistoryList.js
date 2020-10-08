import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';
import { Link, Redirect } from 'react-router-dom';

import { getListHistoryExam } from 'actions/examActions';
import { logout, changeLayout, init } from 'actions/userActions';
import './HistoryList.scss';
import UserContent from '../layout/UserContent';
import TittleUserInfo from '../user/TittleUserInfo';
import MainContent from '../layout/MainContent';
import HistoryDetail from './HistoryDetail';
import Pagination from 'react-js-pagination';
import { getMinute } from 'actions/common/utils';

const SIZE = 10;
class HistoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 'list',
      examQuestions: [],
      doTime: 0,
      activePage: 1,
    };
  }
  componentDidMount() {
    this.reload();
  }

  componentWillReceiveProps(nextProps) {
    const { pagination } = this.props;
    if (pagination && nextProps.pagination && nextProps.pagination.currentPage !== pagination.currentPage) {
      this.setState({
        activePage: pagination.currentPage,
      })
    }
  }

  resetState = () => {
    this.setState({
      screen: 'list',
      examQuestions: [],
      doTime: 0,
    });
  }

  reload = () => {
    let { activePage } = this.state;
    this.props.getListHistoryExam(activePage, SIZE);
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

  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber }, () => this.reload());
  }

  renderBody = (historyExam) => {
    return historyExam.map(item => {
      return (
        <tr onClick={(e) => this.seeDetailExam(e, item.examQuestions, item.doTime)}>
          <td className="col col-name">{item.examName}</td>
          <td className="col col-date">{getMinute(item.doTime)}</td>
          <td className="col col-result">{`${item.numAnswer}/${item.totalQuestion}`}</td>
          <td className="col col-point">
            {parseFloat(item.numCorrectAns * 10 / item.totalQuestion).toFixed(2)}
          </td>
        </tr>
      )
    })
  }

  getScreen = screen => {
    const { pagination, historyExam, accessToken, isDone } = this.props;
    const { examQuestions, doTime } = this.state;
    const activePage = pagination && pagination.currentPage || 1;

    if (!accessToken && isDone) return <Redirect to='/' />;
    
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
              {this.renderBody(historyExam)}
            </tbody>
          </table>

          <div className='pagination d-flex justify-content-center'>
            <Pagination
              activePage={activePage}
              itemsCountPerPage={SIZE}
              totalItemsCount={pagination.totalElements}
              pageRangeDisplayed={5}  // số nút hiển thị
              onChange={this.handlePageChange}
              itemClass={"page-item"}
              linkClass={"page-link"}
            />
          </div>
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
      isDone,
      user: { name, avatar, examHistories },
    },
    exam: { historyExam, paginationHistory },
  } = state;
  return {
    name,
    role: account.role,
    avatar,
    isDone,
    layout,
    accessToken,
    historyExam,
    pagination :paginationHistory,
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