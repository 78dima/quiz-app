import React, {Component} from 'react';
import './Auth.sass';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import is from 'is_js';
import connect from "react-redux/es/connect/connect";
import {auth} from "../../store/actions/auth";

class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный e-mail',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    };

    loginHandler = ()=>{ // Вход пользователя
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        );
    };
    registerHandler = ()=>{ // Регистрация пользователя
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        );
   };

    submitHandler = (e)=>{
        e.preventDefault();
    };

    validateControl(value, validation){
        if(!validation){
            return true;
        }

        let isValid = true;
        if(validation.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(validation.email){
            isValid = is.email(value) && isValid;
        }
        if(validation.minLength){
            isValid = value.length >= validation.minLength && isValid;
        }

        return isValid;
    }

    onChangeHandler = (e, controlName)=>{ // Функция для изменения стейта
        const formControls = {...this.state.formControls}; // получаем копию стейта
        const control = { ...formControls[controlName] };
        control.value = e.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);
        formControls[controlName] = control;

        let isFormValid = true;
        Object.keys(formControls).forEach((name) =>{
           isFormValid = formControls[name].valid && isFormValid
        });

        this.setState({
            formControls: formControls,
            isFormValid: isFormValid
        });
    };

    renderInputs(){ // Функция для генерации инпутов из стейта, сначала мы возвращаем массив из обьекта по ключам, затем методом map перебираем
        return Object.keys(this.state.formControls).map((controlName, index)=>{
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    label={control.label}
                    valid={control.valid}
                    touched={control.touched}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={(e)=>this.onChangeHandler(e, controlName)}
                />
            )
        });
    };

    render() {
        return (
            <div className={"Auth"}>
                <div className={"Auth__item"}>
                    <h1 className={"Auth__title"}>Авторизация</h1>
                    <form className={"Auth__form"} onSubmit={this.submitHandler}>

                        {this.renderInputs()}

                        <div className={"Button__wrap-btn"}>
                            <Button
                                type="success"
                                onClick={this.loginHandler}
                                disabled={!this.state.isFormValid}
                            >Войти</Button>
                            <Button
                                type="primary"
                                onClick={this.registerHandler}
                                disabled={!this.state.isFormValid}
                            >Регистрация</Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return{
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps) (Auth);
