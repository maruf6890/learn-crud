import { useLoaderData } from "react-router-dom";
import { useState } from "react";

const Update = () => {
    const user = useLoaderData();
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        password: user.password
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);
         fetch(`http://localhost:5000/users/${user._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.modifiedCount > 0) {
                alert("User updated successfully");
            }
        })
        .catch(error => {
            console.error("Error updating user:", error);
            alert("Failed to update user. Please try again.");
        }); 
    };

    return (
        <div>
            <h3 className="text-3xl">Update user data {user.name}</h3>
            
            <form onSubmit={handleSubmit} className="w-4/12 my-10">
                <label className="input input-bordered flex items-center gap-2 my-3">
                    Name
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        className="grow" 
                        required 
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2 my-3">
                    Email
                    <input 
                        type="email" 
                        name="email"  
                        value={formData.email} 
                        onChange={handleInputChange} 
                        className="grow" 
                        
                        required 
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2 my-3">
                    Password
                    <input 
                        type="password" 
                        name="password"  
                        value={formData.password} 
                        onChange={handleInputChange} 
                        className="grow" 
                        required 
                    />
                </label>
                
                <input type="submit" value="Submit" className="btn btn-warning btn-outline"/>
            </form>
        </div>
    );
};

export default Update;
