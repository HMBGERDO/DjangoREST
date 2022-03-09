import React from "react";

const UserItems = ({user}) => {
    return(
        <tr>
            <td>
                {user.username}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    );
}

const UserList = ({users}) => {
    return(
        <table>
            <th>
                Username
            </th>
            <th>
                Email
            </th>
            {users.map((user) => <UserItems user={user}/>)}
        </table>
    );
}

export default UserList