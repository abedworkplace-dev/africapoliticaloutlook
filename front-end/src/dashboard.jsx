import React from 'react'
import { LuUserCheck } from "react-icons/lu";
import { RiUserForbidLine } from "react-icons/ri";
import { LuUserRoundCog } from "react-icons/lu";
import { FaTicketAlt } from "react-icons/fa";
import { useEffect } from 'react';
import axios from "axios"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {
  const navigation = useNavigate()
  const [inscription,setInscription]=useState([])
  const [inscriptionToday,setInscriptionToday]=useState([])

  useEffect(() => {
    axios.get("http://localhost:3006/inscription")
      .then((res) => {
        const today = new Date();
        setInscription(res.data)
        setInscriptionToday(res.data.filter((item)=> new Date((item.created_at).replace(" ", "T")).getTime()===today.getTime()))
      }).catch((err) => {
        console.log(err)
      })
  }, []);



  return (
    <div className='dashboard'>
      <div className="header">
        <h4>Dashboard</h4>
      </div>
      <div className="content">
        <div className="content1">
          <div class="horaire">Aujourd'hui</div>
          <div className="cards">
            <div className="card reussi" onClick={()=>navigation("/sidebar/inscription-reussie")}>
              <div className="nbr">
                <span> {(inscriptionToday.filter((item)=>item.status=="paid")).length} </span>
                <h5>Inscriptions réussie</h5>
              </div>
              <div className="icon">
                <LuUserCheck className='i' />
              </div>
            </div>
            <div className="card n-finalise" onClick={()=>navigation("/sidebar/inscription-non-finalisee")}>
              <div className="nbr">
                <span>{(inscriptionToday.filter((item)=>item.status==="pending" || item.status==="expired")).length}</span>
                <h5>Inscriptions incomplètes</h5>
              </div>
              <div className="icon">
                <LuUserRoundCog className='i' />
              </div>
            </div>
            <div className="card promo">
              <div className="nbr">
                 <span>{(inscriptionToday.filter((item)=>item.promo==="1")).length}</span>
                <h5>Inscriptions promo</h5>
              </div>
              <div className="icon">
                <FaTicketAlt className='i' />
              </div>
            </div>
          </div>
        </div>
        <div className="content1">
          <div class="horaire">Total</div>
          <div className="cards">
            <div className="card reussi" onClick={()=>navigation("/sidebar/inscription-reussie")}>
              <div className="nbr">
                <span> {(inscription.filter((item)=>item.status=="paid")).length} </span>
                <h5>Inscriptions réussies</h5>
              </div>
              <div className="icon">
                <LuUserCheck className='i' />
              </div>
            </div>
            <div className="card n-finalise" onClick={()=>navigation("/sidebar/inscription-non-finalisee")} >
              <div className="nbr">
                <span>{(inscription.filter((item)=>item.status==="pending" || item.status==="expired")).length}</span>
                <h5>Inscriptions incomplètes</h5>
              </div>
              <div className="icon">
                <LuUserRoundCog className='i' />
              </div>
            </div>
            <div className="card promo">
              <div className="nbr">
                <span>{(inscriptionToday.filter((item)=>item.promo==="1")).length}</span>
                <h5>Inscriptions promo</h5>
              </div>
              <div className="icon">
                <FaTicketAlt className='i' />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
