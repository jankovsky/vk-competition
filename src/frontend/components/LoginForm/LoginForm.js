import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './LoginForm.sass';

export default class LoginForm extends React.Component {

    constructor (props) {
        super(props);
        this.mode = 'login';
        this.state = {
            mode: 'login'
        };
    }

    triggerMode (mode) {
        this.setState({
            mode: mode
        });
    }

    render () {
        return (
            <div className={"b-login-form " + "m-" + this.state.mode}>
                <div className="b-login-form__login">
                    <h2 className="b-login-form__head">Login Form</h2>
                    <TextField
                        hintText=""
                        floatingLabelText="Email"
                        fullWidth={true}
                    />
                    <br/>
                    <TextField
                        hintText=""
                        floatingLabelText="Пароль"
                        type="password"
                        fullWidth={true}
                    />
                    <br/>
                    <RaisedButton label="Войти" secondary={true} />
                    <br/>
                    <span className="b-login-form__mode" onClick={this.triggerMode.bind(this, 'registration')}>Регистрация</span>
                </div>

                <div className="b-login-form__registration">
                    <h2 className="b-app__head">Регистрация</h2>
                    <p>Введите ваш email и придумайте пароль</p>
                    <TextField
                        hintText=""
                        floatingLabelText="Email"
                        fullWidth={true}
                    />
                    <br/>
                    <TextField
                        hintText=""
                        floatingLabelText="Пароль"
                        type="password"
                        fullWidth={true}
                    />
                    <br/>
                    <RaisedButton label="Зарегистрироваться" secondary={true} />
                    <br/>
                    <span className="b-login-form__mode" onClick={this.triggerMode.bind(this, 'login')}>Уже зарегистрирован</span>
                </div>
            </div>
        );
    }
}