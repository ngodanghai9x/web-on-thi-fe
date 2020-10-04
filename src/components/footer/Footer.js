import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';




import './styles/Footer.scss';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    if (this.props.layout === 1) return null;
    return (
      <React.Fragment>
        <footer className="footer footer-wrapper">
          <div className="container">
            <div className="footer-wapper">
              <div style={{display: 'block'}}>
                <div className="social_media">
                  <a className="item">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a className="item">
                    <i className="fab fa-google-plus-g" style={{color: '#dc5246'}} />
                  </a>
                  <a className="item">
                    <i className="fab fa-youtube" style={{color: 'red'}} />
                  </a>
                </div>
                <div className="logo">
                  <img src="/images/logo.png" />
                  <div className="infor">Bản Quyền của Hoctot.com ® 2020</div>
                </div>
              </div>
              <div className="support ">
                <div style={{fontWeight: 'bold'}}>Hỗ trợ</div>
                <div className="support-item ">
                  <a href="# ">Giới thiệu</a>
                </div>
                <div className="support-item ">
                  <a href="# ">Điều khoản</a>
                </div>
                <div className="support-item ">
                  <a href="# ">Chính sách</a>
                </div>
              </div>
              <div className="contact">
                <div style={{fontWeight: 'bold', paddingLeft: '8px'}}>Liên hệ với chúng tôi</div>
                <div className="contact-item ">
                  <i className="fas fa-globe" />
                  &nbsp;
                  <b>Website: </b>
                  &nbsp;
                  <span>Hoctot.com</span>
                </div>
                <div className="contact-item ">
                  <i className="fas fa-map-marker-alt " />
                  &nbsp;
                  <b>Địa chỉ: </b>
                  &nbsp;
                  <span>82 Duy Tân , Quận Cầu Giấy , Hà Nội</span>
                </div>
                <div className="contact-item ">
                  <i className="fas fa-envelope " />
                  &nbsp;
                  <b>Email: </b>
                  &nbsp;
                  <span>doctailieu.com@gmail.com </span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const { auth: {layout} } = state;
  return {
    layout,
  }
};

export default connect(mapStateToProps)(Content);
