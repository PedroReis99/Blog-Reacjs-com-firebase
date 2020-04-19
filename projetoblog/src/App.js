import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Componentes/Home';
import Header from './Componentes/Header';
import Login from './Componentes/Login';
import Dashboard from './Componentes/Dashboard';
import Register from './Componentes/Register';
import New from './Componentes/New';
import Firebase from './firebase';

class App extends Component{

  state = {
    firebaseInitialized: false
  };

  componentDidMount(){
    Firebase.isInitialized().then(resultado => {
      //Altera de false para true a conexão com o firebase
      this.setState({ firebaseInitialized: resultado });
    });
  }

  render(){
    return this.state.firebaseInitialized !== false ? (
      <div>
        <BrowserRouter>
        <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard/new" component={New} />
          </Switch>
        </BrowserRouter>
      </div>
     ) : (
       <h1> Carregando ...</h1>
     );
  }
}

export default App;
