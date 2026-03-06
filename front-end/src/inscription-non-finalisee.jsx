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


export default function InscriptionNonFinalisee() {
  const [inscription, setInscription] = useState([])
  const [overlay, setOverlay] = useState(false)
  const [overlayItem, setOverlayItem] = useState({})

  useEffect(() => {
    axios.get("https://africapoliticaloutlook.vercel.app/inscription")
      .then((res) => {
        //setInscription(res.data.filter((item) => item.status == "pending" || item.status == "expired" || item.status == "canceled"))
        const statusList = ["pending", "expired", "canceled"];

        // Regrouper tous les statuts par email
        const emailStatuses = {};
        res.data.forEach(item => {
          if (!emailStatuses[item.email]) {
            emailStatuses[item.email] = new Set();
          }
          emailStatuses[item.email].add(item.status);
        });

        // Filtrer uniquement ceux qui :
        // 1️⃣ ont un statut dans statusList
        // 2️⃣ n’ont jamais de statut 'paid'
        // 3️⃣ ont strictement un seul statut parmi statusList
        const result = res.data.filter(item => {
          const statuses = emailStatuses[item.email];
          return (
            statusList.includes(item.status) &&
            !statuses.has("paid") &&
            [...statuses].every(s => statusList.includes(s)) &&
            statuses.size === 1
          );
        });

        setInscription(result);
      }).catch((err) => {
        console.log(err)
      })
  }, []);



  return (
    <div className='dashboard'>

      {
        overlay && (
          <div className="overlay" onClick={() => setOverlay(false)}>
            <div className="overlay-card" onClick={(e) => e.stopPropagation()}>

              <div className="user">
                <div className="icon-sexe">
                  {overlayItem.sexe === "Homme" ? <SlUser className='i' /> : <SlUserFemale className='i' />}
                </div>
                <div className="user-name">
                  <h3> {overlayItem.nom + " " + overlayItem.prenoms} </h3>
                  <div><span>{overlayItem.fonction + ", " + overlayItem.institution}</span></div>
                  <div><span>{overlayItem.secteur}</span></div>
                </div>
              </div>
              <div className="hr"></div>
              <div className="user-info">
                <div><h4>Nationalité :</h4><span>{overlayItem.nationalite}</span></div>
                <div><h4>Pays :</h4><span>{overlayItem.pays}</span></div>
                <div><h4>Ville :</h4><span>{overlayItem.ville}</span></div>
                <div><h4>Email :</h4><span>{overlayItem.email}</span></div>
                <div><h4>Téléphone :</h4><span>{overlayItem.tel}</span></div>
                <div><h4>Code postal :</h4><span>{overlayItem.code_postal}</span></div>
                <div><h4>Adresse :</h4><span>{overlayItem.adresse}</span></div>
                <div><h4>Adresse pro :</h4><span>{overlayItem.adresse_pro}</span></div>
                <div><h4>Déjà participé :</h4><span>{overlayItem.deja_participe}</span></div>
                <div><h4>Source :</h4><span>{overlayItem.source}</span></div>
                <div><h4>Besoin :</h4><span>{overlayItem.besoin != null ? overlayItem.besoin : "-"}</span></div>
                <div><h4>Promo :</h4><span>{overlayItem.promo != 0 ? overlayItem.besoin : "-"}</span></div>
                <div><h4>Code promo :</h4><span>{overlayItem.code_promo != null ? overlayItem.code_promo : "-"}</span></div>
                <div><h4>Réduction :</h4><span>{overlayItem.promo_value != 0 ? overlayItem.promo_value + "%" : "-"}</span></div>
                <div className='status'><h4>Status :</h4><span className={overlayItem.status == "paid" ? "paid" : overlayItem.status == "expired" ? "expired" : overlayItem.status == "pending" ? "pending" : "expired"}>{overlayItem.status}</span></div>
                <div><h4>Montant :</h4><span>{overlayItem.amount_value + " " + overlayItem.currency}</span></div>
                <div><h4>Pass :</h4><span>{overlayItem.passlabel}</span></div>
                <div><h4>Days :</h4><span>{overlayItem.days}</span></div>
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
        <h4>Inscriptions Incomplètes</h4>
      </div>
      <div className="content">
        <table>
          <thead>
            <tr>
              <th className='col1'>N°</th>
              <th className='col2'>Inscrits</th>
              <th className='col3'>Pays</th>
              <th className='col4'>Email</th>
              <th className='col6'>Intitution</th>
              <th className='col7'>status</th>
            </tr>
          </thead>
          <tbody>
            {inscription.map((item, key) => {
              return (
                <tr key={key} onClick={() => { setOverlay(true); setOverlayItem(inscription.filter((i) => i.id === item.id)[0]) }}>
                  <td>{key + 1}</td>
                  <td className='nom'> <div className="icon">{item.sexe === "Homme" ? <SlUser className='i' /> : <SlUserFemale className='i' />}</div><span>{item.nom + " " + item.prenoms}</span></td>
                  <td className='pays'>{item.pays}</td>
                  <td>{item.email}</td>
                  <td>{item.institution}</td>
                  <td className='status'><span className={item.status == "paid" ? "paid" : item.status == "expired" ? "expired" : item.status == "pending" ? "pending" : "expired"}>{item.status}</span></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

    </div>
  )
}

