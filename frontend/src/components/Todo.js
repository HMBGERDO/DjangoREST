import React from "react";
import {BrowserRouter, Route, Link} from 'react-router-dom';

const TodoItem = ({todo, author, project, deleteTodo}) => {
    return(
        <tr>
            <td>
                {project.name}
            </td>
            <td>
                {author.username}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.created_at}
            </td>
            <td>
                {todo.updated_at}
            </td>
            <td>
                {todo.active}
            </td>
            <td>
                <button onClick={() => deleteTodo(todo.id)} type='button'>Удалить</button>
            </td>
        </tr>
    );
}

const TodoList = ({todos, users, projects, deleteTodo}) => {
    return(
        <table>
            <th>
                Project
            </th>
            <th>
                Author
            </th>
            <th>
                Text
            </th>
            <th>
                Created at
            </th>
            <th>
                Updated at
            </th>
            <th>
                Status
            </th>
            <Link to="/todo/create">Создать</Link>
            {todos.map((todo) => {
                let author = users.find((user) => user.id === todo.author);
                let project = projects.find((project) => project.id === todo.project);
                return <TodoItem todo={todo} author={author} project={project} deleteTodo={deleteTodo}/>
            })}
        </table>
    );
}

export default TodoList