
import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';

import CKEditor from 'ckeditor4-react';
// import './styles/CreateExam.scss';

class CreateQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentObj: {
        number: 0,
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer: 'option1',
      },
      questionList: [],
    };
  }

  componentDidMount() {
    // this.setState(state => ({ questionList: [...state.questionList, state.currentObj],}));
  }

  onEditorChange = (evt) => {
    this.setState(state => ({
      currentObj: {
        ...state.currentObj,
        question: evt.editor.getData()
      }
    }));
  }

  onChangeMax255 = (key, val, error) => {
    if (val && val.length >= 255) {
      this.setState(state => ({
        currentObj: {
          ...state.currentObj,
          [error]: 'Bạn nhập quá 255 kí tự'
        }
      }));
      return window.noti.error('Bạn nhập quá 255 kí tự');
    }
    else {
      this.setState(state => ({
        currentObj: {
          ...state.currentObj,
          [key]: val,
        }
      }));
    }
  }

  back = (can) => {
    console.log('can', can);
    if (!can) return;
    this.setState(state => ({
      // questionList: state.currentObj.number === state.questionList.length ? [...state.questionList, state.currentObj] : state.questionList,
      currentObj: state.questionList[state.currentObj.number - 1]
    }));
  }

  next = (can) => {
    console.log('can', can);
    if (!can) return;
    this.setState(state => ({
      // questionList: state.currentObj.number === state.questionList.length ? [...state.questionList, state.currentObj] : state.questionList,
      currentObj: state.questionList[state.currentObj.number + 1]
    }));
  }

  save = (can) => {
    console.log('can', can);
    if (!can) return;
    this.setState(state => ({
      currentObj: state.questionList[state.currentObj.number]
    }));
  }

  add = (can) => {
    const obj = {
      number: this.state.questionList.length + 1,
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: 'option1',
    }
    console.log('can', can);
    debugger
    if (!can) return;
    this.setState(state => ({
      currentObj: {
        number: state.currentObj.number === state.questionList.length ? state.questionList.length +1 : state.questionList.length ,
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer: 'option1',
      },
      questionList: state.currentObj.number !== state.questionList.length ? state.questionList : [...state.questionList, state.currentObj],
    }));
  }

  renderQuestion = () => {
    const { questionList, currentObj: { number, question, option1, option2, option3, option4, answer } } = this.state;
    const canBack = questionList.length > 1 && number > 0;
    const canNext = questionList.length < 50 && number < 49;
    const canAdd = questionList.length < 50 && number > 0;
    const canSave = questionList.length > 1 && number > 0;
    return (
      <div className="wrapper-question">
        <h6 className="title-left">
          {`Câu ${number + 1}`}
        </h6>
        <div className="question d-flex">
          <div className="left">
            <CKEditor
              data={question || ''}
              onChange={e => this.onEditorChange(e)}
              config={{
                height: 68,
                resize_maxHeight: 320,
                resize_minHeight: 172,
              }}
            />
          </div>
          <div className="right  d-flex justify-content-between flex-column">
            {[1, 2, 3, 4].map(item => (
              <div className="row-option d-flex justify-content-between align-items-center">
                <input type="radio" name="radio-btn-exam"
                  checked={`option${item} === ${answer}`}
                  onChange={() => this.setState({ currentObj: { answer: `option${item}` } })}
                />
                <div className="text">
                  {`Lựa chọn ${item}`}
                </div>
                <input type="text"
                  className=""
                  onChange={(e) => this.onChangeMax255(`option${item}`, e.target.value, `option${item}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { questionList, currentObj: { number, question, option1, option2, option3, option4, answer } } = this.state;
    const canBack = questionList.length > 1 && number > 0;
    const canNext = number < questionList.length - 1;
    const canAdd = questionList.length < 50 && number < 50;
    const canSave = questionList.length > 1 && number > 0;
    return (
      <React.Fragment>
        <div className="CreateQuestion">
          {this.renderQuestion()}

          <div className="wrapper-btn d-flex justify-content-between align-items-center">
            <span className="a" onClick={() => this.back(canBack)}>
              {`<< Back`}
            </span>
            <button className="btn btn-outline-info" onClick={() => this.save(canSave)}>
              Lưu
            </button>
            <button className="btn btn-info" onClick={() => this.add(canAdd)}>
              Thêm câu hỏi
            </button>
            <span className="a" onClick={() => this.next(canNext)}>
              {`Next >>`}
            </span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


export default CreateQuestion;