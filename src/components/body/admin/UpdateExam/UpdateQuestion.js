/* eslint-disable no-loop-func */

import React from 'react';
import { connect } from 'react-redux';
import CKEditor from 'ckeditor4-react';
import * as CommonIcon from 'components/icons/common';
import { updateExam, callApiExam } from 'actions/examActions';
import { withRouter } from 'react-router';

// import './styles/CreateExam.scss';
const total = 100;
class UpdateQuestion extends React.Component {
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
      pointer: -1,
    };
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.callingApi && this.props.callingApi === 'UpdateQuestion') {
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

  back = (can, can2) => {
    console.log("back -> can", can, can2)
    if (!can2) return;
    if (!can) return this.props.changeStep(1);
    this.setState(state => ({
      pointer: state.pointer - 1,
    }));
  }

  next = (can) => {
    console.log('can', can);
    if (!can) return;
    this.setState(state => ({
      pointer: state.pointer + 1,
    }));
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
    this.props.callApiExam('UpdateQuestion');
    const listQuestion = Object.values(listQ).map(item => ({
      ...item,
      correctAnswer: item[item.correctAnswer],
    }));
    console.log("save -> listQuestion", listQuestion)
    this.props.updateExam(name, image, subject, grade, description, time, listQuestion, id);
  }

  add = (can) => {
    if (!can) return;
    const length = Object.keys(this.state.listQ).length;
    this.setState(state => {
      return ({
        pointer: length,
        listQ: {
          ...state.listQ,
          [`Q${length}`]: {
            // number: length,
            question: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            correctAnswer: 'option1',
          }
        },
      })
    });
  }

  renderQuestion = () => {
    const { listQ, pointer } = this.state;
    const data = listQ[`Q${pointer}`] ? listQ[`Q${pointer}`].question : '';
    console.log("renderQuestion -> data", data)
    // debugger;
    return (
      <div className="wrapper-question">
        <h6 className="title-left">
          {`Câu ${pointer + 1}`}
        </h6>
        <div className="question d-flex">
          <div className="left">
            <CKEditor
              data={data}
              // data={listQ[`Q${pointer}`] && listQ[`Q${pointer}`].question || ''}
              // data={listQ[`Q${pointer}`] ? listQ[`Q${pointer}`].question : ''}
              onChange={e => this.onEditorChange(e)}
              config={{
                height: 82,
                resize_maxHeight: 334,
                resize_minHeight: 186,
              }}
            />
            {/* <input value={data} type="text" /> */}
          </div>
          <div className="right  d-flex justify-content-between flex-column">
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
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { listQ, pointer } = this.state;
    console.log("render -> pointer", pointer)
    const { isShow, callingApi } = this.props;
    const canBack = Object.keys(listQ).length > 1 && pointer > 0;
    const canNext = callingApi !== 'UpdateQuestion' && pointer < Object.keys(listQ).length - 1;
    const canAdd = callingApi !== 'UpdateQuestion' && Object.keys(listQ).length < total && pointer < total;
    const canSave = callingApi !== 'UpdateQuestion' && Object.keys(listQ).length >= 1;
    if (!isShow) return null;
    return (
      <React.Fragment>
        <div className={`UpdateQuestion ${!isShow ? 'd-none' : ''}`}>
          {this.renderQuestion()}

          <div className="wrapper-btn d-flex justify-content-between align-items-center">
            <span className={`a ${callingApi !== 'UpdateQuestion' ? '' : 'disable'}`} onClick={() => this.back(canBack, callingApi !== 'UpdateQuestion')}>
              {`<< Back`}
            </span>
            <button className={`btn btn-outline-info ${canSave ? '' : 'disable'}`} onClick={() => this.save(canSave)}>
              {`Lưu`}
            </button>
            <button className={`btn btn-info ${canAdd ? '' : 'disable'}`} onClick={() => this.add(canAdd)}>
              {`Thêm câu hỏi`}
            </button>
            <span className={`a ${canNext ? '' : 'disable'}`} onClick={() => this.next(canNext)}>
              {`Next >>`}
            </span>
          </div>
        </div>
      </React.Fragment>
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
    updateExam,
    callApiExam,
  }
)(UpdateQuestion));
























// var a = [{
//   id: 1,
//   name: 'abc',
//   option1: 'abc',
//   option2: '321',
//   option3: '42121521',
//   option4: '521',
//   correctAnswer: 'abc',
// },
// {
//   id: 2,
//   name: 'abc2',
//   option1: '412421',
//   option2: 'abc2',
//   option3: '412421',
//   option4: '412412',
//   correctAnswer: 'abc2',
// },
// {
//   id: 3,
//   name: 'abc4',
//   option1: '412421',
//   option2: '12412',
//   option3: '412421',
//   option4: 'abc4',
//   correctAnswer: 'abc4',
// }]


// var b = a.map(item => {
//   if (item.correctAnswer === item.option1) {
//     item.correctAnswer = 'option1';
//   }
//   if (item.correctAnswer === item.option2) {
//     item.correctAnswer = 'option2';
//   }
//   if (item.correctAnswer === item.option3) {
//     item.correctAnswer = 'option3';
//   }
//   if (item.correctAnswer === item.option4) {
//     item.correctAnswer = 'option4';
//   }
//   return item;
// })