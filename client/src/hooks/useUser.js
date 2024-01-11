import { useEffect, useState } from "react";

export default function useUser() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState([]);
    const login = async (userinfo) => {
        setUser(userinfo);
    };
    function me() {
        fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/me`, {
            method: "GET",
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.user) {
                    setUser(data.user);
                    setTasks(data.user.tasks);
                }
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }
    useEffect(() => {
        me();
    }, []);

    const logout = () => {
        fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/logout`, {
            credentials: "include"
        })
            .then((res) => {
                if (res.ok) {
                    setUser(null);;
                }
            })
            .catch((err) => console.log(err))
    }

    return {
        user,
        setUser,
        login,
        tasks,
        setTasks,
        logout,
        me,
        loading
    }
}