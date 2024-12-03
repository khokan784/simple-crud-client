import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Users = () => {
    const loadedUser = useLoaderData()
    const [users, setUser] = useState(loadedUser)

    const handleDelete = _id => {
        console.log('delete',_id);
        fetch(`http://localhost:5000/users/${_id}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.deletedCount > 0){
                alert('deleted successfully')
                const remainingUser = users.filter(user => user._id !== _id);
                setUser(remainingUser);
            }
        })
    }
    return (
        <div>
            <h1>users : {users.length}</h1>
            {
                users.map(user => <p key={user._id}>{user.name}: {user.email}: {user._id} 
                <Link to={`/update/${user._id}`}>
                    <button>Update</button>
                </Link>
                <button onClick={()=> handleDelete(user._id)}>X</button>
                </p>)
            }
        </div>
    );
};

export default Users;