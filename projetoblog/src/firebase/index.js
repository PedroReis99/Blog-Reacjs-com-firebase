import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';


let firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };

class Firebase{
    constructor(){
        app.initializeApp(firebaseConfig);

        this.app = app.database();
        this.storage = app.storage();
    }

    login(email, password){
        return app.auth().signInWithEmailAndPassword(email, password);
    }

    logout(){
        return app.auth().signOut();
    }

    async register(nome, idade, email, password){
        await app.auth().createUserWithEmailAndPassword(email, password);

        const uid = app.auth().currentUser.uid;

        return app.database().ref('usuarios').child(uid).set({
            nome: nome,
            idade: idade
        });
    }

    isInitialized(){
        return new  Promise(resolve => {
            app.auth().onAuthStateChanged(resolve);
        });
    }

    getCurrent(){
        return app.auth().currentUser && app.auth().currentUser.email;
    }

    getCurrentUid(){
        return app.auth().currentUser && app.auth().currentUser.uid;
    }

    //Pega a ID do usuario
    async getUserName(callBack){
        if(!app.auth().currentUser){
            return  null;
        }

        const uid = app.auth().currentUser.uid;

        await app.database().ref('usuarios').child(uid)
            .once('value').then(callBack);
    }
}

export default new Firebase();