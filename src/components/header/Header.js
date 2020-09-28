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
    this.props.init();
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
    const token = localStorage.getItem('accessToken');
    return (
      <div className='avatar-dropdown dropdown'>
        <div className='infor d-flex justify-content'>
          <img src='../../images/default-avatar.jpg' alt='avatar' />
          <div className='name d-flex align-items-center'>{this.props.name}</div>
        </div>
        <div className='dropdown-item'>
          <Link to='/thong-tin-ca-nhan'>
            Thông tin cá nhân
          </Link>
        </div>
        {!token ? null : (
          <div className='dropdown-item'>
            <Link to='/admin' onClick={() => this.props.changeLayout(1)}>
              Trang quản lý
          </Link>
          </div>
        )}
        <div className='dropdown-item'>
          <Link to='/doi-mat-khau'>
            Đổi mật khẩu
          </Link>
        </div>
        <div className='dropdown-item'>
          <Link to='/dang-nhap' onClick={() => this.logout()}>
            Đăng xuất
          </Link>
        </div>
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
  const { auth: { user: { name, avatar }, layout, accessToken } } = state;
  return {
    name,
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