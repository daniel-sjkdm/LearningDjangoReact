import React from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import './assets/css/App.css';
import Posts from './components/posts/Posts';
import Login from './components/accounts/Login';
import Register from './components/accounts/Register';
import Home from './components/Home';
import Navigation from './components/navigation/Navigation';
import Post from './components/posts/Post';



function App() {
  return (
    <div className="App"> 
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/posts" component={Posts} />
        <Route path="/posts/:id" component={Post}/>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  );
}

export default App;
