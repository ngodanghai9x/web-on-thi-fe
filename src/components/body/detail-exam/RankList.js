import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';
import {
  getResultExam,
  getRankList,
} from 'actions/examActions';



import MainContent from '../layout/MainContent';
import './styles/RankList.scss';
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
    const rankList1 = [1, 2, 3, 4, 5];
    // if (!accessToken) return <Redirect to='/' />
    return (
      <div className='RankList'>
        <table class="table table-hover">
          <thead>
            <tr>
              <th className="col-stt">STT</th>
              <th className="col-name">Thí sinh</th>
              <th className="col-point">Điểm</th>
            </tr>
          </thead>
          <tbody>
            {rankList.length === 0 && <tr><td colSpan="3" style={{ color: "#212529" }}>Chưa có dữ liệu</td></tr>}
            {rankList.map((item, i) => (
              <tr className="tr">
                <td className="col-stt">{i + 1}</td>
                <td className="col-name">
                  <div className="wrapper-info d-flex align-items-center">
                    {/* <img src={`${item.avatarBase64 ? `data:image/png;base64,${item.avatarBase64}` : '/images/default-avatar.jpg'}`} alt='avt' /> */}
                    <span className="name text-ellipsis">
                      {item.fullName}
                    </span>
                  </div>
                </td>
                <td className="col-point">
                  {parseFloat(item.numCorrectAns * 10 / item.totalQuestion).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const { auth, exam: { rankList } } = state;
  return {
    user: auth.user,
    accessToken: auth.accessToken,
    rankList: rankList,
  };
};

export default withRouter(connect(
  mapStateToProps,
  {
    getRankList,
  }
)(RankList));
