import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';




import { Link } from 'react-router-dom';

import { subjects2 } from 'actions/common/getInfo';
import { logout, changeLayout, init } from 'actions/userActions';
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
    // this.props.init();
  }

  renderDropDown1 = () => {
    return subjects1.map(item => (
      <Link to={`/lop-10/${item.en}`}>
        <div className='dropdown-item' key={`/lop-10/${item.en}`}>
          <a>
            {item.vn}
            <CommonIcon.chevronRight />
          </a>
        </div>
      </Link>
    ));
  }

  renderDropDown2 = () => {
    return subjects2.map(item => (
      <Link to={`/dai-hoc/${item.en}`}>
        <div className='dropdown-item' key={`/dai-hoc/${item.en}`}>
          <a>
            {item.vn}
            <CommonIcon.chevronRight />
          </a>
        </div>
      </Link>
    ));
  }

  logout = () => {
    this.props.logout();
  }

  renderDropDown3 = () => {
    const { role } = this.props;
    return (
      <div className='avatar-dropdown dropdown'>
        <div className='infor d-flex justify-content'>
          <img src='../../images/default-avatar.jpg' alt='avatar' />
          <div className='name d-flex align-items-center'>{this.props.name}</div>
        </div>
        <Link to='/thong-tin-ca-nhan'>
          <div className='dropdown-item'>
            Thông tin cá nhân
        </div>
        </Link>
        <Link to='/lich-su'>
          <div className='dropdown-item'>
            Lịch sử thi
        </div>
        </Link>
        {/* {!role || !role.includes("ROLE_ADMIN") ? null : ( */}
        <Link to='/admin' onClick={() => this.props.changeLayout(1)}>
          <div className='dropdown-item'>
            Trang quản lý
        </div>
        </Link>
        {/* )} */}
        <Link to='/doi-mat-khau'>
          <div className='dropdown-item'>
            Đổi mật khẩu
        </div>
        </Link>
        <Link to='/dang-nhap' onClick={() => this.logout()}>
          <div className='dropdown-item'>
            Đăng xuất
        </div>
        </Link>
      </div>

    );
  }

  render() {
    if (this.props.layout === 1) return null;
    return (
      <React.Fragment>
        <div className='header container-fluid'>
          <div className='container d-flex'>
            <div className='wrapper-logo-route d-flex'>
              <Link to='/'>
                <img className='header-logo' src='images/logo.png' alt='logo' />
              </Link>
              <div className='route lop-10'
              // onMouseEnter={() => this.setState({ dropdown10: true})}
              // onMouseLeave={() => this.setState({ dropdown10: false})}
              >
                <Link className='route-path' to='/lop-10/'>Luyện thi vào lớp 10</Link>
                <div className='lop-10-dropdown dropdown'>
                  {this.renderDropDown1()}
                </div>
              </div>
              <div className='route dai-hoc'>
                <Link className='route-path' to='/dai-hoc/'>Luyện thi THPT Quốc Gia</Link>
                <div className='dai-hoc-dropdown dropdown'>
                  {this.renderDropDown2()}
                </div>
              </div>
            </div>
            {this.props.accessToken
              ? (
                <div className='avatar route'>
                  <Link to='/thong-tin-ca-nhan/'>
                    <img src='images/default-avatar.jpg' alt='avatar' />
                  </Link>
                  {this.renderDropDown3()}
                </div>
              )
              : (
                <React.Fragment>
                  <div className='avatar route'>
                    <Link to='/dang-nhap'>Đăng nhập</Link>
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
  const { auth: {
    user: { name, avatar },
    layout,
    accessToken,
    account
  } } = state;
  return {
    name,
    role: account.role,
    avatar,
    layout,
    accessToken,
  };
};

export default connect(
  mapStateToProps,
  {
    logout,
    changeLayout,
    init,
  }
)(Header);
// export default Header;