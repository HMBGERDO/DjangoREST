import React from "react";
import {BrowserRouter, Route, Link} from 'react-router-dom';

const ProjectItems = ({project, deleteProject}) => {
    return(
        <tr>
            <td>
                {project.id}
            </td>
            <td>
                {project.name}
            </td>
            <td>
                <button onClick={() => deleteProject(project.id)} type='button'>Удалить</button>
            </td>
        </tr>
    );
}

const ProjectList = ({projects, deleteProject}) => {
    return(
        <table>
            <th>
                Id
            </th>
            <th>
                Project
            </th>
            <th>
            </th>
            <Link to="/projects/create">Создать</Link>
            {projects.map((project) => <ProjectItems project={project} deleteProject={deleteProject}/>)}
        </table>
    );
}

export default ProjectList