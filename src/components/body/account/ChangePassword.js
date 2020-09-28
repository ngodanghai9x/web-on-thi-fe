import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';


import { regex, errorText } from 'constants/regexError';

import TittleUserInfo from 'components/body/user/TittleUserInfo';
import UserContent from '../layout/UserContent';
import { hideEmail, hidePhone } from 'actions/common/utils';
import { changePassword, getOtpCode } from 'actions/userActions';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: '',
      password: '',
      oldPassword: '',
      errorOldPassword: false,
      errorOtp: false,
      errorPassword: false,
      countDown: 60,
    };
    this.timeInterval = null;
  }

  componentDidMount() {
    // this.doInterval();
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
      oldPassword: '',
      errorOldPassword: false,
      errorOtp: false,
      errorPassword: false,
    });
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
    this.props.getOtpCode(this.props.account.username, 0);
    this.setState({ countDown: 60 });
    this.doInterval();
  }

  submit = () => {
    const { password, otp, errorOtp, errorPassword, oldPassword, errorOldPassword } = this.state;
    if (errorPassword || errorOldPassword) return;
    this.props.changePassword(this.props.account.username, password, oldPassword);
  }

  render() {
    const { user } = this.props;
    const { password, oldPassword, errorOldPassword, errorPassword, countDown } = this.state;
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
                <div className="value">{hideEmail(user.email)}</div>
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
                    onBlur={e => this.onBlurNotNull('errorPassword1', e.target.value, errorText.password)}
                  />
                </div>
              </div>
              <div className="profile-row">
                <div className="key">Mật khẩu cũ</div>
                <div className="value">
                  <input
                    type="text" value={oldPassword}
                    className={errorOldPassword ? 'error' : ''}
                    title={errorOldPassword}
                    style={{ width: 350 }}
                    onChange={(e) => this.setState({ oldPassword: e.target.value })}
                    onBlur={e => this.onBlurNotNull('errorOldPassword', e.target.value, errorText.password)}
                  />
                </div>
              </div>
              {/* <div className="profile-row" style={{ paddingTop: 4, marginBottom: -12 }}>
                <div className="key"></div>
                <div className="value">
                  {
                    countDown === 0 ? (
                      <span className='a d-block' onClick={() => this.getOTP()}>Gửi lại OTP</span>
                    ) : (
                        <span className="d-block">{`Gửi lại sau ${countDown}s`}</span>
                      )
                  }
                </div>
              </div> */}
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

const mapStateToProps = (state, ownProps) => {
  const { auth: { user, account } } = state;
  return {
    user,
    account,
  }
};
export default connect(
  mapStateToProps,
  {
    changePassword,
    getOtpCode,
  }
)(ChangePassword);