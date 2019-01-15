import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import './QuizList.sass';
import Loader from '../../components/UI/Loader/Loader';
import {connect} from 'react-redux';
import {fetchQuizes} from '../../store/actions/quiz';
class QuizList extends Component {

    // state = {
    //     quizes: [],
    //     loading: true // Добавляем прелоадер в состояние тру, пока все не прогрузится
    // };

    renderQuizes(){
        return this.props.quizes.map((quiz)=>{
            return(
                <li
                    key={quiz.id}

                >
                <NavLink to={'/quiz/' + quiz.id}>
                    {quiz.name}
                </NavLink>
                </li>
            )
        });
    }

    componentDidMount() {
        this.props.fetchQuizes()// тут логика загрузки тестов через редакс
    }

    render() {
        return (
            <div className={'QuizList'}>
                <div>
                    <h1>Список тестов</h1>
                    {this.props.loading && this.props.quizes.length !== 0
                        ? <Loader/>
                        : <ul>
                            {this.renderQuizes()}
                        </ul>} {/*если loading true, то выводим лоадер, если false, то список. Ждем ответа от сервера*/}


                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch){
    return{
        fetchQuizes: ()=>{dispatch(fetchQuizes())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);