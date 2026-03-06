import React from 'react'
import { LuUserCheck } from "react-icons/lu";
import { RiUserForbidLine } from "react-icons/ri";
import { LuUserRoundCog } from "react-icons/lu";
import { FaTicketAlt, FaPercent } from "react-icons/fa";
import { useEffect } from 'react';
import axios from "axios"
import { useState } from 'react';
import { SlUserFemale } from "react-icons/sl";
import { SlUser } from "react-icons/sl";
import { MdLocalOffer } from "react-icons/md";
import Swal from "sweetalert2";
import { FaTag } from "react-icons/fa"


export default function CodePromo() {
  const [codes, setCodes] = useState([])
  const [overlay, setOverlay] = useState(false)
  const [overlayItem, setOverlayItem] = useState({})
  const [code, setCode] = useState("")
  const [label, setLabel] = useState("")
  const [value, setValue] = useState("")

  useEffect(() => {
    axios.get("http://localhost:3006/promo")
      .then((res) => {
        setCodes(res.data)
      }).catch((err) => {
        console.log(err)
      })
  }, []);



  function activer(code) {
    axios.post("http://localhost:3006/activ-promo", { id: code })
      .then((res) => {
        if (res.data === "Mise à jour réussie !") {
          Swal.fire({
            title: "Succès",
            text: "Code promo activé",
            icon: "success",
            confirmButtonText: "OK",
            customClass: {
              confirmButton: "my-confirm-btn",
              title: "swal-title",
              htmlContainer: "swal-text"
            },
            buttonsStyling: false
          }).then(() => {
            window.location.reload();
          });;
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
  }


  function desactiver(code) {
    axios.post("http://localhost:3006/desac-promo", { id: code })
      .then((res) => {
        if (res.data === "Mise à jour réussie !") {
          Swal.fire({
            title: "Succès",
            text: "Code promo désactivé",
            icon: "success",
            confirmButtonText: "OK",
            customClass: {
              confirmButton: "my-confirm-btn",
              title: "swal-title",
              htmlContainer: "swal-text"
            },
            buttonsStyling: false
          }).then(() => {
            window.location.reload();
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
  }

  function submit(e) {
    e.preventDefault()
    console.log(code, label, value)


    axios.post("http://localhost:3006/insert-promo", { code: code, label: label, value: value })
      .then((res) => {
        if (res.data === "existant") {
          Swal.fire({
            title: "Error",
            text: "Code promo existant",
            icon: "error",
            confirmButtonText: "OK",
            customClass: {
              confirmButton: "my-confirm-btn",
              title: "swal-title",
              htmlContainer: "swal-text"
            },
            buttonsStyling: false
          })
        } else if (res.data === "ajoute") {
          Swal.fire({
            title: "Succès",
            text: "Code promo ajouté avec succès.",
            icon: "success",
            confirmButtonText: "OK",
            customClass: {
              confirmButton: "my-confirm-btn",
              title: "swal-title",
              htmlContainer: "swal-text"
            },
            buttonsStyling: false
          }).then(() => {
            window.location.reload();
          });
        }
        else {
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
  }



  return (
    <div className='dashboard promo'>

      {
        overlay && (
          <div className="overlay" onClick={() => setOverlay(false)}>
            <div className="overlay-card" onClick={(e) => e.stopPropagation()}>

              <div className="user">
                <div className="icon-sexe">
                  <FaTicketAlt className='i' />
                </div>
                <div className="user-name">
                  <h3> {overlayItem.code} </h3>
                  <div><span>{overlayItem.value + " %"}</span></div>
                </div>
              </div>
              <div className="hr"></div>
              <div className="user-info">
                <div><h4>Date :</h4><span>
                  {new Date(overlayItem.created_at).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </span></div>
                <div className='status'><h4>Status :</h4>{overlayItem.is_active == 1 ? (<span className="paid">Actif</span>) : (<span className="expired">Inactif</span>)}</div>
                <div className='action'> {overlayItem.is_active === 1 ? (<button className='desac' onClick={() => desactiver(overlayItem.id)}>Désativer</button>) : (<button className='activ' onClick={() => activer(overlayItem.id)}>Activer</button>)} </div>
              </div>

              <button className='submit' onClick={() => setOverlay(null)}>Fermer</button>

            </div>
          </div>
        )
      }
      <div className="header">
        <h4>Codes promos</h4>
      </div>
      <div className="content">
        <table>
          <thead>
            <tr>
              <th className='col1'>N°</th>
              <th className='col3'>Code promo</th>
              <th className='col2'>Label</th>
              <th className='col4'>Valeur</th>
              <th className='col6'>Créé le</th>
              <th className='col7'>status</th>
            </tr>
          </thead>
          <tbody>
            {codes.map((item, key) => {
              return (
                <tr key={key} onClick={() => { setOverlay(true); setOverlayItem(codes.filter((i) => i.id === item.id)[0]) }}>
                  <td>{item.id}</td>
                  <td>{item.code}</td>
                  <td>{item.label}</td>
                  <td>{item.value + " %"}</td>
                  <td>{new Date(item.created_at).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                  </td>
                  <td className='status'>{item.is_active == 1 ? (<span className="paid">Actif</span>) : (<span className="expired">Inactif</span>)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="header">
        <h4>Ajouter un code promo</h4>
      </div>
      <form action="" onSubmit={submit}>
        <div className="content">
          <div className="content1">
            <div className="input">
              <div><FaTicketAlt className='i' /></div>
              <input type="text" name="" id="" placeholder='code promo' value={code} onChange={(e) => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))} required />
            </div>
          </div>
          <div className="content1">
            <div className="input">
              <div><FaTag className='i' /></div>
              <input type="text" name="" id="" placeholder='label' onChange={(e) => setLabel(e.target.value)} required />
            </div>
          </div>
          <div className="content1">
            <div className="input">
              <div><FaPercent className='i' /></div>
              <input type="number" name="" id="" placeholder='valeur' onChange={(e) => setValue(e.target.value)} required />
            </div>
          </div>

          <button type='submit'>Ajouter</button>
        </div>
      </form>


    </div>
  )
}

