import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import Firebase from '../../firebase';
import './dashboard.css';

class Dashboard extends Component{

    constructor(props){
        super(props);
        this.state = {
            nome: localStorage.nome,
            email: 'Email'
        };
        this.logout = this.logout.bind(this);
    }

    async componentDidMount(){
        if(!Firebase.getCurrent()){
            this.props.history.replace('/login');
            return null;
        }

        Firebase.getUserName((info) => {
            localStorage.nome = info.val().nome;
            this.setState({ nome: localStorage.nome });   
        })
    }

    logout = async () => {
        await Firebase.logout()
        .catch((error)=>{
          console.log(error);
        });
        localStorage.removeItem("nome");
        this.props.history.push('/');
    
      }

    render(){
        return(
            <div id="dashboard">
                <div className="user-info">
                    <h1>Olá {this.state.nome}</h1>
                    <Link to="/dashboard/new">Novo Post</Link>
                </div>
                <p>Logado com: {Firebase.getCurrent()}</p>
                <button onClick={()=> this.logout()}>SAIR</button>
            </div>
        );
    }
}

export default withRouter(Dashboard);