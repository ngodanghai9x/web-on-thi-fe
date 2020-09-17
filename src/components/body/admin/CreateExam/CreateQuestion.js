
import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';

import CKEditor from 'ckeditor4-react';
// import './styles/CreateExam.scss';

class CreateQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '<p>React is really <em>nice</em>!</p>',
      currentObj: {},
      questionList: [{
        number: 0,
        question: '<p>Nhập câu hỏi</p>',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        
      }],
    };
  }

  onEditorChange = (evt) => {
    this.setState({
      data: evt.editor.getData()
    });
  }

  renderQuestion = () => {
    return (
      <div className="wrapper-question">
        <h6 className="title-left">
          Câu 1
            </h6>
        <div className="question d-flex">
          <div className="left">
            <CKEditor
              data={this.state.data || ''}
              onChange={e => this.onEditorChange(e)}
              config={{
                height: 68,
                resize_maxHeight: 320,
                resize_minHeight: 172,
              }}
            />
          </div>
          <div className="right  d-flex justify-content-between flex-column">
            <div className="row-option d-flex justify-content-between align-items-center">
              <input type="checkbox"
                checked
                onChange={() => { }}
                title="Đánh dấu đáp án đúng"
              />
              <div className="text">
                Đáp án A
                  </div>
              <input type="text"
                className=""
              />
            </div>
            <div className="row-option d-flex justify-content-between align-items-center">
              <input type="checkbox"
                checked
                onChange={() => { }}
              />
              <div className="text">
                Đáp án A
                  </div>
              <input type="text"
                className=""
              />
            </div>
            <div className="row-option d-flex justify-content-between align-items-center">
              <input type="checkbox"
                checked
                onChange={() => { }}
              />
              <div className="text">
                Đáp án A
                  </div>
              <input type="text"
                className=""
              />
            </div>
            <div className="row-option d-flex justify-content-between align-items-center">
              <input type="checkbox"
                checked
                onChange={() => { }}
              />
              <div className="text">
                Đáp án A
                  </div>
              <input type="text"
                className=""
              />
            </div>

          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="CreateQuestion">

          <button className="btn btn-info">Thêm câu hỏi</button>
        </div>
      </React.Fragment>
    );
  }
}


export default CreateQuestion;