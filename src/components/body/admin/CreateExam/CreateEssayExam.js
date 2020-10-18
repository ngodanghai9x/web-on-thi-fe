
import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';
import CKEditor from 'ckeditor4-react';
import  {
  createExam,
  updateExam,
  callApiExam,
} from 'actions/examActions';
import { withRouter } from 'react-router';

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

  componentWillReceiveProps(nextProps) {
    const { question0 } = this.props;
    if (nextProps.question0 && nextProps.question0 !== question0) {
      this.setState({ question: nextProps.question0.question || ''})
    }

    if (!nextProps.callingApi && this.props.callingApi === 'CreateEssayExam') {
      nextProps.history.push('/admin');
    }
  }


  submit = e => {
    const { question0, exam1 } = this.props;
    const { name, image, subject, grade, description, time, id, isActive, canDelete, code } = exam1;
    const { question } = this.state;
    const obj = {
      question: question || '',
      option1: null,
      option2: null,
      option3: null,
      option4: null,
      correctAnswer: [],
      mode: 'Không xác định',
      type: 'essay',
      // subject,
      // grade,
      suggestion: null,
    };
    if (question0 && question0.id !== 0) {
      obj.id = question0.id;
    }
    const listQuestion = [obj];
    this.props.callApiExam('CreateEssayExam');
    if (id && question0) {
      return this.props.updateExam(exam1, listQuestion);
    }
    this.props.createExam(name, image, subject, grade, description, time, listQuestion, code);
  }

  onEditorChange = (evt) => {
    this.setState(state => ({
      question: evt.editor.getData(),
    }));
  }

  render() {
    const { isShow, question0 } = this.props;
    const { question } = this.state;
    if (!isShow) return null;
    return (
      <React.Fragment>
        <div className={`CreateEssayExam ${!isShow ? 'd-none' : ''}`}>
          <CKEditor
            data={question}
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
    createExam,
    updateExam,
    callApiExam,
  }
)(CreateEssayExam));