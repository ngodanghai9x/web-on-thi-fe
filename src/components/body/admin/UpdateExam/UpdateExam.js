
import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';
import AdminContent from 'components/body/layout/AdminContent';
import UpdateQuestion from './UpdateQuestion';
import { subjects2 } from 'actions/common/getInfo';
import { getAvatar, changeLayout } from 'actions/userActions';
import './UpdateExam.scss';
import { Redirect, withRouter } from 'react-router-dom';
import CreateEssayExam from '../CreateExam/CreateEssayExam';
import  {
  getAllExam,
  changeHeader,
  changeActiveExam,
  deleteExam,
  getDetailExam,
} from 'actions/examActions';

const total = 1000;
class UpdateExam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      grade: "Lớp 10",
      subject: "Toán học",
      examQuestions: [],
    };
  }

  componentDidMount() {
    const { match: {params} } = this.props;
    this.props.changeLayout(1);
    this.props.changeHeader('Chỉnh sửa đề');
    this.fetchDetailExam(params.id);

  }

  fetchDetailExam = (_id) => {
    this.props.getDetailExam(_id, true).then(({ data, code, message }) => {
      if (data && code === 200) {
        const { id, name, image, subject, grade, description, time, canDelete, examQuestions } = data.exam;
        this.setState({ id, name, image, subject, grade, description, time, canDelete, examQuestions });
      }
      if (code === 400) {
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    const { location: {pathname} } = this.props;
    if (nextProps.location.pathname !== pathname) {
      this.setState({
        level: 1,
        subject: 2,
      });
    }
  }

  changeStep = (step) => {
    if (step === 1) {
      return this.setState({ step: 1});
    }
    if (this.state.subject === 'Ngữ Văn') {
      this.setState({ step: 3 });
    } else {
      this.setState({ step: 2 });
    }
  }

  onChangeMax255 = (key, val, error) => {
    if (val && val.length >= 255) {
      this.setState({ [error]: 'Bạn nhập quá 255 kí tự' });
      return window.noti.error('Bạn nhập quá 255 kí tự');
    }
    else {
      this.setState({ [key]: val, [error]: '' });
    }
  }

  onChangeMax1000 = (key, val, error) => {
    if (val < 1) {
      this.setState({ [error]: 'Giá trị tối thiểu là 1' });
      // return window.noti.error('Giá trị tối đa là 1000');
    }
    else if (val >= 1000) {
      this.setState({ [error]: 'Giá trị tối đa là 1000' });
      // return window.noti.error('Giá trị tối đa là 1000');
    }
    else {
      this.setState({ [key]: val, [error]: '' });
    }
  }

  onBlurNotNull = (key, val, text) => {
    if (!val || val.trim().length === 0) {
      this.setState({ [key]: 'Trường này không để để trống' });
    }
    if (val < 1) {
      this.setState({ [key]: 'Giá trị tối thiểu là 1' });
      // return window.noti.error('Giá trị tối đa là 1000');
    }
    else if (val >= 1000) {
      this.setState({ [key]: 'Giá trị tối đa là 1000' });
      // return window.noti.error('Giá trị tối đa là 1000');
    }
  }

  render() {
    const { step, id, name, image, subject, grade, description, time, canDelete, examQuestions,
      errorName, errorSubject, errorTime, errorTotal,
    } = this.state;
    const exam = { id, name, image, subject, grade, description, time, canDelete };
    const question0 = examQuestions ? examQuestions[0]  : '';
    const { role } = this.props;
    // if (!role || !role.includes("ROLE_ADMIN")) return <Redirect to='/' />
    return (
      <AdminContent>
        <div className="UpdateExam">
          <div className={`UpdateExamInfo ${step !== 1 ? 'd-none' : ''}`}>
            <div className="form-create-exam d-flex flex-column">
              <div className="profile-row">
                <div className="key">Tên đề</div>
                <div className="value">
                  <input
                    type="text" value={name || ''}
                    className={errorName ? 'error' : ''}
                    placeholder="Nhập tên đề"
                    title={errorName}
                    onBlur={e => this.onBlurNotNull(errorName, e.target.value)}
                    onChange={(e) => this.onChangeMax255('name', e.target.value, 'errorName')}
                  />
                </div>
              </div>
              <div className="profile-row">
                <div className="key">Mô tả đề</div>
                <div className="value">
                  <input
                    type="text" value={description || ''}
                    className={false ? 'error' : ''}
                    placeholder="Nhập tên đề"
                    // title={errorName}
                    required
                    // onBlur={e => this.onBlurName(e)}
                    onChange={(e) => this.onChangeMax255('description', e.target.value, 'a')}
                  />
                </div>
              </div>
              <div className="profile-row">
                <div className="key">Cấp bậc</div>
                <div className="value">
                  <select onChange={(e) => this.onChangeMax255('level', e.target.value, 'errorName')}>
                    <option value="Lớp 10">Lớp 10</option>
                    <option value="Đại học">Đại học</option>
                  </select>
                </div>
              </div>
              <div className="profile-row">
                <div className="key">Môn học</div>
                <div className="value">
                  <select onChange={(e) => this.onChangeMax255('subject', e.target.value, 'errorSubject')}>
                    {subjects2.map(item => ((
                      <option value={item.vn}>{item.vn}</option>
                    )))}
                  </select>
                </div>
              </div>
              <div className="profile-row">
                <div className="key">
                  Thời gian làm
                  <br />
                  (phút)
                </div>
                <div className="value">
                  <input
                    type="number" value={time || ''}
                    className={errorTime ? 'error' : ''}
                    placeholder="Nhập tên đề"
                    min="1" max="500"
                    title={errorTime}
                    required
                    // onBlur={e => this.onBlurName(e)}
                    onChange={(e) => this.onChangeMax1000('time', e.target.value, 'errorTime')}
                  />
                </div>
              </div>
              {/* <div className="profile-row">
                <div className="key">Tổng số câu</div>
                <div className="value">
                  <input
                    type="number" value={total || ''}
                    className={errorTotal ? 'error' : ''}
                    placeholder="Nhập tên đề"
                    min="1" max="500"
                    title={errorTotal}
                    required
                    // onBlur={e => this.onBlurName(e)}
                    onChange={(e) => this.onChangeMax1000('total', e.target.value, 'errorTotal')}
                  />
                </div>
              </div> */}
              <div className="profile-row d-flex justify-content-center">
                <button className="btn btn-info" onClick={() => this.changeStep(2)}>
                  Next
                </button>
              </div>

            </div>
          </div>
          {/* <CreateExamInfo isShow={step === 1} changeStep={this.changeStep} /> */}
          <UpdateQuestion isShow={step === 2} changeStep={this.changeStep} exam1={exam} listQuestion={examQuestions} />
          <CreateEssayExam isShow={step === 3} changeStep={this.changeStep} exam1={exam} question0={question0} />
        </div>
      </AdminContent>


    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { auth: { account } } = state;
  return {
    role: account.role,
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
    changeLayout,
    changeHeader,
    getDetailExam,
  }
)(UpdateExam));