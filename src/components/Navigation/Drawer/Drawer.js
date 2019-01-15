import React from 'react';
import {NavLink} from "react-router-dom";
import './Drawer.sass';
import Backdrop from '../../UI/Backdrop/Backdrop';
const links = [
    {to: '/', label: 'Список', exact: true},
    {to: '/auth', label: 'Авторизация', exact: false},
    {to: '/quiz-creator', label: 'Создание квиза', exact: false}
];

class Drawer extends React.Component{

    linkCloseHandler(){
        this.props.isClose();
    };

    renderLinks(){
        return links.map((link, index)=>{
            return(
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={'active'}
                        onClick={this.linkCloseHandler.bind(this)} /* Создает область видимости статичной функции и вызывает ее */
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        });
    }

    render(){

        const cls = ['Drawer'];
        if(!this.props.isOpen){
            cls.push('close');
        }

        return(
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop isClose={this.props.isClose}/> : null}
            </React.Fragment>
        )
    }

}

export default Drawer;