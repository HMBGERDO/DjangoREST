import React from "react";

const ProjectItems = ({project}) => {
    return(
        <tr>
            <td>
                {project.name}
            </td>
        </tr>
    );
}

const ProjectList = ({projects}) => {
    return(
        <table>
            <th>
                Project
            </th>
            {projects.map((project) => <ProjectItems project={project}/>)}
        </table>
    );
}

export default ProjectList