import React from 'react'
import { LuUserCheck } from "react-icons/lu";
import { RiUserForbidLine } from "react-icons/ri";
import { LuUserRoundCog } from "react-icons/lu";
import { FaTicketAlt } from "react-icons/fa";
import { useEffect } from 'react';
import axios from "axios"
import { useState } from 'react';
import { IoEye, IoEyeOff } from "react-icons/io5";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';


export default function Password() {
  const navigation = useNavigate()
  const [inscription, setInscription] = useState([])
  const [inscriptionToday, setInscriptionToday] = useState([])

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    axios.get("https://africapoliticaloutlook.vercel.app/inscription")
      .then((res) => {
        const today = new Date();
        setInscription(res.data)
        setInscriptionToday(res.data.filter((item) => new Date((item.created_at).replace(" ", "T")).getTime() === today.getTime()))
      }).catch((err) => {
        console.log(err)
      })
  }, []);


  function submit(e) {
    e.preventDefault()
    axios.get("https://africapoliticaloutlook.vercel.app/")
      .then((ress) => {
        const result = ress.data.filter((user) => user.role == JSON.parse(localStorage.getItem("admin#token")).role && user.password === oldPassword)
        if (result.length > 0) {
          if (newPassword === confirmPassword) {
            axios.post("https://africapoliticaloutlook.vercel.app/newPassword", { mdp: newPassword, role: JSON.parse(localStorage.getItem("admin#token")).role })
              .then((res) => {
                if (res.data === "Mise à jour réussie !") {
                  Swal.fire({
                    title: "Succès",
                    text: "Mot de passe changé avec succès.",
                    icon: "success",
                    confirmButtonText: "OK",
                    customClass: {
                      confirmButton: "my-confirm-btn",
                      title: "swal-title",
                      htmlContainer: "swal-text"
                    },
                    buttonsStyling: false
                  }).then(() => {
                    navigation("/sidebar/dashboard");
                  });
                } else {
                  Swal.fire({
                    title: "Erreur",
                    text: "Veuillez réessayer plus tard.",
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
              }).catch((err) => {
                console.log(err)
              })
          } else {
            Swal.fire({
              title: "Erreur",
              text: "Les deux codes ne correspondent pas.",
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
        } else {
          Swal.fire({
            title: "Erreur",
            text: "Mot de passe incorrect",
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
    <div className='dashboard password'>
      <div className="header">
        <h4>Modification de mot de passe</h4>
      </div>
      <form action="" onSubmit={submit}>
        <div className="content">
          <div className="content1">
            <div className="input">
              <div onClick={() => setShowOld(!showOld)} >{showOld ? <IoEyeOff className="i" /> : <IoEye className="i" />}</div>
              <input type={showOld ? 'text' : 'password'} name="" id="" placeholder='ancien password' onChange={(e) => setOldPassword(e.target.value)} required />
            </div>
          </div>
          <div className="content1">
            <div className="input">
              <div onClick={() => setShowNew(!showNew)} >{showNew ? <IoEyeOff className="i" /> : <IoEye className="i" />}</div>
              <input type={showNew ? 'text' : 'password'} name="" id="" placeholder='ancien password' onChange={(e) => setNewPassword(e.target.value)} required />
            </div>
            <div className="input">
              <div onClick={() => setShowConfirm(!showConfirm)} >{showConfirm ? <IoEyeOff className="i" /> : <IoEye className="i" />}</div>
              <input type={showConfirm ? 'text' : 'password'} name="" id="" placeholder='ancien password' onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
          </div>

          <button type='submit'>Modifier</button>
        </div>
      </form>

    </div>
  )
}
