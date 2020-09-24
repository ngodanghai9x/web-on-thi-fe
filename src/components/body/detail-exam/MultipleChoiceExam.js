import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';




import MainContent from '../layout/MainContent';
import './styles/MultipleChoiceExam.scss';
import { Redirect } from 'react-router';
import { getMinute } from 'actions/common/utils';

class MultipleChoiceExam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      examId: 0,
      examTime: 2700, // 45 * 60
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { subjects } = match.params; // type, môn học
  }

  renderQuestion = (examQuestions) => {
    const opt = ['option1', 'option2', 'option3', 'option4'];
    return examQuestions.map((item, i) => {
      return (
        <React.Fragment>
          <div className="game-code-view">
            <div className="card-game-content" >
              <b>{`Câu ${i}: `}</b>
              <span dangerouslySetInnerHTML={{ __html: item.question }}>
                {/* {item.question} */}
              </span>
            </div>
            <div className="group-checkbox">
              {opt.map(option => {
                return (
                  <div className={`input-group-prepend 
                    ${item.correctAnswer && item[option] === item.correctAnswer ? 'true' : ''}
                    ${item.answer && item[option] === item.answer ? 'chosen' : ''}
                  `}
                  >
                    <div className="input-group-text">
                      <input type="radio" name={item.id} className="input-items"
                        onChange={() => { }}
                        onClick={() => this.choose(i, item.id, item[option])}
                        // onClick={() => this.setState({ [`Q${i}`]: { questionId: item.id, answer: item[option] } })}
                        readOnly checked={item[option] === this.state[`Q${i}`].answer}
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

  choose = (i, questionId, answer) => {
    this.setState({
      [`Q${i}`]: { questionId, answer, }
      // [`Q${i}`]: { questionId: item.id, answer: item[option] }
    })
  }

  submit = () => {
    const arrVal = Object.values(this.state);
    const examAnswer = arrVal.map(item => item && item.questionId && item.answer);

  }

  renderChoiceTable = (examQuestions) => {
    const opt = ['option1', 'option2', 'option3', 'option4'];
    const key = { option1: "A", option2: "B", option3: "C", option4: "D" };
    return examQuestions.map((item, i) => {
      return (
        <React.Fragment>
          <div className="abc d-flex">
            <div className="stt">{i}</div>
            {
              opt.map(option => {
                return (
                  <div className={`edf ${item[option] === this.state[`Q${i}`].answer ? 'active' : ''} `}
                    onClick={() => this.choose(i, item.id, item[option])}
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
    const { accessToken, examQuestions } = this.props;
    const { second } = this.state;
    if (!accessToken) return <Redirect to='/' />
    return (
      <MainContent>
        <div className="container MultipleChoiceExam">
          <div className="row">
            <div className="col-9">
              <div className="game-code-view">
                <div className="card-game-content" >
                  <b>Câu 1: </b>
                  Trong thí nghiệm của Y-âng về giao thoa ánh sáng, khoảng cách giữa hai khe là 1 mm, khoảng cách từ mặt phẳng chứa hai khe đến màn quan sát lúc đầu là 2 m. Nguồn sáng đơn sắc có bước sóng 750 nm.
                  Truyền cho màn vận tốc ban đầu hướng lại gần mặt phẳng hai khe để màn dao động điều hòa theo phương vuông góc với mặt phẳng hai khe với biên độ 40 cm và chu kì 6 s.
                  Thời gian kể từ lúc màn dao động đến khi điểm M trên màn cách vân trung tâm 19,8 mm cho vân sáng lần thứ 8 bằng
                </div>
                <div className="group-checkbox">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <input type="radio" className="input-items"></input>
                    </div>
                    <div className="input-content">
                      3 s
                                        </div>
                  </div>
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <input type="radio" className="input-items"></input>
                    </div>
                    <div className="input-content">
                      3,5 s
                                        </div>
                  </div>

                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <input type="radio" className="input-items"></input>
                    </div>
                    <div className="input-content">
                      2s
                                        </div>
                  </div>

                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <input type="radio" className="input-items"></input>
                    </div>
                    <div className="input-content">
                      3,375 s
                                        </div>
                  </div>
                </div>
              </div>
              {this.renderQuestion(examQuestions)}
            </div>

            <div className="col-3">
              <div className="multiple-choice">
                <div className="a123 d-flex">
                  <div >STT</div>
                  <div className="a123-number">0</div>
                  <div className="a123-number">0</div>
                  <div className="a123-number">1</div>
                  <div className="a123-number">0</div>
                </div>

                <div className="abc d-flex">
                  <div className="stt">2</div>
                  <div className="edf">A</div>
                  <div className="edf">B</div>
                  <div className="edf">C</div>
                  <div className="edf">D</div>
                </div>
                {this.renderChoiceTable(examQuestions)}
              </div>
              {/* <div className="btn-group"> */}
              <button type="button" class="btn btn-primary"
                onClick={() => this.submit()}
              >
                nộp bài
                </button>
              {/* </div> */}
              {getMinute(second)}
            </div>
          </div>
        </div>
      </MainContent>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const { auth } = state;
  return {
    user: auth.user,
    accessToken: auth.accessToken,
  };
};

export default connect(mapStateToProps)(MultipleChoiceExam);