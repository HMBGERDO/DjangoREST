import React from "react";

class TodoForm extends React.Component {
    constructor(props) {
    super(props)
    this.state = {project: '', author: '', text: ''}
    }
    handleChange(event){
        this.setState(
            {
            [event.target.name]: event.target.value
            }
        );
    }
    handleSubmit(event) {
        this.props.createTodo(this.state.project, this.state.author, this.state.text)
        event.preventDefault()
    }
    render() {
    return (
        <form onSubmit={(event)=> this.handleSubmit(event)}>
            <input type="text" name="project" placeholder="Проект" value={this.state.name} onChange={(event)=>this.handleChange(event)} />
            <input type="text" name="author" placeholder="Автор" value={this.state.repository} onChange={(event)=>this.handleChange(event)} />
            <input type="text" name="text" placeholder="Текст" value={this.state.users} onChange={(event)=>this.handleChange(event)} />
            <input type="submit" value="Создать" />
        </form>
    );}
}
export default TodoForm
