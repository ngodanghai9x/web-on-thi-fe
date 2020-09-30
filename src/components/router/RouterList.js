import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';


import { logout, changeLayout, init } from 'actions/userActions';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Home from '../body/Home';
import ChooseSubjects from '../body/ChooseSubjects';
// import ExamList from '../body/ExamList';

import MultipleChoiceExam from '../body/detail-exam/MultipleChoiceExam';
import EssayExam from '../body/detail-exam/EssayExam';
import MultipleChoiceResult from '../body/detail-exam/MultipleChoiceResult';
import Register from '../body/Register';
import UserInfo from '../body/user/UserInfo';
import Test from '../body/admin/Test';
import Login from 'components/body/account/Login';
import ForgotPassword from 'components/body/account/ForgotPassword';
import ChangePassword from 'components/body/account/ChangePassword';
import AdminHome from 'components/body/admin/AdminHome';
import CollegeExamList from 'components/body/home-content/CollegeExamList';
import CreateExam from 'components/body/admin/CreateExam/CreateExam';
import ChooseSubjects2 from 'components/body/ChooseSubjects2';
import HighSchoolExamList from 'components/body/home-content/HighSchoolExamList';
import UpdateExam from 'components/body/admin/UpdateExam/UpdateExam';
import MultipleChoiceExamResult from 'components/body/detail-exam/MultipleChoiceExamResult';


class RouterList extends React.Component {
  componentDidMount() {
    this.props.init();
  }
  render() {
    return (
      <Switch>
        <Route exact path="/test" component={Test} />
        <Route exact path="/dang-ky" component={Register} />
        <Route exact path="/dang-nhap" component={Login} />
        <Route exact path="/quen-mat-khau" component={ForgotPassword} />
        <Route exact path="/doi-mat-khau" component={ChangePassword} />
        {/* <Route exact path="/" render={() => (<Redirect to="/home" />)} /> */}
        <Route exact path="/" component={Home} />
        <Route exact path="/thong-tin-ca-nhan" component={UserInfo} />


        <Route exact path="/lop-10/" component={ChooseSubjects} />
        <Route exact path="/lop-10/:subject" component={HighSchoolExamList} />
        <Route exact path="/lop-10/:subject/:id" component={MultipleChoiceExam} />
        <Route exact path="/lop-10/:subject/ket-qua/:id" component={MultipleChoiceResult} />
        <Route exact path="/lop-10/van/:id" component={EssayExam} />

        <Route exact path="/dai-hoc/" component={ChooseSubjects2} />
        <Route exact path="/dai-hoc/:subject" component={CollegeExamList} />
        <Route exact path="/dai-hoc/:subject/:id" component={MultipleChoiceExam} />
        <Route exact path="/dai-hoc/:subject/ket-qua/:id" component={MultipleChoiceResult} />
        <Route exact path="/dai-hoc/:subject/ket-qua/:id/chi-tiet" component={MultipleChoiceExamResult} />
        <Route exact path="/dai-hoc/van/:id" component={EssayExam} />

        <Route exact path="/admin" component={AdminHome} />
        <Route exact path="/admin/create-exam" component={CreateExam} />
        <Route exact path="/admin/update-exam/:id" component={UpdateExam} />

      </Switch>
    )
  }
}

export default connect(
  null,
  {
    init,
  }
)(RouterList);