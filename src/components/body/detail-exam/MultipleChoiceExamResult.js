import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';



import {
  doExam,
  getDetailExam,
  getResultExam,
} from 'actions/examActions';
import MainContent from '../layout/MainContent';
import './styles/MultipleChoiceExam.scss';
import { Redirect, withRouter } from 'react-router';
import { getMinute } from 'actions/common/utils';

class MultipleChoiceExamResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.timeInterval = null;
  }

  componentDidMount() {
    const { match } = this.props;
    const { subject, id } = match.params; // type, môn học
    this.props.getResultExam(id);
  }

  componentWillReceiveProps() {
    if (false) {
      this.setState({ examId: 1, })
    }
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  renderQuestion = (examQuestions) => {
    if (!examQuestions) return null;
    const opt = ['option1', 'option2', 'option3', 'option4'];
    return examQuestions.map((item, i) => {
      return (
        <React.Fragment>
          <div className="game-code-view">
            <div className="card-game-content" >
              <span dangerouslySetInnerHTML={{ __html: `<b>Câu ${i + 1}: </b>${item.question}` }}>
                {/* {item.question} */}
              </span>
            </div>
            <div className="group-checkbox">
              {opt.map(option => {
                if (!item[option]) return null;
                return (
                  <div className={`input-group-prepend 
                  ${item.correctAnswer && item.correctAnswer.includes(item[option]) ? 'true' : ''}
                  ${item.answer && item.answer.includes(item[option]) ? 'active' : ''}
                  `}
                  >
                    <div className="input-group-text">
                      <input type={item.type === 'one' ? 'radio' : 'checkbox'} className="input-items disable"
                        // name={item.id}
                        onChange={() => { }} readOnly
                        checked={item.answer && item.answer.includes(item[option])}

                      />
                    </div>
                    <div className="input-content">
                      {item[option]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </React.Fragment>
      );
    })
  }


  renderChoiceTable = (examQuestions) => {
    if (!examQuestions) return null;
    const opt = ['option1', 'option2', 'option3', 'option4'];
    const key = { option1: "A", option2: "B", option3: "C", option4: "D" };
    return examQuestions.map((item, i) => {
      return (
        <React.Fragment>
          <div className="abc d-flex">
            <div className="stt">{i + 1}</div>
            {
              opt.map(option => {
                if (!item[option]) return null;
                return (
                  <div className={`edf disable
                    ${item.correctAnswer && item.correctAnswer.includes(item[option]) ? 'true' : ''}
                    ${item.answer && item.answer.includes(item[option]) ? 'active' : ''}
                    `}
                  // ${item.answer && item[option] === item.answer ? 'active' : ''}
                  // ${this.state[`Q${i}`] && option === this.state[`Q${i}`].answerOP ? 'active' : ''}
                  >
                    {key[option]}
                  </div>
                )
              })
            }
          </div>
        </React.Fragment>
      );
    })
  }

  render() {// file này là trang bài làm
    const { accessToken, result, match, location, isDone, } = this.props;
    const { id, subject } = match.params;
    const backPath = location.pathname.replace('/chi-tiet', '');
    const { questionResult } = result;
    const numOptionPicked = result.numOptionPicked || [0, 0, 0, 0];
    const { examTime } = this.state;
    const arrVal = Object.values(this.state);
    const numOption1 = arrVal.filter(item => item && item.questionId && item.answer && item.answerOP === 'option1');
    const numOption2 = arrVal.filter(item => item && item.questionId && item.answer && item.answerOP === 'option2');
    const numOption3 = arrVal.filter(item => item && item.questionId && item.answer && item.answerOP === 'option3');
    const numOption4 = arrVal.filter(item => item && item.questionId && item.answer && item.answerOP === 'option4');
    if (!accessToken && isDone) return <Redirect to='/' />
    if (subject === 'van') {
      if (location.pathname.includes('lop-10')) {
        return <Redirect to={`/lop-10/mon/van/${id}`} />
      }
      return <Redirect to={`/dai-hoc/mon/van/${id}`} />
    }
    return (
      <MainContent>
        <div className="container MultipleChoiceExam">
          <div className="row">
            <div className="col-9">
              {this.renderQuestion(questionResult)}
            </div>

            <div className="col-3">
              <div className="multiple-choice">
                <div className="result-timer" style={{ textAlign: 'center', margin: '8px auto' }}>
                  {getMinute(result.doTime)}
                </div>
                <div className="a123 d-flex">
                  <div className="a123-stt">STT</div>
                  {numOptionPicked.map(num => ((
                    <div className="a123-number">{num}</div>
                  )))}
                  {/* <div className="a123-number">{numOption2 ? numOption2.length : 0}</div>
                  <div className="a123-number">{numOption3 ? numOption3.length : 0}</div>
                  <div className="a123-number">{numOption4 ? numOption4.length : 0}</div> */}
                </div>
                <div className="wrapper-table-choice list-overflow-auto">
                  {this.renderChoiceTable(questionResult)}
                </div>
              </div>
              {/* <div className="btn-group"> */}
              <button type="button" className="btn btn-primary submit-btn" onClick={() => this.props.history.push(backPath)}
              >
                Quay lại
              </button>
              {/* </div> */}
            </div>
          </div>
        </div>
      </MainContent>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const { auth, exam: { result } } = state;
  return {
    user: auth.user,
    accessToken: auth.accessToken,
    result: result || {},
    isDone: auth.isDone,
  };
};

export default withRouter(connect(mapStateToProps, {
  doExam,
  getDetailExam,
  getResultExam,
})(MultipleChoiceExamResult));