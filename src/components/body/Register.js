import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';





import { Link, Redirect } from 'react-router-dom';
import { regex, errorText } from 'constants/regexError';
import UserContent from './layout/UserContent';
import { createAccount } from 'actions/userActions';
// import './styles/Register.scss';

import './styles/Registers.scss';


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      password1: '',
      password2: '',
      email: '',
      isChecked: true,
    };
  }

  onBlurNotNull = (key, val, text) => {
    if (!val || val.trim().length === 0) {
      this.setState({ [key]: 'Trường này không để để trống' });
    }
    if (key === 'errorUsername') {
      if (regex.username.test(val)) {
        this.setState({ [key]: text });
      }
    }
    if (key === 'errorPassword1') {
      if (!regex.password.test(val)) {
        this.setState({ [key]: text });
      }
    }
    if (key === 'errorPassword2') {
      if (val !== this.state.password1) {
        this.setState({ [key]: text });
      }
    }
    if (key === 'errorEmail') {
      if (!regex.email.test(val)) {
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

  submit = e => {
    const { name, username, password1, password2, email, isChecked,
      errorName, errorUsername, errorPassword1, errorPassword2, errorEmail,
    } = this.state;
    const isCanSubmit = isChecked && !errorName && !errorUsername && !errorPassword1 && !errorPassword2 && !errorEmail;
    // if (!isCanSubmit) return window.noti.error('Hãy hoàn thành form đăng ký trước khi bấm xác nhận');
    this.props.createAccount(name.trim(), username.trim(), password1, email.trim());
  }

  render() {
    const { name, username, password1, password2, email, isChecked,
      errorName, errorUsername, errorPassword1, errorPassword2, errorEmail,
    } = this.state;
    // const isCanSubmit = !isChecked && !errorName && !errorUsername && !errorPassword1 && !errorPassword2 && !errorEmail;
    return (
      <UserContent >
        <div className="register-body">
          <div className="registerContainer">
            <div className="register-header">
              <h2 className="register-title title-center">Đăng ký</h2>
            </div>
            <form className="Singup">
              <div className="form-control-1">
                <input type="text" className={`${errorName ? 'error' : ''} register-input name`} placeholder="Họ và tên"
                  onChange={(e) => this.onChangeMax255('name', e.target.value, 'errorName')} value={name}
                  onBlur={e => this.onBlurNotNull('errorName', e.target.value, 'Trường này không để để trống')}
                  title={errorName}
                // required
                />
              </div>
              <div className="form-control-1">
                <label className="singup" />
                <input type="text" className={`${errorUsername ? 'error' : ''} register-input username`} placeholder="Tên đăng nhập"
                  onChange={(e) => this.onChangeMax255('username', e.target.value, 'errorUsername')} value={username}
                  onBlur={e => this.onBlurNotNull('errorUsername', e.target.value, errorText.username)}
                  title={errorUsername}
                // required
                />
              </div>
              <div className="form-control-1">
                <input type="password" className={`${errorPassword1 ? 'error' : ''} register-input password`} placeholder="Mật khẩu"
                  onChange={(e) => this.onChangeMax255('password1', e.target.value, 'errorPassword1')} value={password1}
                  onBlur={e => this.onBlurNotNull('errorPassword1', e.target.value, errorText.password)}
                  title={errorPassword1}
                // required
                />
              </div>
              <div className="form-control-1">
                {/* <label className="singup"></label> */}
                <input type="password" className={`${errorPassword2 ? 'error' : ''} register-input config-password`} placeholder="Nhập lại mật khẩu"
                  onChange={(e) => this.onChangeMax255('password2', e.target.value, 'errorPassword2')} value={password2}
                  onBlur={e => this.onBlurNotNull('errorPassword2', e.target.value, 'Mật khẩu nhập lại không trùng khớp')}
                  title={errorPassword2}
                // required
                />
              </div>
              <div className="form-control-1">
                {/* <label className="singup"></label> */}
                <input type="email" className={`${errorEmail ? 'error' : ''} register-input email`} placeholder="Email"
                  onChange={(e) => this.onChangeMax255('email', e.target.value, 'errorEmail')} value={email}
                  onBlur={e => this.onBlurNotNull('errorEmail', e.target.value, errorText.email)}
                  title={errorEmail}
                // required
                />
                <small className="note">Bạn cần sử dụng email này trong trường hợp đặt lại mật khẩu</small>
              </div>
              <div className="form-control-1" id="line-terms">
                <label>
                  <input type="checkbox" className="checkbox"
                    checked={isChecked} onChange={() => this.setState(pre => ({ isChecked: !pre.isChecked }))}
                  />
                </label>
                <div>
                  <p className="note">Tôi đồng ý với
                    {' '}<a href="#">Điều Khoản Dịch vụ</a> và {' '}<a href="#">Chính Sách Bảo Mật</a>
                  </p>
                </div>
              </div>
              <div className="form-control-1">
                <button type="button" value="submit" className="register-button"
                  onClick={() => this.submit()}
                >
                  Xác nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      </UserContent>
    );
  }
}

export default connect(null,
  {
    createAccount,
  },
)(Register);