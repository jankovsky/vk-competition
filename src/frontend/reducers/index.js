import { combineReducers } from 'redux';
import header from './header';
import user from './user';

export default combineReducers({
    header,
    user
});