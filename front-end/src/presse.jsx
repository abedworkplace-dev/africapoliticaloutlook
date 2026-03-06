import React from 'react'
import { LuUserCheck } from "react-icons/lu";
import { RiUserForbidLine } from "react-icons/ri";
import { LuUserRoundCog } from "react-icons/lu";
import { FaTicketAlt } from "react-icons/fa";
import { useEffect } from 'react';
import axios from "axios"
import { useState } from 'react';
import { SlUserFemale } from "react-icons/sl";
import { SlUser } from "react-icons/sl";
import { FaIdBadge } from "react-icons/fa";


export default function Presse() {
  const [presse, setPresse] = useState([])
  const [overlay, setOverlay] = useState(false)
  const [overlayItem, setOverlayItem] = useState({})

  useEffect(() => {
    axios.get("https://africapoliticaloutlook.vercel.app/presse")
      .then((res) => {
        setPresse(res.data)
      }).catch((err) => {
        console.log(err)
      })
  }, []);



  return (
    <div className='dashboard presse'>

      {
        overlay && (
          <div className="overlay" onClick={() => setOverlay(false)}>
            <div className="overlay-card" onClick={(e) => e.stopPropagation()}>

              <div className="user">
                <div className="icon-sexe">
                 < FaIdBadge className='i' />
                </div>
                <div className="user-name">
                  <h3> {overlayItem.nom} </h3>
                  <div><span>{overlayItem.fonction}</span></div>
                  <div><span>{overlayItem.media}</span></div>
                </div>
              </div>
              <div className="hr"></div>
              <div className="user-info">
                <div><h4>Email :</h4><span>{overlayItem.email}</span></div>
                <div><h4>Téléphone :</h4><span>{overlayItem.tel}</span></div>
                <div><h4>Message :</h4><span>{overlayItem.message}</span></div>
                <div><h4>Date :</h4><span>
                  {new Date(overlayItem.created_at).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </span></div>
              </div>

              <button className='submit' onClick={() => setOverlay(null)}>Fermer</button>

            </div>
          </div>
        )
      }
      <div className="header">
        <h4>Accréditation presse</h4>
      </div>
      <div className="content">
        <table>
          <thead>
            <tr>
              <th className='col1'>N°</th>
              <th className='col2'>Nom</th>
              <th className='col4'>Email</th>
              <th className='col3'>Téléphone</th>
              <th className='col6'>Fonction</th>
              <th className='col7'>Média</th>
            </tr>
          </thead>
          <tbody>
            {presse.length > 0 ? (
              presse.map((item, key) => {
                return (
                  <tr key={key} onClick={() => { setOverlay(true); setOverlayItem(presse.filter((i) => i.id === item.id)[0]) }}>
                    <td>{item.id}</td>
                    <td className='nom'><span>{item.nom }</span></td>
                    <td className='pays'>{item.email}</td>
                    <td>{item.tel}</td>
                    <td>{item.fonction}</td>
                    <td>{item.media}</td>
                  </tr>
                )
              })
            ) : (
              <tr className="empty">
                <td colSpan="6">Aucune accréditation presse n'a été délivrée</td>
              </tr>

            )}
          </tbody>
        </table>
      </div>

    </div>
  )
}

