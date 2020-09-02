import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Home from '../body/Home';
import ChooseSubjects from '../body/ChooseSubjects';
import ExamList from '../body/ExamList';
import MultipleChoiceExam from '../body/detail-exam/MultipleChoiceExam';
import EssayExam from '../body/detail-exam/EssayExam';
import MultipleChoiceResult from '../body/detail-exam/MultipleChoiceResult';


export default class RouterList extends React.Component {
  render() {
    return (
      <Switch>
        {/* <Route exact path="/" render={() => (<Redirect to="/home" />)} /> */}
        <Route exact path="/" component={Home} />
        <Route exact path="/lop-10" component={ChooseSubjects} />
        <Route exact path="/lop-10/:subject" component={ExamList} />
        <Route exact path="/lop-10/:subject/trac-nghiem/:id" component={MultipleChoiceExam} />
        <Route exact path="/lop-10/:subject/trac-nghiem/ket-qua" component={MultipleChoiceResult} />
        <Route exact path="/lop-10/:subject/tu-luan/:id" component={EssayExam} />
        <Route exact path="/dai-hoc" component={ChooseSubjects} />
        <Route exact path="/dai-hoc/:subject" component={ExamList} />
        {/* <Route exact path="/product/:id" component={ProductDetails} /> */}
      </Switch>
    )
  }
}