
import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';
import AdminContent from 'components/body/layout/AdminContent';
import UpdateQuestion from './UpdateQuestion';
import { getObjLevel, getObjSubject, subjects2 } from 'actions/common/getInfo';
import { getAvatar, changeLayout } from 'actions/userActions';
import './UpdateExam.scss';
import { Link, Redirect, withRouter } from 'react-router-dom';
import CreateEssayExam from '../CreateExam/CreateEssayExam';
import {
  getAllExam,
  changeHeader,
  changeActiveExam,
  deleteExam,
  getDetailExam,
  updateExam,
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
      listQuestion: [],
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.props.changeLayout(1);
    this.props.changeHeader('Chỉnh sửa đề');
    this.fetchDetailExam(params.id);

  }

  fetchDetailExam = (_id) => {
    this.props.getDetailExam(_id, true).then(({ data, code, message }) => {
      if (data && code === 200) {
        const { id, name, image, subject, grade, description, time, canDelete, examQuestions } = data.exam;
        this.setState({ id, name, image, subject: getObjSubject(subject).vn, grade, description, time, canDelete, examQuestions });
      }
      if (code === 400) {
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    const { location: { pathname } } = this.props;
    if (nextProps.location.pathname !== pathname) {
      this.setState({
        grade: 1,
        subject: 2,
      });
    }
  }

  changeStep = (step) => {
    if (step === 1) {
      return this.setState({ step: 1 });
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
      if (key === 'grade') {
        return this.setState({ grade: val, subject: 'Toán Học' })
      }
      this.setState({ [key]: val, [error]: '' });
    }
  }

  onChangeMax1000 = (key, val, error) => {
    if (val < 1) {
      this.setState({
        // [error]: 'Giá trị tối thiểu là 1',
        [key]: 1,
      });
      // return window.noti.error('Giá trị tối đa là 1000');
    }
    else if (val >= 1000) {
      this.setState({
        // [error]: 'Giá trị tối đa là 1000',
        [key]: 999,
      });
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

  save = () => {
    const { name, image, subject, grade, description, time, total , listQuestion, id } = this.state;
    this.props.updateExam(name, image, subject, grade, description, time, listQuestion, id);
  }

  setList = (listQuestion) => {
    this.setState({ listQuestion });
  }

  render() {
    const { step, id, name, image, subject, grade, description, time, canDelete, examQuestions,
      errorName, errorSubject, errorTime, errorTotal,
    } = this.state;
    const exam = { id, name, image, subject, grade, description, time, canDelete };
    const question0 = examQuestions ? examQuestions[0] : '';
    const { role, isDone } = this.props;
    if ((!role || !role.includes("ROLE_ADMIN")) && isDone) return <Redirect to='/' />
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
                  <textarea
                    type="text" value={description || ''}
                    className={false ? 'error' : ''}
                    placeholder="Nhập mô tả"
                    // title={errorName}
                    // onBlur={e => this.onBlurName(e)}
                    onChange={(e) => this.onChangeMax255('description', e.target.value, 'a')}
                  />
                </div>
              </div>
              <div className="profile-row">
                <div className="key">Cấp bậc</div>
                <div className="value">
                  <select defaultValue={getObjLevel(grade).vn} onChange={(e) => this.onChangeMax255('grade', e.target.value, 'errorName')}>
                    <option value="Lớp 10">Lớp 10</option>
                    <option value="Đại học">Đại học</option>
                  </select>
                </div>
              </div>
              <div className="profile-row">
                <div className="key">Môn học</div>
                <div className="value">
                  <select style={{ cursor: 'not-allowed', color: '#000' }} disabled value={getObjSubject(subject).vn}>
                    {subjects2.map((item, i) => {
                      if (grade === 'Lớp 10') {
                        if (i < 3) {
                          return (
                            <option value={item.vn}>{item.vn}</option>
                          );
                        }
                        return null;
                      } else {
                        return (
                          <option value={item.vn}>{item.vn}</option>
                        );
                      }
                    }
                    )}
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
                    placeholder="Nhập thời gian"
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
                <Link to='/admin'>
                  <button className="btn btn-outline-info" style={{ margin: '0 10px' }}>
                    Hủy
                  </button>
                </Link>
                <Link to='/admin'>
                  <button className="btn btn-info" onClick={() => this.save()}>
                    Lưu
                </button>
                </Link>
                <button className="btn btn-info" onClick={() => this.changeStep(2)}>
                  Tiếp tục
                </button>
              </div>

            </div>
          </div>
          {/* <CreateExamInfo isShow={step === 1} changeStep={this.changeStep} /> */}
          <UpdateQuestion isShow={step === 2} changeStep={this.changeStep} exam1={exam} listQuestion={examQuestions} setList={this.setList} />
          <CreateEssayExam isShow={step === 3} changeStep={this.changeStep} exam1={exam} question0={question0} />
        </div>
      </AdminContent>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { auth: { account, isDone } } = state;
  return {
    role: account.role,
    isDone,
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
    changeLayout,
    changeHeader,
    getDetailExam,
    updateExam,
  }
)(UpdateExam));