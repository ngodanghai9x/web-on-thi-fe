import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import UserContent from 'components/body/layout/UserContent';

import './styles/Login.scss';
import { login } from 'actions/userActions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  onBlurNotNull = (key, val, text) => {
    if (!val || val.trim().length === 0) {
      this.setState({ [key]: 'Trường này không để để trống' });
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
    const {username, password, errorPassword,  errorUsername
    } = this.state;
    const isCanSubmit = !errorUsername && !errorPassword;
    
    if (!isCanSubmit) return window.noti.error('Bạn chưa nhập tài khoản hoặc mật khẩu');
    this.props.login(username, password);
  }

  render() {
    const { username, password, errorUsername, errorPassword,
    } = this.state;
    // const isCanSubmit = !isChecked && !errorName && !errorUsername && !errorPassword1 && !errorPassword2 && !errorEmail;
    return (
      <UserContent >
        <div className="wrapper-login d-flex flex-column">
          <h3 className="title-center">
            Đăng nhập
          </h3>

          <div className="login-form d-flex flex-column">
            <input
              type="text" value={username || ''}
              className={errorUsername ? 'error' : ''}
              placeholder="Nhập tài khoản"
              title={errorUsername}
              onChange={(e) => this.onChangeMax255('username', e.target.value)}
              onBlur={e => this.onBlurNotNull('errorUsername', e.target.value)}
            />
            <input
              type="text" value={password || ''}
              className={errorPassword ? 'error' : ''}
              placeholder="Nhập mật khẩu"
              title={errorPassword}
              onChange={(e) => this.onChangeMax255('password', e.target.value)}
              onBlur={e => this.onBlurNotNull('errorPassword', e.target.value)}
            />
            <button
              className="btn btn-info"
              onClick={() => {this.submit()}}
            >
              Đăng nhập ngay
          </button>
            <div className="hr">
              <span>Hoặc</span>
            </div>
            <Link exact to='/dang-ky'>
              <button
                className="btn btn-outline-info"
              // onClick={}
              >
                Tạo tài khoản mới
              </button>
            </Link>
          </div>
          <Link exact to='/quen-mat-khau' className="text-center">
            Quên mật khẩu ?
          </Link>
        </div>
      </UserContent>
    );
  }
}

export default connect(null,
  {
    login,
  },
)(Login);