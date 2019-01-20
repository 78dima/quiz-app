import React from 'react';
import {NavLink} from "react-router-dom";
import './Drawer.sass';
import Backdrop from '../../UI/Backdrop/Backdrop';

class Drawer extends React.Component{

    linkCloseHandler(){
        this.props.isClose();
    };

    renderLinks(links){
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
        const links = [
            {to: '/', label: 'Список', exact: true}
        ];

        if(this.props.isAuthenticated){
            links.push({to: '/quiz-creator', label: 'Создание квиза', exact: false});
            links.push({to: '/logout', label: 'Выйти', exact: false});
        }else{
            links.push({to: '/auth', label: 'Авторизация', exact: false});
        }
        return(
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop isClose={this.props.isClose}/> : null}
            </React.Fragment>
        )
    }

}

export default Drawer;