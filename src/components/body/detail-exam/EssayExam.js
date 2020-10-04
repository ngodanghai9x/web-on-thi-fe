import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';



import { doExam, getDetailExam } from 'actions/examActions';
import MainContent from '../layout/MainContent';
import './styles/EssayExam.scss';
import { Redirect } from 'react-router';

class EssayExam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      examId: 0,
      name: '',
      image: '',
      subject: '',
      grade: '',
      description: '',
      examTime: 1 * 60,
      examTotalTime: 1 * 60,
      canDelete: '',
      examQuestions: [],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { subject, id } = match.params; // type, môn học
    this.fetchDetailExam(id);
  }

  fetchDetailExam = (_id) => {
    this.props.getDetailExam(_id, false).then(({ data, code, message }) => {
      if (data && code === 200) {
        const { id, name, image, subject, grade, description, time, canDelete, examQuestions } = data.exam;
        // console.log("MultipleChoiceExamResult -> fetchDetailExam -> exam", data.exam)
        this.setState({ examId: id, name, image, subject, grade, description, examTime: time, examTotalTime: time, canDelete, examQuestions });
      }
      if (code === 400) {
      }
    })
  }

  render() {
    const { accessToken, isDone } = this.props;
    const { examId, name, image, subject, grade, description, time, canDelete, examQuestions } = this.state;
    const data = examQuestions && examQuestions[0] && examQuestions[0].question || '';
    if (!accessToken && isDone) return <Redirect to='/' />
    return (
      <MainContent>
        <div className='EssayExam'>
          <div className="name">
            {name}
          </div>
          <div className="description">
            {description}
          </div>
          <div className="exam-detail" dangerouslySetInnerHTML={{ __html: data }}>

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
    isDone: auth.isDone,
  };
};

export default connect(
  mapStateToProps,
  {
    getDetailExam,
  },
)(EssayExam);
