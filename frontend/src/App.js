import logo from './logo.svg';
import React from 'react';
import axios from 'axios';
import './App.css';
import UserList from './components/User';
import Menu from './components/Menu';
import Footer from './components/Footer';
import ProjectList from './components/Project';
import TodoList from './components/Todo';
import {BrowserRouter, Route, Link} from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'users':[],
      'projects':[],
      'todos':[],
    }
  }


  componentDidMount() {
    axios.get("http://127.0.0.1:8000/api/users/").then(responce => {
      this.setState(
        {
          'users':responce.data
        }
      )
    }).catch(error => console.log(error))
    axios.get("http://127.0.0.1:8000/api/projects/").then(responce => {
      this.setState(
        {
          'projects':responce.data.results // project api using pagination class and all data is in .results part
        }
      )
    }).catch(error => console.log(error))
    axios.get("http://127.0.0.1:8000/api/todo/").then(responce => {
      this.setState(
        {
          'todos':responce.data.results // todo api using pagination class and all data is in .results part
        }
      )
    }).catch(error => console.log(error))
  }


  render() {
    return(
      <div>
        <Menu/>
        <BrowserRouter>
          <nav>
            <ul>
              <li><Link to="/">Users</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/todos">ToDos</Link></li>
            </ul>
          </nav>
              <Route exact path='/' component={() => <UserList users={this.state.users}/>} />
              <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}/>} />
              <Route exact path='/todos' component={() => <TodoList todos={this.state.todos} users={this.state.users} projects={this.state.projects}/>} />
        </BrowserRouter>
        <Footer/>
      </div>
    );
  }
}

export default App;
