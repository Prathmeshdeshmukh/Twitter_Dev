import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const UserPlaceHolder = ({ userData, setUserData }) => {
    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.get(`/user/find/${id}`);
                setUserData(data.data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [id])
    return (
        <div>{userData?.username}</div>
    )
}

export default UserPlaceHolder