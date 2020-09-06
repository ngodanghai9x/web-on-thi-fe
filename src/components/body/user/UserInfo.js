import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { hideEmail, hidePhone } from '../../../actions/common/utils';
import DatePicker from "react-datepicker";
import UserContent from '../layout/UserContent';
import "react-datepicker/dist/react-datepicker.css";
import './styles/UserInfo.scss';
import TittleUserInfo from './TittleUserInfo';
import ChangeMail from './ChangeMail';
import ChangePhone from './ChangePhone';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      birthDay: new Date(),
      screen: 'index',
    };
  }

  resetState = action => {
    this.setState({
      birthDay: new Date(),
      screen: 'index',
    });
    if (action === 'cancel') {
      window.location.pathname = '/';
      // return <Redirect exact to='/' />
    }
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

  changeScreen = screen => {
    if (!this.props.email1 && screen !== 'email') return;
    this.setState({ screen });
  }

  renderProfileL = () => {
    const genders = ['Nam', 'Nữ', 'Khác'];
    const { name, email, phone, gender, birthDay, school } = this.state;
    const { email1 } = this.props;
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
            <Link exact to='/thong-tin-ca-nhan' onClick={() => this.changeScreen('email')}>
              {email ? 'Thay đổi' : 'Thêm mới'}</Link>
          </div>
        </div>
        <div className="profile-row">
          <div className="key">Số điện thoại</div>
          <div className="value">
            <span>{hidePhone(phone)}</span>
            <Link
              exact to='/thong-tin-ca-nhan'
              onClick={() => this.changeScreen('phone')}
              title={!email1 ? 'Hãy thêm email trước khi thêm số điện thoại' : ''}
            >
              {phone ? 'Thay đổi' : 'Thêm mới'}</Link>
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
            <button className='btn btn-info mr-2'>
              Lưu
            </button>
            <button className="btn btn-outline-info" onClick={e => this.resetState('cancel')} >
              Hủy
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
          <button className="btn btn-outline-info" onClick={e => this.fileInput.click()}>
            Chọn ảnh
          </button>
          <input
            type="file"
            className="d-none"
            accept=".jpg,.jpeg,.png"
            ref={el => this.fileInput = el}
            onChange={e => this.uploadImage(e)}
          />
          <p>Dụng lượng file tối đa 1 MB</p>
          <p>Định dạng file: .JPEG, .PNG</p>
        </div>
      </div >
    );
  }

  uploadImage = e => {
    const { files } = e.target;
    const file = files[0];
    const listImgsSupport = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      // 'image/gif',
    ];
    console.log("UserInfo -> file", file)
    const reader = new FileReader();
    reader.onload = upload => {
      console.log("UserInfo -> upload", upload)
      if (file.size > 1048576 * 2) {
        return alert(`Ảnh "${file.name}" có kích thước quá 2 MB!`);
      }
      if (!listImgsSupport.includes(file.type)) {
        return alert('Định dạng ảnh này không được hỗ trợ!');
      }
      const image = upload.target.result.split(',')[1];
      this.setState({ image, file });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  getScreen = (screen) => {
    const { phone, email } = this.state;
    switch (screen) {
      case 'email':
        return <ChangeMail
          hiddenEmail={hideEmail(email)}
          changeScreen={this.changeScreen}
        />;
      case 'phone':
        return <ChangePhone
          hiddenPhone={hidePhone(phone) || 'abc'}
          changeScreen={this.changeScreen}
        />;
      default:
        return (
          <React.Fragment>
            <TittleUserInfo
              title='Hồ Sơ Của Tôi'
              description='Quản lý thông tin hồ sơ để bảo mật tài khoản'
            />
            <div className="content d-flex">
              {this.renderProfileL()}
              {this.renderProfileR()}
            </div>
          </React.Fragment>
        );
    }
  }

  render() {
    const { location } = this.props;
    const { screen } = this.state;

    return (
      <UserContent>
        <div className="UserInfo">
          {this.getScreen(screen)}
        </div>
      </UserContent>
    );
  }
}


const mapStateToProps = (state, ownProps) => {

};

export default connect(mapStateToProps)(UserInfo);
