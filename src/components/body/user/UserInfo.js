import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { hideEmail, hidePhone } from '../../../actions/common/utils';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import './styles/UserInfo.scss';
import TittleUserInfo from './TittleUserInfo';

const DAY_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
const MONTH_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const YEAR_ARRAY = [2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985, 1984, 1983, 1982, 1981, 1980, 1979, 1978, 1977, 1976, 1975, 1974, 1973, 1972, 1971, 1970];

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
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => {

};

export default connect(mapStateToProps)(UserInfo);
