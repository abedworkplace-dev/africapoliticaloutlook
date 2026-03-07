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
import { useNavigate } from 'react-router-dom';


export default function CodePromo() {
  const [codes, setCodes] = useState([])
  const navigation = useNavigate()

  useEffect(() => {
    axios.get("https://africapoliticaloutlook.vercel.app/promo")
      .then((res) => {
        setCodes(res.data)
      }).catch((err) => {
        console.log(err)
      })
  }, []);



  function activer(code) {
    axios.post("https://africapoliticaloutlook.vercel.app/activ-promo", { id: code })
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
    axios.post("https://africapoliticaloutlook.vercel.app/desac-promo", { id: code })
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



  return (
    <div className='dashboard promo'>
      <div className="header">
        <h4>Codes promos</h4>
        {JSON.parse(localStorage.getItem("admin#token")).role=="super-admin"?(<button onClick={()=>navigation("/sidebar/ajout-code-promo")}>Ajouter</button>):""}
        
      </div>
      <div className="content">
        <table>
          <thead>
            <tr>
              <th className='col1'>N°</th>
              <th className='col3'>Code promo</th>
              <th className='col2'>Label</th>
              <th className='col4'>Valeur</th>
              <th className='col7'>status</th>
              <th className='col6'>Action</th>
            </tr>
          </thead>
          <tbody>
            {codes.map((item, key) => {
              return (
                <tr key={key} /*onClick={() => { setOverlay(true); setOverlayItem(codes.filter((i) => i.id === item.id)[0]) }}*/>
                  <td>{item.id}</td>
                  <td>{item.code}</td>
                  <td>{item.label}</td>
                  <td>{item.value + " %"}</td>
                  <td className='status'>{item.is_active == 1 ? (<span className="paid">Actif</span>) : (<span className="expired">Inactif</span>)}
                  </td>
                   {JSON.parse(localStorage.getItem("admin#token")).role=="super-admin"?(<td className='action'>{item.is_active === 1 ? (<button className='desac' onClick={() => desactiver(item.id)}>Désativer</button>) : (<button className='activ' onClick={() => activer(item.id)}>Activer</button>)}</td>):<td className='action'></td>}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>


    </div>
  )
}

