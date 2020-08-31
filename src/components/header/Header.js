import React from 'react';
import { connect } from 'react-redux';
import './styles/Header.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {

  }


  render() {
    const { dropdown10 } = this.state;
    return (
      <React.Fragment>
        <div className='header container-fluid'>
          <div className='container d-flex'>
            <div className='wrapper-logo-route d-flex'>
              <img className='header-logo' src='../../images/logo.png' alt='logo' />
              <div className='route lop-10' 
                // onMouseEnter={() => this.setState({ dropdown10: true})}
                // onMouseLeave={() => this.setState({ dropdown10: false})}
                >
                Luyện thi vào lớp 10
                <div className='lop-10-dropdown dropdown'>
                  <div className='dropdown-item'>
                    <a href='#'>hgsalkh klsahglsah ahgslk</a>
                  </div>
                  <div className='dropdown-item'>
                    <a href='#'>hgsalkh klsahglsah ahgslk</a>
                  </div>
                  <div className='dropdown-item'>
                    <a href='#'>hgsalkh klsahglsah ahgslk</a>
                  </div>
                </div>
              </div>
              <div className='route dai-hoc'>
                Luyện thi THPT Quốc Gia
          </div>
            </div>
            <div className='avatar'>
              <img src='../../images/default-avatar.jpg' alt='avatar' />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => {

};

export default connect(mapStateToProps)(Header);
// export default Header;