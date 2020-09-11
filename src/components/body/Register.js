import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from '../icons/common';
import './styles/Registers.scss';
import { Link, Redirect } from 'react-router-dom';
import UserContent from './layout/UserContent';
// import './styles/Register.scss';


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<UserContent >
      <div className="register-body">
        <div className="registerContainer">
          <div className="register-header">
            <h2 className="register-title title-center">Đăng ký</h2>
          </div>
          <form className="Singup">
            <div className="form-control-1">
              <input type="text" id="register-input" className="name" placeholder="Họ và tên " required />
            </div>
            <div className="form-control-1">
              <label className="singup" />
              <input type="text" id="register-input" className="username" placeholder="Tên đăng nhập" required />
            </div>
            <div className="form-control-1">
              <input type="password" id="register-input" className="password" placeholder="Mật khẩu" required />
            </div>
            <div className="form-control-1">
              {/* <label class="singup"></label> */}
              <input type="password" id="register-input" className="config-password" placeholder="Nhập lại mật khẩu" required />
            </div>
            <div className="form-control-1">
              {/* <label class="singup"></label> */}
              <input type="email" id="register-input" className="email" placeholder="Email" required />
              <small className="note">Bạn cần sử dụng email này trong trường hợp đặt lại mật khẩu</small>
            </div>
            <div className="form-control-1" id="line-terms">
              <label>
                <input type="checkbox" className="checkbox" defaultChecked="checked" />
              </label>
              <div id="title">
                <p className="note">Tôi đồng ý với
                    {' '}<a href="#">Điều Khoản Dịch vụ</a> và {' '}<a href="#">Chính Sách Bảo Mật</a>
                </p>
              </div>
            </div>
            <div className="form-control-1">
              <button type="submit" value="submit" className="register-button">Xác nhận</button>
            </div>
          </form>
        </div>
      </div>
    </UserContent>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

};

export default connect(mapStateToProps)(Register);