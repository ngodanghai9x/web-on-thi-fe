
import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';
import CKEditor from 'ckeditor4-react';
import { createExam } from 'actions/examActions';

class CreateEssayExam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
    };
  }

  back = () => {
    this.props.changeStep(1);
  }

  submit = e => {
    const { name, image, subject, level, description, time } = this.props.exam1;
    const { question0 } = this.props;
    const { question } = this.state;
    const listQuestion = [{
      image: null,
      question: question || question0 ? question0.question : '',
      option1: null,
      option2: null,
      option3: null,
      option4: null,
      correctAnswer: null,
      suggestion: null,
    }];

    this.props.createExam(name, image, subject, level, description, time, listQuestion);
  }

  render() {
    const { isShow, question0 } = this.props;
    const { question } = this.state;
    return (
      <React.Fragment>
        <div className={`CreateEssayExam ${!isShow ? 'd-none' : ''}`}>
          <CKEditor
            data={(question0 ? question0.question : question) || ''}
            // data={''}
            onChange={e => this.onEditorChange(e)}
            config={{
              height: 234,
              resize_maxHeight: 600,
              resize_minHeight: 334,
            }}
          />
          <div className="wrapper-action d-flex justify-content-center align-items-center">
            <span className="a" onClick={() => this.back()}>
              {`<< Quay lại`}
            </span>
            <button className="btn btn-info" onClick={() => this.submit()}>
              Lưu
          </button>
          </div>
        </div>
      </React.Fragment>


    );
  }
}

export default connect(
  null,
  {
    createExam,
  }
)(CreateEssayExam);