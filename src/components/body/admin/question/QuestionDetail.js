/* eslint-disable no-loop-func */

import React from 'react';
import { connect } from 'react-redux';
import CKEditor from 'ckeditor4-react';
import * as CommonIcon from 'components/icons/common';
import { updateExam, callApiExam } from 'actions/examActions';
import { withRouter } from 'react-router';
import AdminContent from 'components/body/layout/AdminContent';
import { getObjLevel, getObjSubject, subjects2 } from 'actions/common/getInfo';
import {
  changeHeader,
} from 'actions/examActions';
import './style.scss';
const total = 100;
const MODE = ['Dễ', 'Trung bình', 'Khó'];

class QuestionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listQ: {
        Q0: {
          question: 'ab',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          correctAnswer: 'option1',
        }
      },
      filter: {
        mode: 'Dễ',
        grade: 'Lớp 10',
        subject: 'Toán',
      },
    };
  }

  componentDidMount() {
    const { match: { params: {id} } } = this.props;
    const text = !id || Number(id) === 0 ? 'Thêm mới câu hỏi' : 'Chi tiết câu hỏi';
    this.props.changeHeader(text);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.callingApi && this.props.callingApi === 'QuestionDetail') {
      nextProps.history.push('/admin');
    }
    //for update
    const { listQuestion } = this.props;
    if (nextProps.listQuestion && nextProps.listQuestion !== listQuestion) {
      // { id, image, question, option1, suggestion, correctAnswer}
      nextProps.listQuestion.forEach((item, i) => {
        if (item.correctAnswer === item.option1) {
          item.correctAnswer = 'option1';
        }
        if (item.correctAnswer === item.option2) {
          item.correctAnswer = 'option2';
        }
        if (item.correctAnswer === item.option3) {
          item.correctAnswer = 'option3';
        }
        if (item.correctAnswer === item.option4) {
          item.correctAnswer = 'option4';
        }
        this.setState(state => ({
          listQ: {
            ...state.listQ,
            [`Q${i}`]: { ...item },
          },
          pointer: 0,
        }))
      });
      // this.setState({ pointer: 0})
    }
  }

  onEditorChange = (evt) => {
    this.setState(state => ({
      listQ: {
        ...state.listQ,
        [`Q${state.pointer}`]: {
          ...state.listQ[`Q${state.pointer}`],
          question: evt.editor.getData(),
        }
      }
    }));
  }

  onChangeMax255 = (key, val, error) => {
    if (val && val.length >= 255) {
      this.setState(state => ({
        listQ: {
          ...state.listQ,
          [`Q${state.pointer}`]: {
            ...state.listQ[`Q${state.pointer}`],
            [error]: 'Độ dài tối đa là 255 kí tự',
          }
        }

      }));
      return window.noti.error('Bạn nhập quá 255 kí tự');
    }
    else {
      this.setState(state => ({
        listQ: {
          ...state.listQ,
          [`Q${state.pointer}`]: {
            ...state.listQ[`Q${state.pointer}`],
            [key]: val,
          }
        }
      }));
    }
  }

  save = (can) => {
    if (!can) return;
    const { name, image, subject, grade, description, time, id } = this.props.exam1;
    const { listQ } = this.state;
    const lastQ = listQ[`Q${Object.keys(listQ).length - 1}`];
    if (!lastQ.question || !lastQ.option1 || !lastQ.option2
      || !lastQ.question.trim() || !lastQ.option1.trim() || !lastQ.option2.trim()
    ) {
      return window.noti.error('Bạn chưa điền đủ thông tin cho câu hỏi cuối cùng');
    }
    this.props.callApiExam('QuestionDetail');
    const listQuestion = Object.values(listQ).map(item => ({
      ...item,
      type: 'one',
      correctAnswer: item[item.correctAnswer],
    }));
    console.log("save -> listQuestion", listQuestion)
    this.props.updateExam(name, image, subject, grade, description, time, listQuestion, id);
  }

  onChangeFilter = (key, val, error) => {
    if (key === 'grade') {
      return this.setState(state => ({
        filter: {
          ...state.filter,
          grade: val,
          subject: 'Toán Học',
        }
      }))
    }
    this.setState(state => ({
      filter: {
        ...state.filter,
        [key]: val,
      }
    }))
  }

  renderQuestion = () => {
    const { listQ, pointer, filter } = this.state;
    const data = listQ[`Q${pointer}`] ? listQ[`Q${pointer}`].question : '';
    console.log("renderQuestion -> data", data)
    // debugger;
    return (
      <div className="wrapper-question QuestionDetail">
        <h6 className="title-left">
          {`Câu hỏi`}
        </h6>
        <div className="question d-flex">
          <div className="left">
            <CKEditor
              data={data}
              onChange={e => this.onEditorChange(e)}
              config={{
                height: 128,
                resize_maxHeight: 374,
                resize_minHeight: 232,
              }}
            />
          </div>
          <div className="right  d-flex flex-column">
            {[1, 2, 3, 4].map(item => (
              <div className="row-option d-flex justify-content-between align-items-center">
                <div className="text">
                  {`Lựa chọn ${item}`}
                </div>
                <input type="text"
                  className=""
                  value={listQ[`Q${pointer}`] && listQ[`Q${pointer}`][`option${item}`] || ''}
                  onChange={(e) => this.onChangeMax255(`option${item}`, e.target.value, `errorOption${item}`)}
                />
                <input type="radio" name="radio-btn-exam"
                  checked={listQ[`Q${pointer}`] && `option${item}` === listQ[`Q${pointer}`].correctAnswer
                    || listQ[`Q${pointer}`] && listQ[`Q${pointer}`].correctAnswer === listQ[`Q${pointer}`][`option${item}`]}
                  onClick={() => this.setState(state => ({
                    listQ: {
                      ...state.listQ,
                      [`Q${state.pointer}`]: {
                        ...state.listQ[`Q${state.pointer}`],
                        correctAnswer: `option${item}`,
                      }
                    },
                  }))}
                  title="Đánh dấu đáp án đúng"
                  onChange={() => { }}
                />
              </div>
            ))}
            <div className="row-option d-flex justify-content-between align-items-center">
              <div className="text">
                  Loại câu hỏi
              </div>
              <div className="question-type d-flex align-items-center justify-content-between">
                <select defaultValue={filter.grade} onChange={(e) => this.onChangeFilter('grade', e.target.value, 'errorName')}>
                  <option value="Lớp 10">Lớp 10</option>
                  <option value="Đại học">Đại học</option>
                </select>

                <select value={filter.subject} onChange={(e) => this.onChangeFilter('subject', e.target.value, 'errorName')}>
                  {subjects2.map((item, i) => {
                    if (filter.grade === 'Lớp 10') {
                      if (i < 3) {
                        return (
                          <option value={item.vn}>{item.vn}</option>
                        );
                      }
                      return null;
                    } else {
                      return (
                        <option value={item.vn}>{item.vn}</option>
                      );
                    }
                  }
                  )}
                </select>

                <select defaultValue={filter.mode} onChange={(e) => this.onChangeFilter('mode', e.target.value, 'errorName')}>
                  {MODE.map(item => ((
                    <option value={item}>{item}</option>
                  )))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { listQ, pointer } = this.state;
    console.log("render -> pointer", pointer)
    const { isShow, callingApi } = this.props;
    const canSave = callingApi !== 'QuestionDetail' && Object.keys(listQ).length >= 1;
    // if ((!role || !role.includes("ROLE_ADMIN")) && isDone) return <Redirect to='/' />
    return (
      <AdminContent>
        <div className="QuestionDetail">

          <div >
            {this.renderQuestion()}

            <div className="wrapper-btn d-flex justify-content-between align-items-center">
              <button className={`btn btn-outline-info ${canSave ? '' : 'disable'}`} onClick={() => this.save(canSave)}>
                {`Lưu`}
              </button>
            </div>
          </div>
        </div>
      </AdminContent>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { auth: { account }, exam: { callingApi } } = state;
  return {
    role: account.role,
    callingApi,
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
    changeHeader,
  }
)(QuestionDetail));
