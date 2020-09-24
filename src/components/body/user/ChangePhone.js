import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';




// import './styles/ChangeMail.scss';
import TittleUserInfo from './TittleUserInfo';

class ChangePhone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      phone: '',
      otp: '',
      errorOtp: '',
      errorPhone: '',
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

  doInterval = () => {
    this.timeInterval = setInterval(() => {
      if (this.state.countDown === 0) {
        clearInterval(this.timeInterval);
      } else {
        this.setState({ countDown: this.state.countDown - 1 });
      }
    }, 1000);
  }

  changePassword = password => {
    if (password === '123') {
      this.setState({ errorPassword: true, password });
    } else {
      this.setState({ errorPassword: false, password });
    }
  }

  changePhone = phone => {
    if (phone === '123') {
      this.setState({ errorPhone: true, phone });
    } else {
      this.setState({ errorPhone: false, phone });
    }
  }

  resetState = action => {
    this.setState({
      password: '',
      phone: '',
      errorPhone: false,
      errorPassword: false,
    });
    if (action === 'cancel') {
      this.props.changeScreen('phone','index');
    }
  }

  getOTP = () => {
    this.setState({ countDown: 60 });
    this.doInterval();
  }

  submit = () => {
    const { password, phone, otp, errorOtp, countDown, errorPassword, errorPhone } = this.state;
    if (errorPassword || errorPhone || errorOtp) return;
  }

  render() {
    const { hiddenEmail, hiddenPhone, changeScreen } = this.props;
    const { password, phone, otp, errorOtp, countDown, errorPassword, errorPhone } = this.state;
    return (
      <React.Fragment>
        <TittleUserInfo
          title='Đổi Số Điện Thoại'
          description='Để cập nhật số điện thoại mới, vui lòng xác nhận bằng cách nhập mã OTP'
        />
        <div className="content ChangePhone" style={{ margin: '15px 10% 25px 10%' }}>
          {!hiddenPhone ? null : (
            <div className="profile-row">
              <div className="key">Số điện thoại cũ</div>
              <div className="value">{hiddenPhone}</div>
            </div>
          )}

          <div className="profile-row">
            <div className="key">Số điện thoại mới</div>
            <div className="value">
              <input
                type="text" value={phone}
                className={errorPhone ? 'error' : ''}
                title={errorPhone}
                style={{ width: 350 }}
                onChange={(e) => this.changePhone(e.target.value)}
              />
            </div>
          </div>
          <div className="profile-row">
            <div className="key">Mật khẩu</div>
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
            <div className="key">Địa chỉ hòm thư</div>
            <div className="value">{hiddenEmail}</div>
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
                  <span className='a d-block' onClick={() => this.getOTP()}>Gửi lại OTP</span>
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
              <button className="btn btn-outline-info" onClick={e => this.resetState('cancel')} >
                Hủy
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ChangePhone;
