import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Home from '../body/Home';
import ChooseSubjects from '../body/ChooseSubjects';
import ExamList from '../body/ExamList';
import MultipleChoiceExam from '../body/detail-exam/MultipleChoiceExam';
import EssayExam from '../body/detail-exam/EssayExam';
import MultipleChoiceResult from '../body/detail-exam/MultipleChoiceResult';
import Register from '../body/Register';
import UserInfo from '../body/user/UserInfo';
import Test from '../body/admin/Test';
import Login from 'components/body/account/Login';
import ForgotPassword from 'components/body/account/ForgotPassword';
import ChangePassword from 'components/body/account/ChangePassword';


export default class RouterList extends React.Component {
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


        <Route exact path="/lop-10" component={ChooseSubjects} />
        <Route exact path="/lop-10/:subject" component={ExamList} />
        <Route exact path="/lop-10/toan/trac-nghiem1/:id" component={MultipleChoiceExam} />
        <Route exact path="/lop-10/toan/trac-nghiem/ket-qua" component={MultipleChoiceResult} />
        <Route exact path="/lop-10/:subject/tu-luan/:id" component={EssayExam} />
        <Route exact path="/dai-hoc" component={ChooseSubjects} />
        <Route exact path="/dai-hoc/:subject" component={ExamList} />


        <Route exact path="/admin" component={ExamList} />

      </Switch>
    )
  }
}