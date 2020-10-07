import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';

import { getCompletedExams, getListHistoryExam } from 'actions/examActions';



import './styles/CompletedExam.scss';
import { Link, withRouter } from 'react-router-dom';

class CompletedExam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // this.props.getListHistoryExam(1, 5);
    this.props.getCompletedExams();
  }

  renderExams = (list, path) => {
    if (!list || list.length === 0) {
      return (
        <div className='alert1'>
          Bạn chưa hoàn thành đề nào
        </div>
      );
    }
    return list.map((item, i) => {
      if (item && i < 4) {
        return (
          <Link className='item d-block' to={`${path}/subject/ket-qua/${item.id}`} key={`${item.id}-completed-exam`}>
            {`> ${item.name}`}
          </Link>
        )
      }
      return null;
    });
  }


  render() {
    const { completedExams, accessToken, location: { pathname } } = this.props;
    let path = '';
    if (pathname.includes('/lop-10')) {
      path = '/lop-10';
    } else {
      path = '/dai-hoc';
    }

    if (!accessToken) return null;

    return (
      <React.Fragment>
        <div className='completed-exam'>
          <h6 className='title-left'>
            ĐỀ BẠN ĐÃ HOÀN THÀNH
          </h6>
          <div className='exam-suggestion'>
            {this.renderExams(completedExams, path)}
          </div>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const {
    exam: { historyExam, completedExams },
    auth: { accessToken },
  } = state;
  return {
    completedExams,
    accessToken,
    historyExam,
  };
};

export default withRouter(connect(
  mapStateToProps,
  {
    getCompletedExams,
    getListHistoryExam,
  },
)(CompletedExam));
