import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Firebase from '../../firebase';
import './new.css';

class New extends Component{

    constructor(props){
        super(props);
        this.state = {
            titulo: '',
            imagem: null,
            url: '',
            descricao: '',
            alert: '',
            progress: 0
        }
        this.cadastrarPost = this.cadastrarPost.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    async componentDidMount(){
        if(!Firebase.getCurrent()){
            this.props.history.replace('/login');
            return null;
        }
    }


    handleFile = async (e) => {
        if(e.target.files[0]){
            const image = e.target.files[0];

            if(image.type === 'image/png' || image.type === 'image/jpeg'){
                await this.setState({ imagem: image});
                this.handleUpload();
            }else{
                alert('Envien imagens do tipo png ou jpg');
                this.setState({imagem: null});
                return null;
            }
            
        }
    }
    
    handleUpload = async () => {
        const { imagem } = this.state;
        const currentUid = Firebase.getCurrentUid();

        const uploadTaks = Firebase.storage
            .ref(`images/${currentUid}/${imagem.name}`)
                .put(imagem);

        await uploadTaks.on('state_changed', (snapshot) => {
            //progresso
            const progress = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            this.setState({progress});
        }, (error) => {
            //Erro
            console.log(imagem + error);
        }, () => {
            //Sucesso!
            Firebase.storage.ref(`images/${currentUid}`)
                .child(imagem.name).getDownloadURL()
                    .then( url => {
                        this.setState({ url: url });
                    });
        });
    }

    cadastrarPost = async (e) => {
        e.preventDefault();

        if(this.state.titulo !== '' && this.state.url !== '' && this.state.descricao !== ''
                && this.state.imagem !== null){
            let post = Firebase.app.ref('posts');
            let chave = post.push().key;

            await post.child(chave).set({
                titulo: this.state.titulo,
                imagem: this.state.url,
                descricao: this.state.descricao,
                autor: localStorage.nome
            });

            this.props.history.push('/dashboard');
        } else{
            this.setState({ alert: 'Preencha todos os campos!' });
        }
    }

    render(){
        return(
            <div>
                <header id="new">
                    <Link to="/dashboard">Voltar</Link>
                </header>
                <form onSubmit={this.cadastrarPost} id="new-post">
                    <span>{this.state.alert}</span>

                    <label>Imagem:</label><br />
                    <input type="file" onChange={this.handleFile} /> <br />
                    {this.state.url !== '' ?
                        <img src={this.state.url} alt="Capa do post" />
                        :
                        <progress value={this.state.progress} max="100" />
                    }
                    
                    <label>Titulo:</label><br />
                    <input type="text" placeholder="Digite o titulo do post" value={this.state.titulo} autoFocus
                        onChange={(e) => this.setState({ titulo: e.target.value })} /> <br />
                    <label>Descrição:</label><br />
                    <textarea type="text" placeholder="Digite a descrição do post" value={this.state.descricao} 
                        onChange={(e) => this.setState({ descricao: e.target.value })} /> <br />

                    <button type="submit" >Cadastrar</button>
                </form>
            </div>
        );
    }
}

export default withRouter(New);