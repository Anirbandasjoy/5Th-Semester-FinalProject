import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3001/user/profile', {
                    headers: {
                        Authorization: token,
                    },
                });

                if (Array.isArray(response.data.user)) {
                    setData(response.data.user);
                } else if (typeof response.data.user === 'object' && response.data.user !== null) {
                    setData([response.data.user]);
                } else {
                    setData([]);
                }

            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();
    }, []);


    return (
        <div className=''>

            <h1 onClick={() => navigate("/todo")} style={{ textAlign: "end", marginRight: ".5rem", fontSize: "1rem", cursor: "pointer" }}>back</h1>

            {data.map((user) => (
                <div key={user.id} className=''>
                    <img className='rounded-full m-auto w-32 h-32' src={user.image} alt="image" />
                    <h1>{user.name}</h1>
                    <h1>{user.email}</h1>
                    <h1>{user.phone}</h1>
                </div>
            ))}
        </div>
    );
};

export default Profile;


