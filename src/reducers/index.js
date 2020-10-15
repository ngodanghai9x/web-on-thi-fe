import { combineReducers } from 'redux';
import auth from './auth';
import exam from './exam';
import question from './question';

export default combineReducers({
    auth,
    exam,
    question,
});