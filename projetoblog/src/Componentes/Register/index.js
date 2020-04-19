import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Firebase from '../../firebase';
import './register.css';

class Register extends Component {

    constructor(props){
        super(props);
            this.state = {
                nome: '',
                idade: '',
                email: '',
                password: ''
            };
            this.cadastrar = this.cadastrar.bind(this);
            this.onRegister = this.onRegister.bind(this);
    }

    cadastrar(e){
        e.preventDefault();
        this.onRegister();
    }

    onRegister = async () => {
        try {
            const { nome , idade, email, password } = this.state;

            await Firebase.register(nome, idade, email, password);
            this.props.history.replace('/dashboard');
        } catch (error) {
            alert(error.message);
        }
    }
    
  render() {
    return (
        <div>
            <h1 className="register-h1">Novo usuario</h1>
            <form onSubmit={this.cadastrar} id="register" >
                <label>Nome:</label><br />
                <input type="text" value={this.state.nome} autoFocus autoComplete="off" placeholder="Digite seu nome"
                    onChange={ (e)=>this.setState({nome: e.target.value}) }/><br />
                <label>Idade:</label><br />
                <input type="text" value={this.state.idade} autoComplete="off" placeholder="Digite sua idade"
                    onChange={(e) => this.setState({ idade: e.target.value })} /><br />
                <label>Email:</label><br />
                <input type="Email" value={this.state.email} autoComplete="off" placeholder="email@email.com"
                    onChange={(e) => this.setState({ email: e.target.value })} /><br />
                <label>Senha:</label><br />
                <input type="password" value={this.state.password} autoComplete="off" placeholder="Digite sua senha"
                    onChange={(e) => this.setState({ password: e.target.value })} /><br />
                
                <button type="submit">Cadastrar-se</button> 
            </form>
        </div>
    );
  }
}

export default withRouter(Register);