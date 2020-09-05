import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from '../icons/common';
import MainContent from '../body/layout/MainContent';

import './styles/Home.scss';
import { Link, Redirect } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const { location } = this.props;
    return (
      <MainContent>
        <h2 className='title-center'>
          THI THỬ ONLINE
        </h2>
        <div className='home'>
          <div className='img-btn d-flex'>
            <div className='img-btn-item d-table' onClick={() => window.location.pathname = `${location.pathname}lop-10`}>
              <div className='d-table-cell'>
                Ôn thi
                  <br />
                  vào lớp 10
                </div>
            </div>
            <div className='img-btn-item d-table' onClick={() => window.location.pathname = `${location.pathname}dai-hoc`}>
              <div className='d-table-cell'>
                Luyện đề
                  <br />
                  THPT Quốc Gia
                </div>
            </div>
          </div>

          <h3 className='title-left'>
            LUYỆN THI VÀO LỚP 10
          </h3>
          <div className='div-infor'>
            <div className='wrapper-btn-group'>
              <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-info">Toán</button>
                <button type="button" class="btn btn-info">Văn</button>
                <button type="button" class="btn btn-info">Anh</button>
              </div>
            </div>
            <div className='content' style={{ padding: '15px 20px' }}>
              <h4>Các đề được quan tâm nhiều nhất</h4>
              <div className='item'>
                > Trắc nghiệm ôn tập kiến thức bài Căn thức bậc hai
              </div>
              <div className='item'>
                > Trắc nghiệm ôn tập kiến thức bài Căn thức bậc hai
              </div>
              <p className='more' style={{ textAlign: 'right', margin: 0 }}>Xem thêm ></p>
            </div>
          </div>
        </div>
      </MainContent>
    );
  }
}


const mapStateToProps = (state, ownProps) => {

};

export default connect(mapStateToProps)(Home);
