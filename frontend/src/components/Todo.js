import React from "react";

const TodoItem = ({todo, author, project}) => {
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
        </tr>
    );
}

const TodoList = ({todos, users, projects}) => {
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
            {todos.map((todo) => {
                let author = users.find((user) => user.id === todo.author);
                let project = projects.find((project) => project.id === todo.project);
                return <TodoItem todo={todo} author={author} project={project}/>
            })}
        </table>
    );
}

export default TodoList