import logo from './logo.svg';
import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import AuthorList from './components/Author';
import UserList from './components/User';
import Menu from './components/Menu';
import Footer from './components/Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'authors':[],
      'users':[],
    }
  }


  componentDidMount() {
    const authors = [
      // {
      //   'first_name':'testfn',
      //   'last_name':'testln',
      //   'birthday_year':1990,
      // },
      // {
      //   'first_name':'testfn1',
      //   'last_name':'testln1',
      //   'birthday_year':1990,
      // },
    ]
    axios.get("http://127.0.0.1:8000/api/authors/").then(responce => {
      this.setState(
        {
          'authors':responce.data
        }
      )
    }).catch(error => console.log(error))
    axios.get("http://127.0.0.1:8000/api/users/").then(responce => {
      this.setState(
        {
          'users':responce.data
        }
      )
    }).catch(error => console.log(error))
  }


  render() {
    return(
      <div>
        <Menu/>
        <AuthorList authors={this.state.authors}/>
        <UserList users={this.state.users}/>
        <Footer/>
      </div>
    );
  }
}

export default App;
