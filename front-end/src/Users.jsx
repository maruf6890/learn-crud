import  { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Users = () => {
    // Load initial users data and set it to state
    const initialUsers = useLoaderData();
    const [users, setUsers] = useState(initialUsers);

    // Handle form submission to add a new user
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value, // Use correct password field
        };

        console.log('Submitting user:', data);

        fetch('http://localhost:5000/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((res) => res.json())
        .then((newUser) => {
            console.log('User added:', newUser);
            if (newUser.insertedId) {
                setUsers([...users, { ...data, _id: newUser.insertedId }]);
                alert("User added successfully!");
                e.target.reset();
            }
        })
        .catch((error) => {
            console.error('Error adding user:', error);
            alert("Failed to add user. Please try again.");
        });
    };

    // Handle deletion of a user
    const handleDelete = (_id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            fetch(`http://localhost:5000/users/${_id}`, {
                method: "DELETE",
            })
            .then((res) => res.json())
            .then((data) => {
                console.log('Delete response:', data);
                if (data.deletedCount > 0) {
                    setUsers(users.filter(user => user._id !== _id));
                    alert("User deleted successfully!");
                }
            })
            .catch((error) => {
                console.error('Error deleting user:', error);
                alert("Failed to delete user. Please try again.");
            });
        }
    };

    return (
        <div>
            <h3 className="text-3xl">Add User</h3>
            
            <form onSubmit={handleSubmit} className="w-4/12 my-10">
                <label className="input input-bordered flex items-center gap-2 my-3">
                    Name
                    <input type="text" name="name" className="grow" placeholder="Luffy" required />
                </label>
                <label className="input input-bordered flex items-center gap-2 my-3">
                    Email
                    <input type="email" name="email" className="grow" placeholder="luffy@gmail.com" required />
                </label>
                <label className="input input-bordered flex items-center gap-2 my-3">
                    Password
                    <input type="password" name="password" className="grow" required />
                </label>
                
                <input type="submit" value="Submit" className="btn btn-warning btn-outline"/>
            </form>

            <div className="all-users my-10">
                <h3 className="text-3xl text-green-700 my-5">Users {users.length}</h3>
                {users.map((user) => (
                    <p key={user._id} className="my-5">
                        {user.name} 
                        <Link to={`/users/${user._id}`} className="btn btn-sm btn-info">Update</Link>
                        <button onClick={() => handleDelete(user._id)} className="btn btn-info btn-sm">x</button>
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Users;
