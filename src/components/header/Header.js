import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as CommonIcon from '../icons/common';
import { subjects2 } from '../../actions/common/getInfo';
import { logout } from 'actions/userActions';
import './styles/Header.scss';

const subjects1 = [
  { vn: 'Toán Học', en: 'toan' },
  { vn: 'Ngữ Văn', en: 'van' },
  { vn: 'Tiếng Anh', en: 'anh' },
];

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {

  }

  renderDropDown1 = () => {
    return subjects1.map(item => (
      <div className='dropdown-item'>
        <Link exact to={`/lop-10/${item.en}`}>
          {item.vn}
          <CommonIcon.chevronRight />
        </Link>
      </div>
    ));
  }

  renderDropDown2 = () => {
    return subjects2.map(item => (
      <div className='dropdown-item'>
        <Link exact to={`/dai-hoc/${item.en}`}>
          {item.vn}
          <CommonIcon.chevronRight />
        </Link>
      </div>
    ));
  }

  logout = () => {
    this.props.logout();
  }

  renderDropDown3 = () => {
    return (
      <div className='avatar-dropdown dropdown'>
        <div className='infor d-flex justify-content'>
          <img src='../../images/default-avatar.jpg' alt='avatar' />
          <div className='name d-flex align-items-center'>{this.props.name}</div>
        </div>
        <div className='dropdown-item'>
          <Link exact to='/thong-tin-ca-nhan'>
            Thông tin cá nhân
          </Link>
        </div>
        <div className='dropdown-item'>
          <Link exact to='/doi-mat-khau'>
            Đổi mật khẩu
          </Link>
        </div>
        <div className='dropdown-item'>
          <Link exact to='/dang-nhap' onClick={() => this.logout()}>
            Đăng xuất
          </Link>
        </div>
      </div>

    );
  }

  render() {
    return (
      <React.Fragment>
        <div className='header container-fluid'>
          <div className='container d-flex'>
            <div className='wrapper-logo-route d-flex'>
              <Link exact to='/'>
                <img className='header-logo' src='../../images/logo.png' alt='logo' />
              </Link>
              <div className='route lop-10'
              // onMouseEnter={() => this.setState({ dropdown10: true})}
              // onMouseLeave={() => this.setState({ dropdown10: false})}
              >
                <Link className='route-path' exact to='/lop-10/'>Luyện thi vào lớp 10</Link>
                <div className='lop-10-dropdown dropdown'>
                  {this.renderDropDown1()}
                </div>
              </div>
              <div className='route dai-hoc'>
                <Link className='route-path' exact to='/dai-hoc/'>Luyện thi THPT Quốc Gia</Link>
                <div className='dai-hoc-dropdown dropdown'>
                  {this.renderDropDown2()}
                </div>
              </div>
            </div>
            {localStorage.getItem('accessToken')
              ? (
                <div className='avatar route'>
                  <Link exact to='/thong-tin-ca-nhan/'>
                    <img src='../../images/default-avatar.jpg' alt='avatar' />
                  </Link>
                  {this.renderDropDown3()}
                </div>
              )
              : (
                <React.Fragment>
                  <div className='avatar route'>
                    <Link exact to='/dang-nhap'>Đăng nhập</Link>
                  </div>
                </React.Fragment>
              )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const { auth: { user: { name, avatar } } } = state;
  return {
    name,
    avatar,
  };
};

export default connect(
  mapStateToProps,
  {
    logout,
  }
)(Header);
// export default Header;