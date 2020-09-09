import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from '../icons/common';
import { Link, Redirect } from 'react-router-dom';
import UserContent from './layout/UserContent';
import './styles/Register.scss';


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <UserContent>
        <div className="Register container2">
          <div className="header2">
            <h2>Đăng ký</h2>
          </div>
          <form className="Singup">
            <div className="form-control">
              <input type="text" className="name" placeholder="Họ và tên" required />
            </div>
            <div className="form-control">
              <label className="singup" />
              <input type="text" className="username" placeholder="Tên đăng nhập" required />
            </div>
            <div className="form-control">
              <input type="password" className="password" placeholder="Mật khẩu" required />
            </div>
            <div className="form-control">
              {/* <label class="singup"></label> */}
              <input type="password" className="config-password" placeholder="Nhập lại mật khẩu" required />
            </div>
            <div className="form-control">
              {/* <label class="singup"></label> */}
              <input type="email" className="email" placeholder="Email" required />
              <p>Bạn cần sử dụng email này trong trường hợp đặt lại mật khẩu</p>
            </div>
            <div className="form-control" id="line-terms">
              <label>
                <input type="checkbox" className="checkbox" defaultChecked="checked" />
              </label>
              <p>Tôi đồng ý với
              <a href="#">Điều Khoản Dịch vụ</a> và <a href="#">Chính Sách Bảo Mật</a>
              </p>
            </div>
            <div className="form-control">
              <button type="submit" value="submit" className="button">Submit</button>
            </div>
          </form>
        </div>
      </UserContent>
    );
  }
}


const mapStateToProps = (state, ownProps) => {

};

export default connect(mapStateToProps)(Register);
