import React from 'react'
import { LuUserCheck } from "react-icons/lu";
import { RiUserForbidLine } from "react-icons/ri";
import { LuUserRoundCog } from "react-icons/lu";
import { FaTicketAlt } from "react-icons/fa";
import { useEffect } from 'react';
import axios from "axios"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers } from "react-icons/fa";


export default function Dashboard() {
  const navigation = useNavigate()
  const [inscription, setInscription] = useState([])
  const [inscriptionToday, setInscriptionToday] = useState([])

  useEffect(() => {
    axios.get("https://africapoliticaloutlook.vercel.app/inscription")
      .then((res) => {
        const today = new Date();
        setInscription(res.data)

        const result = res.data.filter(item => {
          const itemDate = new Date(item.created_at.replace(" ", "T"));

          return (
            itemDate.getFullYear() === today.getFullYear() &&
            itemDate.getMonth() === today.getMonth() &&
            itemDate.getDate() === today.getDate()
          );
        });

        setInscriptionToday(result);
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
            <div className="card reussi" onClick={() => navigation("/sidebar/inscription-reussie")}>
              <div className="nbr">
                <span> {(inscriptionToday.filter((item) => item.status == "paid")).length} </span>
                <h5>Inscriptions réussie</h5>
              </div>
              <div className="icon">
                <LuUserCheck className='i' />
              </div>
            </div>
            <div className="card n-finalise" onClick={() => navigation("/sidebar/inscription-non-finalisee")}>
              <div className="nbr">
                <span>{
                  (() => {
                    const allowedStatuses = ["pending", "canceled", "expired"];
                    const excludedStatus = "paid";

                    // Regrouper tous les statuts par email
                    const emailStatuses = {};
                    inscriptionToday.forEach(item => {
                      if (!emailStatuses[item.email]) {
                        emailStatuses[item.email] = new Set();
                      }
                      emailStatuses[item.email].add(item.status);
                    });

                    // Garder uniquement ceux qui :
                    // 1️⃣ ont au moins un statut autorisé
                    // 2️⃣ n’ont pas de statut 'paid'
                    // 3️⃣ ont strictement un seul statut parmi allowedStatuses
                    const result = Object.entries(emailStatuses)
                      .filter(([email, statuses]) => {
                        const statusesArray = [...statuses];
                        return (
                          !statusesArray.includes(excludedStatus) &&
                          statusesArray.every(status => allowedStatuses.includes(status)) &&
                          statusesArray.length === 1
                        );
                      })
                      .map(([email]) => email);

                    return result.length;
                  })()
                }</span>
                <h5>Inscriptions incomplètes</h5>
              </div>
              <div className="icon">
                <LuUserRoundCog className='i' />
              </div>
            </div>
            <div className="card promo">
              <div className="nbr">
                <span>{(inscriptionToday.filter((item) => item.promo === "1" && item.status == "paid")).length}</span>
                <h5>Inscriptions via code</h5>
              </div>
              <div className="icon">
                <FaTicketAlt className='i' />
              </div>
            </div>
            <div className="card total">
              <div className="nbr">
                <span>{(inscriptionToday.filter((item) => item.status == "paid")).length +
                  (() => {
                    const allowedStatuses = ["pending", "canceled", "expired"];
                    const excludedStatus = "paid";

                    // Regrouper tous les statuts par email
                    const emailStatuses = {};
                    inscriptionToday.forEach(item => {
                      if (!emailStatuses[item.email]) {
                        emailStatuses[item.email] = new Set();
                      }
                      emailStatuses[item.email].add(item.status);
                    });

                    // Garder uniquement ceux qui :
                    // 1️⃣ ont au moins un statut autorisé
                    // 2️⃣ n’ont pas de statut 'paid'
                    // 3️⃣ ont strictement un seul statut parmi allowedStatuses
                    const result = Object.entries(emailStatuses)
                      .filter(([email, statuses]) => {
                        const statusesArray = [...statuses];
                        return (
                          !statusesArray.includes(excludedStatus) &&
                          statusesArray.every(status => allowedStatuses.includes(status)) &&
                          statusesArray.length === 1
                        );
                      })
                      .map(([email]) => email);

                    return result.length;
                  })()
                  + (inscriptionToday.filter((item) => item.promo === "1" && item.status == "paid")).length}</span>
                <h5>Total des inscriptions</h5>
              </div>
              <div className="icon">
                <FaUsers className='i' />
              </div>
            </div>
          </div>
        </div>
        <div className="content1">
          <div class="horaire">Total</div>
          <div className="cards">
            <div className="card reussi" onClick={() => navigation("/sidebar/inscription-reussie")}>
              <div className="nbr">
                <span> {(inscription.filter((item) => item.status == "paid")).length} </span>
                <h5>Inscriptions réussies</h5>
              </div>
              <div className="icon">
                <LuUserCheck className='i' />
              </div>
            </div>
            <div className="card n-finalise" onClick={() => navigation("/sidebar/inscription-non-finalisee")} >
              <div className="nbr">
                <span>{
                  (() => {
                    const allowedStatuses = ["pending", "canceled", "expired"];
                    const excludedStatus = "paid";

                    // Regrouper tous les statuts par email
                    const emailStatuses = {};
                    inscription.forEach(item => {
                      if (!emailStatuses[item.email]) {
                        emailStatuses[item.email] = new Set();
                      }
                      emailStatuses[item.email].add(item.status);
                    });

                    // Garder uniquement ceux qui :
                    // 1️⃣ ont au moins un statut autorisé
                    // 2️⃣ n’ont pas de statut 'paid'
                    // 3️⃣ ont strictement un seul statut parmi allowedStatuses
                    const result = Object.entries(emailStatuses)
                      .filter(([email, statuses]) => {
                        const statusesArray = [...statuses];
                        return (
                          !statusesArray.includes(excludedStatus) &&
                          statusesArray.every(status => allowedStatuses.includes(status)) &&
                          statusesArray.length === 1
                        );
                      })
                      .map(([email]) => email);

                    return result.length;
                  })()
                }</span>
                <h5>Inscriptions incomplètes</h5>
              </div>
              <div className="icon">
                <LuUserRoundCog className='i' />
              </div>
            </div>
            <div className="card promo">
              <div className="nbr">
                <span>{(inscription.filter((item) => item.promo === "1" && item.status == "paid")).length}</span>
                <h5>Inscriptions via code</h5>
              </div>
              <div className="icon">
                <FaTicketAlt className='i' />
              </div>
            </div>
            <div className="card total">
              <div className="nbr">
                <span>{(inscription.filter((item) => item.status == "paid")).length +
                  (() => {
                    const allowedStatuses = ["pending", "canceled", "expired"];
                    const excludedStatus = "paid";

                    // Regrouper tous les statuts par email
                    const emailStatuses = {};
                    inscription.forEach(item => {
                      if (!emailStatuses[item.email]) {
                        emailStatuses[item.email] = new Set();
                      }
                      emailStatuses[item.email].add(item.status);
                    });

                    // Garder uniquement ceux qui :
                    // 1️⃣ ont au moins un statut autorisé
                    // 2️⃣ n’ont pas de statut 'paid'
                    // 3️⃣ ont strictement un seul statut parmi allowedStatuses
                    const result = Object.entries(emailStatuses)
                      .filter(([email, statuses]) => {
                        const statusesArray = [...statuses];
                        return (
                          !statusesArray.includes(excludedStatus) &&
                          statusesArray.every(status => allowedStatuses.includes(status)) &&
                          statusesArray.length === 1
                        );
                      })
                      .map(([email]) => email);

                    return result.length;
                  })()
                  + (inscription.filter((item) => item.promo === "1" && item.status == "paid")).length}</span>
                <h5>Total des inscriptions</h5>
              </div>
              <div className="icon">
                <FaUsers className='i' />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
