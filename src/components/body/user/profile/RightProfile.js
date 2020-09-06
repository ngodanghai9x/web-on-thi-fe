import React from 'react';
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
      this.setState({ image: nextProps.avatar})
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
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  render() {
    const { image } = this.state;
    return (
      <div className="profile-right">
        <div className="avt-wrapper">
          <img src={image || 'https://cf.shopee.vn/file/d6fe3aa81dc2f0f4938ad629afd347e7_tn'} />
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

export default RightProfile;
