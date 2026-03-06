import React from 'react'
import { FaUser } from "react-icons/fa6";
import { GiUnlocking } from "react-icons/gi";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import Swal from "sweetalert2";
import { useEffect } from 'react';

export default function Login() {
    const navigation = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (localStorage.getItem("admin#token") == null) {

        } else {
            navigation("/sidebar/dashboard")
        }
    }, []);

    function submit(e) {
        e.preventDefault()
        axios.get("http://localhost:3006/")
            .then((res) => {
                const result = res.data.filter((user) => user.email === email && user.password === password)
                if (result.length > 0) {
                    if (result[0].role === "super-admin") {
                        axios.get("http://localhost:3006/token")
                            .then((res) => {
                                localStorage.setItem("admin#token", JSON.stringify({ token: res.data, role: "super-admin" }));
                                navigation("/sidebar/dashboard")
                            }).catch((err) => {
                                console.log(err)
                            })
                    } else {
                        axios.get("http://localhost:3006/token")
                            .then((res) => {
                                localStorage.setItem("admin#token", JSON.stringify({ token: res.data, role: "admin" }));
                                navigation("/sidebar/dashboard")
                            }).catch((err) => {
                                console.log(err)
                            })
                    }
                } else {
                    Swal.fire({
                        title: "Erreur",
                        text: "Email ou mot de passe incorrect",
                        icon: "error",
                        confirmButtonText: "OK",
                        customClass: {
                            confirmButton: "my-confirm-btn",
                            title: "swal-title",
                            htmlContainer: "swal-text"
                        },
                        buttonsStyling: false
                    });
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <div>
            <div className="login">
                <div className="logo">
                    <img src="/images/logo-1.png" alt="" />
                </div>
                <div className="forms">
                    <h4>Connexion</h4>
                    <form action="" onSubmit={submit}>
                        <div className="input">
                            <div>< FaUser className='i' /></div>
                            <input type="email" name="" id="" placeholder='ex@gmail.com' onChange={(e) => setEmail(e.target.value)} required />

                        </div>
                        <div className="input">
                            <div><GiUnlocking className='i' /></div>
                            <input type="password" name="" id="" placeholder='***' onChange={(e) => setPassword(e.target.value)} required />
                        </div>


                        <button type='submit'>Se connecter</button>

                    </form>
                </div>
            </div>
        </div>
    )
}
