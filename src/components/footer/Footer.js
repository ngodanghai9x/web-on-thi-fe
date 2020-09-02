import React from 'react';
import { connect } from 'react-redux';
import './styles/Footer.scss';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
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
                  <img src="https://upload.wikimedia.org/wikipedia/vi/archive/d/dc/20200125140746%21Vinfast-logo.png " />
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
                  <b>Website: </b>
                  <span>Hoctot.com</span>
                </div>
                <div className="contact-item ">
                  <i className="fas fa-map-marker-alt " />
                  <b>Địa chỉ: </b>
                  <span>82 Duy Tân , Quận Cầu Giấy , Hà Nội</span>
                </div>
                <div className="contact-item ">
                  <i className="fas fa-envelope " />
                  <b>Email: </b>
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

};

export default connect(mapStateToProps)(Content);
