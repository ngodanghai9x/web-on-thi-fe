import React from 'react';

// import './styles/ChangeMail.scss';
import TittleUserInfo from './TittleUserInfo';

class ChangeMail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      otp: '',
      errorOtp: '',
      errorEmail: '',
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

  changeMail = email => {
    if (email === '@') {
      this.setState({ errorEmail: true, email });
    } else {
      this.setState({ errorEmail: false, email });
    }
  }

  resetState = action => {
    this.setState({
      password: '',
      email: '',
      errorEmail: false,
      errorPassword: false,
    });
    if (action === 'cancel') {
      this.props.changeScreen('email','index');
    }
  }

  getOTP = () => {
    this.setState({ countDown: 60 });
    this.doInterval();
  }

  submit = () => {
    const { password, email, otp, errorOtp, errorEmail, errorPassword } = this.state;
    if (errorEmail || errorPassword || errorOtp) return;
  }

  render() {
    const { hiddenEmail, changeScreen } = this.props;
    const { password, email, otp, errorOtp, errorEmail, errorPassword, countDown } = this.state;
    return (
      <React.Fragment>
        <TittleUserInfo
          title='Đổi Hòm Thư'
          description='Để cập nhật email mới, vui lòng xác nhận bằng cách nhập mật khẩu'
        />
        <div className="content ChangeMail" style={{ margin: '15px 10% 25px 10%' }}>
          {!hiddenEmail ? null : (
            <div className="profile-row">
              <div className="key">Hòm thư cũ</div>
              <div className="value">{hiddenEmail}</div>
            </div>
          )}
          <div className="profile-row">
            <div className="key">Hòm thư mới</div>
            <div className="value">
              <input
                type="text" value={email}
                className={errorEmail ? 'error' : ''}
                title={errorEmail}
                style={{ width: 350 }}
                onChange={(e) => this.changeMail(e.target.value)}
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
            <div className="key">Mã OTP</div>
            <div className="value">
              <input
                type="text" value={otp}
                className={errorOtp ? 'error' : ''}
                title={errorOtp}
                style={{ width: 350 }}
                onChange={(e) => this.setState({ otp: e.target.value})}
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

export default ChangeMail;
