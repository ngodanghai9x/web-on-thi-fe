import React from 'react';

import TittleUserInfo from 'components/body/user/TittleUserInfo';
import UserContent from '../layout/UserContent';
import { hideEmail, hidePhone } from 'actions/common/utils';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: '',
      password: '',
      errorOtp: '',
      errorPassword: '',
      countDown: 60,
    };
    this.timeInterval = null;
  }

  componentDidMount() {
    this.doInterval();
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  changePassword = password => {
    if (password === '123') {
      this.setState({ errorPassword: true, password });
    } else {
      this.setState({ errorPassword: false, password });
    }
  }

  resetState = action => {
    this.setState({
      otp: '',
      password: '',
      errorOtp: false,
      errorPassword: false,
    });
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
    this.setState({ countDown: 60 });
    this.doInterval();
  }

  submit = () => {
    const { password, otp, errorOtp, errorEmail, errorPassword } = this.state;
    if (errorEmail || errorPassword || errorOtp) return;
  }

  render() {
    const { email } = this.props;
    const { password, otp, errorOtp, errorEmail, errorPassword, countDown } = this.state;
    return (
      <React.Fragment>
        <UserContent>
          <div className="UserInfo ChangePassword">
            <TittleUserInfo
              title='Đổi Mật Khẩu'
              description='Để cập nhật mật khẩu mới, vui lòng xác nhận bằng cách nhập mã OTP'
            />
            <div className="content ChangeMail" style={{ margin: '15px 10% 25px 10%' }}>
              <div className="profile-row">
                <div className="key">Địa chỉ hòm thư</div>
                <div className="value">{hideEmail(email)}</div>
              </div>
              <div className="profile-row">
                <div className="key">Mật khẩu mới</div>
                <div className="value">
                  <input
                    type="password" value={password}
                    className={errorPassword ? 'error' : ''}
                    title={errorPassword}
                    style={{ width: 350 }}
                    onChange={(e) => this.changePassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="profile-row">
                <div className="key">Mã OTP</div>
                <div className="value">
                  <input
                    type="text" value={otp}
                    className={errorOtp ? 'error' : ''}
                    title={errorOtp}
                    style={{ width: 350 }}
                    onChange={(e) => this.setState({ otp: e.target.value })}
                  />
                </div>
              </div>
              <div className="profile-row" style={{ paddingTop: 4, marginBottom: -12 }}>
                <div className="key"></div>
                <div className="value">
                  {
                    countDown === 0 ? (
                      <span class='a d-block' onClick={() => this.getOTP()}>Gửi lại OTP</span>
                    ) : (
                        <span className="d-block">{`Gửi lại sau ${countDown}s`}</span>
                      )
                  }
                </div>
              </div>
              <div className="profile-row">
                <div className="key"></div>
                <div className="value">
                  <button className="btn btn-info mr-2" onClick={e => this.submit()} >
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          </div>
        </UserContent>

      </React.Fragment>
    );
  }
}

export default ChangePassword;
