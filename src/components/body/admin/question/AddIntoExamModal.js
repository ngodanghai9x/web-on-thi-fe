import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';

import { sendMessage } from 'actions/userActions';
import { Modal, Button } from 'react-bootstrap';

class AddIntoExamModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillUnmount() {
  }

  reload = () => {
    this.setState({ isTyping: false })
  }

  save = () => {

  }

  render() {
    const { inputSearch, isTyping } = this.state;
    const { layout, isOpenModal, toggleModal } = this.props;
    const exams = [1, 2];
    return (
      <Modal className="AddIntoExamModal" show={isOpenModal} onHide={() => this.props.toggleModal(true)} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Chọn đề bạn muốn thêm câu hỏi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-bd-content">
            <input className="w-100" type="search" placeholder="Tìm kiếm"
              value={inputSearch} onChange={(e) => this.setState({ inputSearch: e.target.value })}
              onFocus={e => this.setState({ isTyping: true })}
              onBlur={e => this.reload()}
            />
            {
              (exams && exams.length > 0) || isTyping
                ? (
                  <div className="exams-suggest list-overflow-auto">
                    <div className="exam-item d-flex align-items-center">
                      <div className="code">
                        abc
                      </div>
                      <div className="name">
                        afsafsagsagsagsagsagsagsagsagsa
                      </div>
                    </div>
                  </div>
                )
                : <div className="exams-suggest border-0" />
            }

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.props.toggleModal(true)}>
            Hủy
            </Button>
          <Button variant="info" onClick={() => this.save()}>
            Lưu
            </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    layout: state.auth.layout,
  }
};

export default connect(
  mapStateToProps,
  {
    // logout,
    sendMessage,
  }
)(AddIntoExamModal);