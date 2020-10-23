import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';




import { Link, Redirect, withRouter } from 'react-router-dom';
import UserContent from 'components/body/layout/UserContent';
import { errorText, regex } from 'constants/regexError';
import {
  updateUserInfo,
  callApiUser,
  changeForgotPassword,
  getOtpCode,
} from 'actions/userActions';

import './styles/ForgotPassword.scss';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      email: '',
      username: '',
      selected: 0,
    };
  }
  // email = sdt

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.callUser && this.props.callUser === 'ForgotPassword') {
      nextProps.history.push('/dang-nhap');
    }
  }

  onBlurNotNull = (key, val, text) => {
    if (!val || val.trim().length === 0) {
      this.setState({ [key]: 'Trường này không để để trống' });
    }
    if (key === 'errorPassword') {
      if (!regex.password.test(val)) {
        this.setState({ [key]: text });
      }
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

  onClick = val => {
    this.setState({ selected: val });
  }

  submit = e => {
    const { username, otp, password, errorOTP, errorPassword, selected, email
    } = this.state;
    const isCanSubmit = !errorOTP && !errorPassword && (username || email) && password && otp;
    if (!isCanSubmit) return window.noti.error('Bạn cần nhập đủ thông tin để lấy lại mật khẩu');
    this.props.callApiUser('ForgotPassword');
    this.props.changeForgotPassword(username, email, password, otp, selected);
  }

  doInterval = () => {
    this.timeInterval = setInterval(() => {
      if (this.state.countDown === 0) {
        clearInterval(this.timeInterval);
      } else {
        this.setState({ countDown: this.state.countDown - 1 });
      }
    }, 1000);
  }

  getOTP = () => {
    const { username, email, selected } = this.state;
    console.log("ForgotPassword -> getOTP -> this.state", this.state)
    this.props.getOtpCode(username, 0, email, selected);
    this.setState({ countDown: 60 });
    this.doInterval();
  }

  nextStep = e => {
    const { email, username } = this.state;
    if ((email && email.trim()) || (username && username.trim())) {
      this.setState({ step: 2 });
      this.getOTP();
    } else {
      window.noti.error('Nhập tài khoản hoặc email để sang bước tiếp theo')
    }
  }

  renderStep1 = () => {
    const { username, email, errorUsername, errorEmail, selected
    } = this.state;
    return (
      <React.Fragment>
        <h5 className="title-left">
          Quên mật khẩu
          </h5>
        <p className="title-FP">
          Vui lòng nhập tài khoản hoặc email bạn đã đăng ký
          </p>
        <div className="form-FP">
          <div className="input-row d-flex">
            <input type="radio" name="form-FP" checked={selected === 0}  onClick={e => this.onClick(0)} onChange={() => {}}/>
            <input
              type="text" value={username || ''}
              // className={errorUsername && errorPhone ? 'error' : ''}
              placeholder="Nhập tài khoản"
              title={errorUsername}
              onClick={e => this.onClick(0)}
              onChange={(e) => this.onChangeMax255('username', e.target.value, 'errorUsername')}
            // onBlur={e => this.onBlurNotNull('errorUsername', e.target.value)}
            />
          </div>
          <div className="input-row d-flex">
            <input type="radio" name="form-FP" checked={selected === 1} onClick={e => this.onClick(1)} onChange={() => {}}/>
            <input
              type="text" value={email || ''}
              // className={errorPhone && errorUsername ? 'error' : ''}
              placeholder="Nhập email"
              title={errorEmail}
              onClick={e => this.onClick(1)}
              onChange={(e) => this.onChangeMax255('email', e.target.value, 'errorEmail')}
            // onBlur={e => this.onBlurNotNull('errorPhone', e.target.value)}
            />
          </div>
          <hr />
          <button className="btn btn-info w-100 mb-3" onClick={() => this.nextStep()} >
            Tiếp theo
          </button>
        </div>
      </React.Fragment>
    );
  }

  renderStep2 = () => {
    const { password, otp, errorPassword, errorOTP, countDown
    } = this.state;

    const { callUser } = this.props;
    return (
      <React.Fragment>
        <h5 className="title-left">
          Xác nhận mã OTP
          </h5>
        <p className="title-FP">
          Chúng tôi đã gửi mã xác nhận vào hòm thư của bạn, vui lòng nhập mã xác nhận và mật khẩu mới
          </p>
        <div className="form-FP d-flex flex-column">
          <div className="input-row d-flex">
            <input
              type="password" value={password || ''}
              className={errorPassword ? 'error' : ''}
              placeholder="Nhập mật khẩu mới"
              title={errorPassword}
              onChange={(e) => this.onChangeMax255('password', e.target.value, 'errorPassword')}
              onBlur={e => this.onBlurNotNull('errorPassword', e.target.value, errorText.password)}
            />
          </div>
          <div className="input-row d-flex">
            <input
              type="text" value={otp || ''}
              className={errorOTP ? 'error' : ''}
              placeholder="Nhập mã xác nhận OTP"
              title={errorOTP}
              onChange={(e) => this.onChangeMax255('otp', e.target.value, 'errorOTP')}
              onBlur={e => this.onBlurNotNull('errorOTP', e.target.value)}
            />
          </div>
          <div className="input-row last">
            {
              countDown === 0 ? (
                <span className='a d-block' onClick={() => callUser !== 'ForgotPassword' && this.getOTP()}>Gửi lại OTP</span>
              ) : (
                  <span className="d-block">{`Gửi lại sau ${countDown}s`}</span>
                )
            }
          </div>
          <button className={`btn btn-info w-100 mb-2 ${callUser === 'ForgotPassword' ? 'disable' : ''} `} onClick={() => callUser !== 'ForgotPassword' && this.submit()}  >
            Đổi mật khẩu
          </button>
          <span className="a mb-3 text-center" onClick={() => { clearInterval(this.timeInterval); this.setState({ step: 1 }) }}>
            Quay lại
          </span>
        </div>
      </React.Fragment>
    );
  }

  render() {
    const { step, countDown } = this.state;
    return (
      <UserContent marginStyle='0 27%'>
        <div className="ForgotPassword d-flex flex-column">
          {step === 2 ? this.renderStep2() : this.renderStep1()}
        </div>
      </UserContent>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { auth } = state;
  return {
    user: auth.user,
    callUser: auth.callUser,
    account: auth.account,
  };

};

export default withRouter(connect(
  mapStateToProps,
  {
    updateUserInfo,
    callApiUser,
    changeForgotPassword,
    getOtpCode,
  },
)(ForgotPassword));