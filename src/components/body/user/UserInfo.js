import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';




import { Link, Redirect } from 'react-router-dom';
import { hideEmail, hidePhone } from 'actions/common/utils';
import DatePicker from "react-datepicker";
import UserContent from '../layout/UserContent';
import "react-datepicker/dist/react-datepicker.css";
import './styles/UserInfo.scss';
import TittleUserInfo from './TittleUserInfo';
import ChangeMail from './ChangeMail';
import ChangePhone from './ChangePhone';
import LeftProfile from './profile/LeftProfile';
import RightProfile from './profile/RightProfile';
import { getUserInfo } from 'actions/userActions';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 'index',
    };
  }

  componentDidMount() {
    this.props.getUserInfo();
  }

  componentWillUnmount() {
    this.resetState();
  }

  resetState = action => {
    this.setState({ screen: 'index' });
  }

  changeScreen = (from, to) => {
    const { user } = this.props;
    // if (user && !user.email && to === 'phone') return window.noti.warning('Hãy thêm email trước khi thêm số điện thoại');
    this.setState({ screen: to, from });
  }

  // changeGender = (gender) => {
  //   this.setState({ gender });
  // }

  // changeName = (name) => {
  //   if (name && name.length >= 255) {
  //     this.setState({ errorName: 'Họ và tên quá 255 kí tự' });
  //     return window.noti.error('Họ và tên quá 255 kí tự');
  //   }
  //   else {
  //     this.setState({ name, errorName: '' });
  //   }
  // }

  // onBlurName = e => {
  //   const { name } = this.state;
  //   if (!name || name.length <= 0) {
  //     this.setState({ errorName: 'Trường này không được để trống' });
  //   }
  // }

  // changeSchool = (name) => {
  //   if (name && name.length <= 255) {
  //     this.setState({ school: name });
  //   } else {
  //     return window.noti.error('Tên trường quá 255 kí tự');
  //   }
  // }

  // changeBirthday = (birthday) => {
  //   this.setState({ birthday });
  // }

  // submit = e => {
  //   if (this.state.errorName) return window.noti.error('Hãy hoàn thiệt thông tin trước khi lưu');
  // }

  // renderProfileL = () => {
  //   const genders = ['nam', 'nữ', 'khác'];
  //   const { name, email, phone, gender, birthday, school, errorName } = this.state;
  //   const { user } = this.props;
  //   return (
  //     <div className="profile-left d-flex flex-column">
  //       {/* <div className="profile-row">
  //         <div className="key">Tên đăng nhập</div>
  //         <div className="value">ndh12</div>
  //       </div> */}
  //       <div className="profile-row">
  //         <div className="key">Họ và tên</div>
  //         <div className="value">
  //           <input
  //             type="text" value={name || ''}
  //             className={errorName ? 'error' : ''}
  //             title={errorName}
  //             onBlur={e => this.onBlurName(e)}
  //             onChange={(e) => this.changeName(e.target.value)}
  //           />
  //         </div>
  //       </div>
  //       <div className="profile-row">
  //         <div className="key">Email</div>
  //         <div className="value">
  //           <span>{hideEmail(email)}</span>
  //           <Link exact to='/thong-tin-ca-nhan' onClick={() => this.changeScreen('index', 'email')}>
  //             {email ? 'Thay đổi' : 'Thêm mới'}</Link>
  //         </div>
  //       </div>
  //       <div className="profile-row">
  //         <div className="key">Số điện thoại</div>
  //         <div className="value">
  //           <span>{hidePhone(phone)}</span>
  //           <Link
  //             exact to='/thong-tin-ca-nhan'
  //             onClick={() => this.changeScreen('index', 'phone')}
  //             title={user && !user.email ? 'Hãy thêm email trước khi thêm số điện thoại' : ''}
  //           >
  //             {phone ? 'Thay đổi' : 'Thêm mới'}</Link>
  //         </div>
  //       </div>
  //       <div className="profile-row">
  //         <div className="key">Trường học</div>
  //         <div className="value">
  //           <input type="text" value={school || ''} onChange={(e) => this.changeSchool(e.target.value)} />
  //         </div>
  //       </div>
  //       <div className="profile-row">
  //         <div className="key">Giới tính</div>
  //         <div className="value">
  //           {genders.map(item => (
  //             <div className="choice">
  //               <input type="radio" name="gender" checked={gender && gender.toLowerCase() === item} onClick={() => this.changeGender(item)} />
  //               <span style={{ textTransform: 'capitalize' }}>{item}</span>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //       <div className="profile-row">
  //         <div className="key">Ngày sinh</div>
  //         <div className="value">
  //           <DatePicker
  //             selected={birthday}
  //             onChange={(e) => this.changeBirthday(e)}
  //             dateFormat="dd/MM/yyyy"
  //             locale="vi"
  //           />
  //         </div>
  //       </div>
  //       <div className="profile-row">
  //         <div className="key" />
  //         <div className="value">
  //           <button className='btn btn-info mr-2' onClick={e => this.submit()}>
  //             Lưu
  //           </button>
  //           <button className="btn btn-outline-info" onClick={e => this.resetState('cancel')} >
  //             Hủy
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // renderProfileR = () => {
  //   return (
  //     <div className="profile-right">
  //       <div className="avt-wrapper">
  //         <img src={'https://cf.shopee.vn/file/d6fe3aa81dc2f0f4938ad629afd347e7_tn'} />
  //         <button className="btn btn-outline-info" onClick={e => this.fileInput.click()}>
  //           Chọn ảnh
  //         </button>
  //         <input
  //           type="file"
  //           className="d-none"
  //           accept=".jpg,.jpeg,.png"
  //           ref={el => this.fileInput = el}
  //           onChange={e => this.uploadImage(e)}
  //         />
  //         <p>Dụng lượng file tối đa 1 MB</p>
  //         <p>Định dạng file: .JPEG, .PNG</p>
  //       </div>
  //     </div >
  //   );
  // }

  // uploadImage = e => {
  //   const { files } = e.target;
  //   const file = files[0];
  //   const listImgsSupport = [
  //     'image/jpeg',
  //     'image/png',
  //     'image/jpg',
  //     // 'image/gif',
  //   ];
  //   console.log("UserInfo -> file", file)
  //   const reader = new FileReader();
  //   reader.onload = upload => {
  //     console.log("UserInfo -> upload", upload)
  //     if (file.size > 1048576 * 2) {
  //       return window.noti.error(`Ảnh "${file.name}" có kích thước quá 2 MB!`);
  //     }
  //     if (!listImgsSupport.includes(file.type)) {
  //       return window.noti.error('Định dạng ảnh này không được hỗ trợ!');
  //     }
  //     const image = upload.target.result.split(',')[1];
  //     this.setState({ image, file });
  //   };
  //   reader.readAsDataURL(file);
  //   e.target.value = '';
  // };

  getScreen = (screen) => {
    const { user } = this.props;
    switch (screen) {
      case 'email':
        return <ChangeMail
          hiddenEmail={hideEmail(user ? user.email : '')}
          changeScreen={this.changeScreen}
        />;
      case 'phone':
        return <ChangePhone
          hiddenPhone={hidePhone(user ? user.phone : '')}
          changeScreen={this.changeScreen}
        />;
      case 'index':
      default:
        return (
          <React.Fragment>
            <TittleUserInfo
              title='Hồ Sơ Của Tôi'
              description='Quản lý thông tin hồ sơ để bảo mật tài khoản'
            />
            <div className="content d-flex">
              <LeftProfile
                changeScreen={this.changeScreen}
              />
              <RightProfile
                avatar={user.avatar}
              />
              {/* {this.renderProfileL()}
              {this.renderProfileR()} */}
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
  const { auth } = state;
  return {
    user: auth.user,
  };
};

export default connect(
  mapStateToProps,
  {
    getUserInfo,
  }
)(UserInfo);
