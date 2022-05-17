import logo from './logo.svg';
import React from 'react';
import axios from 'axios';
import './App.css';
import UserList from './components/User';
import Menu from './components/Menu';
import Footer from './components/Footer';
import ProjectList from './components/Project';
import TodoList from './components/Todo';
import LoginForm from './components/Auth';
import ProjectForm from './components/ProjectCreateForm';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Cookies from 'universal-cookie';
import TodoForm from './components/ToDoCreateForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'users':[],
      'projects':[],
      'todos':[],
      'token':'',
    }
  }

  deleteProject(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers, headers})
      .then(responce => {
        this.load_data()
      }).catch(error => console.log(error))
  }

  createProject(name, repo, users) {
    const headers = this.get_headers()
    const data = {name: name, repo: repo, users: [users]}
    axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers, headers})
      .then(responce => {
        this.load_data()
      }).catch(error => console.log(error))
  }

  deleteTodo(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, {headers, headers})
    .then(responce => {
      this.load_data()
    }).catch(error => console.log(error))
  }

  createTodo(project, author, text) {
    const headers = this.get_headers()
    const data = {project: project, author: author, text: text}
    axios.post(`http://127.0.0.1:8000/api/todo/`, data, {headers, headers})
      .then(responce => {
        this.load_data()
      }).catch(error => console.log(error))
  }

  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({'token': token}, () => this.load_data())
  }

  is_authenticated() {
    return this.state.token !== ''
  }

  logout() {
    this.set_token('')
    const cookies = new Cookies()
    cookies.remove('token')
  }

  get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    this.setState({'token': token}, () => this.load_data())
  }
    
  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
    .then(response => {
    this.set_token(response.data['token'])
    }).catch(error => alert('Неверный логин или пароль'))
  }

  get_headers() {
    let headers = {
    'Content-Type': 'application/json'
    }
    if (this.is_authenticated())
      {
      headers['Authorization'] = 'Token ' + this.state.token
      }
    return headers
  }

  load_data() {
    const headers = this.get_headers()
    axios.get("http://127.0.0.1:8000/api/users/", {headers}).then(responce => {
      this.setState(
        {
          'users':responce.data.results
        }
      )
    }).catch(error => console.log(error))
    axios.get("http://127.0.0.1:8000/api/projects/", {headers}).then(responce => {
      this.setState(
        {
          'projects':responce.data.results // project api using pagination class and all data is in .results part
        }
      )
    }).catch(error => console.log(error))
    axios.get("http://127.0.0.1:8000/api/todo/", {headers}).then(responce => {
      this.setState(
        {
          'todos':responce.data.results // todo api using pagination class and all data is in .results part
        }
      )
    }).catch(error => console.log(error))
  }

  componentDidMount() {
    this.get_token_from_storage()
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
              <li><Link to="/todo">ToDos</Link></li>
              <li>{this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> : <Link to='/auth'>Login</Link>}</li>
            </ul>
          </nav>
              <Route exact path='/' component={() => <UserList users={this.state.users}/>} />
              <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)} />} />
              <Route exact path='/todo' component={() => <TodoList todos={this.state.todos} users={this.state.users} projects={this.state.projects} deleteTodo={(id) => this.deleteTodo(id)}/>} />
              <Route exact path='/auth' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)}/>} />
              <Route exact path='/projects/create' component={() => <ProjectForm createProject={(name, repo, users) => this.createProject(name, repo, users)}/>} />
              <Route exact path='/todo/create' component={() => <TodoForm createTodo={(project, author, text) => this.createTodo(project, author, text)}/>} />
        </BrowserRouter>
        <Footer/>
      </div>
    );
  }
}

export default App;
