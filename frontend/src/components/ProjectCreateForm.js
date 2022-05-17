import React from "react";

class ProjectForm extends React.Component {
    constructor(props) {
    super(props)
    this.state = {name: '', users: '', repository: ''}
    }
    handleChange(event){
        this.setState(
            {
            [event.target.name]: event.target.value
            }
        );
    }
    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.repository, this.state.users)
        event.preventDefault()
    }
    render() {
    return (
        <form onSubmit={(event)=> this.handleSubmit(event)}>
            <input type="text" name="name" placeholder="Название" value={this.state.name} onChange={(event)=>this.handleChange(event)} />
            <input type="url" name="repository" placeholder="Репозиторий" value={this.state.repository} onChange={(event)=>this.handleChange(event)} />
            <input type="text" name="users" placeholder="Пользователи" value={this.state.users} onChange={(event)=>this.handleChange(event)} />
            <input type="submit" value="Создать" />
        </form>
    );}
}
export default ProjectForm
