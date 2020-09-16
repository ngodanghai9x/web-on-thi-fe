import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';




import { changeAvatar } from 'actions/userActions';
import "react-datepicker/dist/react-datepicker.css";

class RightProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.avatar) {
      this.setState({ image: nextProps.avatar })
    }
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
      if (file.size > 1048576) {
        return window.noti.error(`Ảnh "${file.name}" có kích thước quá 1 MB!`);
      }
      if (!listImgsSupport.includes(file.type)) {
        return window.noti.error('Định dạng ảnh này không được hỗ trợ!');
      }
      const image = upload.target.result.split(',')[1];
      this.setState({ image, file });
      this.props.changeAvatar(image, file.type);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  onError = (e) => {
    e.target.src = 'images/default-avatar.jpg';
    e.target.onerror = null;
  }

  render() {
    const { image } = this.state;
    const { avatar } = this.props;
    return (
      <div className="profile-right">
        <div className="avt-wrapper">
          <img
            className="img-uploaded"
            src={avatar ? `data:image/png;base64,${avatar}` : 'https://cf.shopee.vn/file/d6fe3aa81dc2f0f4938ad629afd347e7_tn'}
            // src={image ? `data:image/png;base64,${image}` : 'https://cf.shopee.vn/file/d6fe3aa81dc2f0f4938ad629afd347e7_tn'}
            alt="not found"
            onError={e => this.onError(e)}
          />
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
}

export default connect(
  null,
  {
    changeAvatar,
  },
)(RightProfile);