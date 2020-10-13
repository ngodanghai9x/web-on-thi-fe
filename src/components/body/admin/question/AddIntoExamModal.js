import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';

import { getAllExam } from 'actions/examActions';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import exam from 'reducers/exam';

const SIZE = 15;
class AddIntoExamModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputSearch: '',
      isOpenSearch: true,
      currentExam: {},
    };
  }

  componentDidMount() {
    this.reload();
  }

  componentWillReceiveProps(nextProps) {
    const { pagination } = this.props;
    if (nextProps.pagination && nextProps.pagination !== pagination) {
      this.setState({
        activePage: pagination.activePage,
      })
    }
  }

  componentWillUnmount() {
    this.resetState();
  }

  resetState = e => {
    this.setState({
      inputSearch: '',
      isOpenSearch: true,
      currentExam: {},
    })
  }

  reload = () => {
    let { inputSearch } = this.state;
    this.props.getAllExam(inputSearch, 1, SIZE);
    this.setState({ isTyping: false })
    // if (inputSearch === '' || inputSearch == null) this.apiGetPage(activePage, SIZE);
    // else this.apiSearchPage(activePage, SIZE, inputSearch);
  }

  save = () => {

  }

  selectExam = currentExam => {
    this.setState({ currentExam, isOpenSearch: false });
  }

  renderExamItem = (exams) => {
    if (!exams) return null;
    return exams.map(item => {
      return (
        <div className="exam-item d-flex align-items-center">
          <div className="code text-ellipsis">
            <Link to={`/admin/update-exam/${item.id}`} >
              {item.code}
            </Link>
          </div>
          <div className="name text-ellipsis" onClick={e => this.selectExam(item)}>
            {item.name}
          </div>
        </div>
      );
    })
  }

  render() {
    const { inputSearch, isOpenSearch, currentExam } = this.state;
    const { layout, isOpenModal, toggleModal, all1 } = this.props;
    const all = [{ id: 1, code: 'made001', name: 'abcasfsafsagasgsagsagsagas' }];
    return (
      <Modal className="AddIntoExamModal" show={isOpenModal} onHide={() => toggleModal(true)} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Chọn đề bạn muốn thêm câu hỏi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-bd-content">
            <input className="w-100" type="search" placeholder="Tìm kiếm"
              value={inputSearch} onChange={(e) => this.setState({ inputSearch: e.target.value })}
              onFocus={e => this.setState({ isOpenSearch: true })}
              onBlur={e => this.reload()}
            />
            {
              isOpenSearch
                ? (
                  <div className="exams-suggest list-overflow-auto">
                    {this.renderExamItem(all)}
                  </div>
                )
                : (
                  <div className="exams-suggest border-0">
                    <div className="current-exam">
                      <div className="profile-row">
                        <div className="key">
                          Mã đề
                        </div>
                        <div className="value">
                          {currentExam.code}
                        </div>
                      </div>
                      <div className="profile-row">
                        <div className="key">
                          Tên đề
                        </div>
                        <div className="value">
                        {currentExam.name}
                        </div>
                      </div>
                      <div className="profile-row">
                        <div className="key">
                          Mô tả
                        </div>
                        <div className="value">
                        {currentExam.description}
                        </div>
                      </div>
                    </div>
                  </div>
                )
            }

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => toggleModal(true)}>
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
  const { auth: { account, isDone }, exam: { all, callingApi, pagination } } = state;
  return {
    role: account.role,
    isDone,
    all: all || [],
    pagination: pagination || {},
    callingApi,
  }
}

export default connect(
  mapStateToProps,
  {
    // logout,
    getAllExam,
  }
)(AddIntoExamModal);