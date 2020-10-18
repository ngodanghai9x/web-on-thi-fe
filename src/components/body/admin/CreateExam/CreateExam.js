
import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';
import AdminContent from 'components/body/layout/AdminContent';
import CreateQuestion from './CreateQuestion';
import { getObjSubject, subjects2 } from 'actions/common/getInfo';
import { getAvatar, changeLayout } from 'actions/userActions';
import { createExam, callApiExam, changeHeader } from 'actions/examActions';

// import CreateExamInfo from './CreateExamInfo';
import './CreateExam.scss';
import { Link, Redirect, withRouter } from 'react-router-dom';
import CreateEssayExam from './CreateEssayExam';

class CreateExam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      grade: "Lớp 10",
      subject: "Toán học",
      time: 45,
      listQuestion: [],
    };
  }

  componentDidMount() {
    this.props.changeLayout(1);
    this.props.changeHeader('Thêm mới đề');
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.callingApi && this.props.callingApi === 'CreateExam') {
      nextProps.history.push('/admin');
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
    if (!val || !val.trim()) {
      this.setState({ [key]: 'Trường này không để để trống' });
    }
  }

  save = () => {
    const { name, image, subject, grade, description, time, total , listQuestion, code } = this.state;
    this.props.callApiExam('CreateExam');
    this.props.createExam(name, image, subject, grade, description, time, listQuestion, code);
  }

  setList = (listQuestion) => {
    this.setState({ listQuestion });
  }

  render() {
    const { step, name, image, subject, grade, description, time, total, code,
      errorName, errorSubject, errorTime, errorTotal, errorCode
    } = this.state;
    const exam1 = { name, image, subject, grade, description, time, total, code };
    const { role, isDone } = this.props;
    if ((!role || !role.includes("ROLE_ADMIN")) && isDone) return <Redirect to='/' />
    return (
      <AdminContent>
        <div className="CreateExam">
          <div className={`CreateExamInfo ${step !== 1 ? 'd-none' : ''}`}>
            <div className="form-create-exam d-flex flex-column">
              <div className="profile-row">
                <div className="key">Mã đề</div>
                <div className="value">
                  <input
                    type="text" value={code || ''}
                    className={errorCode ? 'error' : ''}
                    placeholder="Nhập mã đề (ví dụ: DE0001)"
                    title={errorCode}
                    onBlur={e => this.onBlurNotNull('errorCode', e.target.value)}
                    onChange={(e) => this.onChangeMax255('code', e.target.value, 'errorCode')}
                  />
                </div>
              </div>
              <div className="profile-row">
                <div className="key">Tên đề</div>
                <div className="value">
                  <input
                    type="text" value={name || ''}
                    className={errorName ? 'error' : ''}
                    placeholder="Nhập tên đề"
                    title={errorName}
                    onBlur={e => this.onBlurNotNull('errorName', e.target.value)}
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
                  <select onChange={(e) => this.onChangeMax255('grade', e.target.value, 'errorName')}>
                    <option value="Lớp 10">Lớp 10</option>
                    <option value="Đại học">Đại học</option>
                  </select>
                </div>
              </div>
              <div className="profile-row">
                <div className="key">Môn học</div>
                <div className="value">
                  <select onChange={(e) => this.onChangeMax255('subject', e.target.value, 'errorSubject')} value={getObjSubject(subject).vn}>
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
                    title={errorTotal}
                    required
                    // onBlur={e => this.onBlurName(e)}
                    onChange={(e) => this.onChangeMax1000('total', e.target.value, 'errorTotal')}
                  />
                </div>
              </div> */}
              <div className="profile-row d-flex justify-content-center">
                <Link to='/admin'>
                  <button className="btn btn-outline-secondary" style={{ marginRight: 10 }} >
                    Hủy
                  </button>
                </Link>

                {
                  getObjSubject(subject).en !== 'van' ? (
                    <button className="btn btn-outline-info" onClick={() => this.save()} style={{ marginRight: 10 }}>
                      Lưu
                    </button>
                  ) : null
                }

                <button className="btn btn-info" onClick={() => this.changeStep()} style={{ marginRight: 10 }}>
                  Tiếp tục
                </button>
              </div>

            </div>
          </div>
          {/* <CreateExamInfo isShow={step === 1} changeStep={this.changeStep} /> */}
          <CreateQuestion isShow={step === 2} changeStep={this.changeStep} exam1={exam1} setList={this.setList}/>
          <CreateEssayExam isShow={step === 3} changeStep={this.changeStep} exam1={exam1} />
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
    callingApi: state.exam.callingApi,
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
    changeLayout,
    changeHeader,
    createExam,
    callApiExam,
  }
)(CreateExam));