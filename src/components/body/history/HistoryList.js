import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';
import { Link } from 'react-router-dom';

import { subjects2 } from 'actions/common/getInfo';
import { logout, changeLayout, init } from 'actions/userActions';
import './HistoryList.scss';
import UserContent from '../layout/UserContent';
import TittleUserInfo from '../user/TittleUserInfo';


class HistoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // this.props.init();
  }

  seeDetailExam = (e, id) => {
    e.stopPropagation();
    const { history } = this.props;
    history.push(`/admin/update-exam/${id}`);
  }



  renderBody = (examHistories) => {
    return examHistories.map(item => {
      return (
        <tr onClick={(e) => this.seeDetailExam(e, item.id)}>
          <td className="col col-name">{item.name}</td>
          <td className="col col-date">{new Date(item.createdDate).toLocaleDateString()}</td>
          <td className="col col-result">{`${item.numAns}/${item.totalQuestion}`}</td>
          <td className="col col-point">
            {parseFloat(item.numCorrectAns * 10 / item.totalQuestion).toFixed(2)}
          </td>
        </tr>
      )
    })
  }

  render() {
    const { examHistories } = this.props;
    return (
      <UserContent>
        <TittleUserInfo
          title='Lịch sử thi'
          description='Xem lại những đề bạn đã làm'
        />
        <div className="HistoryList">
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="col col-name">Tên đề</th>
                <th className="col col-date">Ngày thi</th>
                <th className="col col-result">Đã làm</th>
                <th className="col col-point">Điểm</th>
              </tr>
            </thead>
            <tbody>
              {this.renderBody(examHistories)}
            </tbody>
          </table>
        </div>
      </UserContent>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const { auth: {
    user: { name, avatar, examHistories },
    layout,
    accessToken,
    account
  } } = state;
  return {
    name,
    role: account.role,
    avatar,
    layout,
    accessToken,
    examHistories: examHistories || [],
  };
};

export default connect(
  mapStateToProps,
  {
    logout,
    changeLayout,
    init,
  }
)(HistoryList);
// export default Header;