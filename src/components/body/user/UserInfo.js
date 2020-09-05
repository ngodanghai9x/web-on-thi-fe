import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { hideEmail, hidePhone } from '../../../actions/common/utils';
import DatePicker from "react-datepicker";
import UserContent from '../layout/UserContent';
import "react-datepicker/dist/react-datepicker.css";
import './styles/UserInfo.scss';
import TittleUserInfo from './TittleUserInfo';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      birthDay: new Date(),
    };
  }

  changeGender = (gender) => {
    this.setState({ gender });
  }

  changeName = (name) => {
    if (name && name.length <= 255) {
      this.setState({ name });
    }
  }

  changeSchool = (name) => {
    if (name && name.length <= 255) {
      this.setState({ school: name });
    }
  }

  changeBirthday = (birthDay) => {
    this.setState({ birthDay });
  }

  renderProfileL = () => {
    const genders = ['Nam', 'Nữ', 'Khác'];
    const { name, email, phone, gender, birthDay, school } = this.state;
    return (
      <div className="profile-left d-flex flex-column">
        <div className="profile-row">
          <div className="key">Tên đăng nhập</div>
          <div className="value">ndh12</div>
        </div>
        <div className="profile-row">
          <div className="key">Họ và tên</div>
          <div className="value">
            <input type="text" value={name} onChange={(e) => this.changeName(e.target.value)} />
          </div>
        </div>
        <div className="profile-row">
          <div className="key">Email</div>
          <div className="value">
            <span>{hideEmail(email)}</span>
            <Link exact to='/'>{email ? 'Thay đổi' : 'Thêm mới'}</Link>
          </div>
        </div>
        <div className="profile-row">
          <div className="key">Số điện thoại</div>
          <div className="value">
            <span>{hidePhone(phone)}</span>
            <Link exact to='/'>{phone ? 'Thay đổi' : 'Thêm mới'}</Link>
          </div>
        </div>
        <div className="profile-row">
          <div className="key">Trường học</div>
          <div className="value">
            <input type="text" value={school} onChange={(e) => this.changeSchool(e.target.value)} />
          </div>
        </div>
        <div className="profile-row">
          <div className="key">Giới tính</div>
          <div className="value">
            {genders.map(item => (
              <div className="choice">
                <input type="radio" name="gender" checked={gender === item} onClick={() => this.changeGender(item)} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="profile-row">
          <div className="key">Ngày sinh</div>
          <div className="value">
            <DatePicker
              selected={birthDay}
              onChange={(e) => this.changeBirthday(e)}
              dateFormat="dd/MM/yyyy"
              locale="vi"
            />
          </div>
        </div>
        <div className="profile-row">
          <div className="key" />
          <div className="value">
            <button className='btn btn-info'>
              Lưu
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderProfileR = () => {
    return (
      <div className="profile-right">
        <div className="avt-wrapper">
          <img src={'https://cf.shopee.vn/file/d6fe3aa81dc2f0f4938ad629afd347e7_tn'} />
          <button className="btn btn-outline-info">
            Chọn ảnh
                  </button>
          <p>Dụng lượng file tối đa 1 MB</p>
          <p>Định dạng file: .JPEG, .PNG</p>
        </div>
      </div>
    );
  }
  render() {
    const { location } = this.props;
    return (
      <UserContent>
        <div className="UserInfo">
          <TittleUserInfo
            title='Hồ Sơ Của Tôi'
            description='Quản lý thông tin hồ sơ để bảo mật tài khoản'
          />
          <div className="content d-flex">
            {this.renderProfileL()}
            {this.renderProfileR()}
          </div>
        </div>
      </UserContent>
    );
  }
}


const mapStateToProps = (state, ownProps) => {

};

export default connect(mapStateToProps)(UserInfo);
