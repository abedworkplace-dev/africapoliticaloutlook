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
import { BsFiletypePdf } from "react-icons/bs";


export default function Dashboard() {
  const navigation = useNavigate()
  const [inscription, setInscription] = useState([])
  const [inscriptionToday, setInscriptionToday] = useState([])
  const [rapport, setRapport] = useState([])
  const [rapportToday, setRapportToday] = useState([])

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


  useEffect(() => {
    axios.get("http://localhost:3006/download")
      .then((res) => {
        const today = new Date();
        setRapport(res.data)

        const result = res.data.filter(item => {
          const itemDate = new Date(item.downloaded_at.replace(" ", "T"));

          return (
            itemDate.getFullYear() === today.getFullYear() &&
            itemDate.getMonth() === today.getMonth() &&
            itemDate.getDate() === today.getDate()
          );
        });

        setRapportToday(result);
      }).catch((err) => {
        console.log(err)
      })
  }, []);


  const getDownloadCount = (data, documentName) => {
    return data.filter(item => item.document_name === documentName).length;
  };


  const docs = [
    { key: "THE_STATE_OF_AFRICAN_GOVERNANCE_2026.pdf", label: "The State of African Governance 2026" },
    { key: "APO_2026_Executive_Report.pdf", label: "APO 2026 Executive Report" },
    { key: "AGENDA_APO_2026.pdf", label: "Agenda APO 2026" },
    { key: "REPORT_APO_2025_EN.pdf", label: "Rapport APO 2025 — EN" },
    { key: "REPORT_APO_2025_FR.pdf", label: "Rapport APO 2025 — FR" },
    { key: "AGENDA_APO_2025.pdf", label: "Agenda APO 2025" },
    { key: "REPORT_APO_2024_FR.pdf", label: "Rapport APO 2024 — FR" },
    { key: "REPORT_APO_2024_EN.pdf", label: "Rapport APO 2024 — EN" },
    { key: "AGENDA_APO_2024.pdf", label: "Agenda APO 2024" },
    { key: "REPORT_APO_2023_FR.pdf", label: "Rapport APO 2023" },
    { key: "RECOMMANDATIONS_OF_THE_APO_HIGH_LEVEL_ROUNDTABLE.pdf", label: "Recommandations APO High Level Roundtable" },
  ];

  const maxCount = Math.max(...docs.map(d => getDownloadCount(rapport, d.key)));



  return (
    <div className='dashboard'>
      <div className="header">
        <h4>Dashboard</h4>
      </div>
      <div className="content">
        <div className="content1">
          <div className="horaire">Aujourd'hui</div>
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

                    // regrouper les items par email
                    const emailGroups = {};

                    inscriptionToday.forEach(item => {
                      if (!emailGroups[item.email]) {
                        emailGroups[item.email] = [];
                      }
                      emailGroups[item.email].push(item);
                    });

                    // filtrer les emails
                    const result = Object.values(emailGroups)
                      .filter(items =>
                        !items.some(i => i.status === excludedStatus) &&
                        items.some(i => allowedStatuses.includes(i.status))
                      )
                      .map(items => items[0].email); // garder un seul email

                    return result.length;
                  })()
                }</span>
                <h5>Inscriptions incomplètes</h5>
              </div>
              <div className="icon">
                <LuUserRoundCog className='i' />
              </div>
            </div>
            <div className="card promo" onClick={() => navigation("/sidebar/inscription-promo")}>
              <div className="nbr">
                <span>{(inscriptionToday.filter((item) => item.promo == "1" && item.status === "paid")).length}</span>
                <h5>Inscriptions via code</h5>
              </div>
              <div className="icon">
                <FaTicketAlt className='i' />
              </div>
            </div>
            <div className="card total" onClick={() => navigation("/sidebar/inscription")}>
              <div className="nbr">
                <span>{(inscriptionToday.filter((item) => item.status == "paid")).length +
                  (() => {
                    const allowedStatuses = ["pending", "canceled", "expired"];
                    const excludedStatus = "paid";

                    // regrouper les items par email
                    const emailGroups = {};

                    inscriptionToday.forEach(item => {
                      if (!emailGroups[item.email]) {
                        emailGroups[item.email] = [];
                      }
                      emailGroups[item.email].push(item);
                    });

                    // filtrer les emails
                    const result = Object.values(emailGroups)
                      .filter(items =>
                        !items.some(i => i.status === excludedStatus) &&
                        items.some(i => allowedStatuses.includes(i.status))
                      )
                      .map(items => items[0].email); // garder un seul email

                    return result.length;
                  })()}</span>
                <h5>Total des inscriptions</h5>
              </div>
              <div className="icon">
                <FaUsers className='i' />
              </div>
            </div>
          </div>
        </div>
        <div className="content1">
          <div className="horaire">Total</div>
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

                    // regrouper les items par email
                    const emailGroups = {};

                    inscription.forEach(item => {
                      if (!emailGroups[item.email]) {
                        emailGroups[item.email] = [];
                      }
                      emailGroups[item.email].push(item);
                    });

                    // filtrer les emails
                    const result = Object.values(emailGroups)
                      .filter(items =>
                        !items.some(i => i.status === excludedStatus) &&
                        items.some(i => allowedStatuses.includes(i.status))
                      )
                      .map(items => items[0].email); // garder un seul email

                    return result.length;
                  })()
                }</span>
                <h5>Inscriptions incomplètes</h5>
              </div>
              <div className="icon">
                <LuUserRoundCog className='i' />
              </div>
            </div>
            <div className="card promo" onClick={() => navigation("/sidebar/inscription-promo")}>
              <div className="nbr">
                <span>{(inscription.filter((item) => item.promo == "1" && item.status === "paid")).length}</span>
                <h5>Inscriptions via code</h5>
              </div>
              <div className="icon">
                <FaTicketAlt className='i' />
              </div>
            </div>
            <div className="card total" onClick={() => navigation("/sidebar/inscription")}>
              <div className="nbr">
                <span>{(inscription.filter((item) => item.status == "paid")).length +
                  (() => {
                    const allowedStatuses = ["pending", "canceled", "expired"];
                    const excludedStatus = "paid";

                    // regrouper les items par email
                    const emailGroups = {};

                    inscription.forEach(item => {
                      if (!emailGroups[item.email]) {
                        emailGroups[item.email] = [];
                      }
                      emailGroups[item.email].push(item);
                    });

                    // filtrer les emails
                    const result = Object.values(emailGroups)
                      .filter(items =>
                        !items.some(i => i.status === excludedStatus) &&
                        items.some(i => allowedStatuses.includes(i.status))
                      )
                      .map(items => items[0].email);

                    return result.length;
                  })()}</span>
                <h5>Total des inscriptions</h5>
              </div>
              <div className="icon">
                <FaUsers className='i' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header rapports-title">
        <h4>Téléchargements Documents APO</h4>
      </div>
      <div className="content rapports-contents">
        <div className="content1">
          <div className="horaire">Aujourd'hui</div>
          <div className="cards">
            <div className="card reussi" onClick={() => navigation("/sidebar/download")}>
              <div className="nbr">
                <span> {(rapportToday).length} </span>
                <h5>Total téléchargements</h5>
              </div>
              <div className="icon">
                <BsFiletypePdf className='i' />
              </div>
            </div>
            <div className="card n-finalise" onClick={() => navigation("/sidebar/download")}>
              <div className="nbr">
                <span> {rapportToday.filter((rapport, index, self) =>
                  index === self.findIndex((r) => r.document_name === rapport.document_name)
                ).length} </span>
                <h5>Documents distincts</h5>
              </div>
              <div className="icon">
                <BsFiletypePdf className='i' />
              </div>
            </div>
            <div className="card promo plus" onClick={() => navigation("/sidebar/download")}>
              <div className="nbr">
                <span className='doc-name'>
                  {
                    Object.entries(
                      rapportToday.reduce((acc, { document_name }) => {
                        acc[document_name] = (acc[document_name] || 0) + 1;
                        return acc;
                      }, {})
                    ).sort((a, b) => b[1] - a[1])[0]?.[0]
                  }
                </span>
                <h5>Document le plus téléchargé</h5>
              </div>
              <div className="icon">
                <BsFiletypePdf className='i' />
              </div>
            </div>
          </div>
          <div className="listing">
            {docs.map((doc, i) => {
              const count = getDownloadCount(rapportToday, doc.key);
              const pct = maxCount > 0 ? Math.round((count / maxCount) * 100) : 0;
              return (
                <div key={doc.key} className="doc-stat-item" onClick={() => navigation("/sidebar/rapport-telechargement")}>
                  <div className="doc-stat-icon"><BsFiletypePdf /></div>
                  <div className="doc-stat-meta">
                    <div className="doc-stat-name">{doc.label}</div>
                    <div className="doc-stat-bar-row">
                      <div className="doc-stat-bar-bg">
                        <div className="doc-stat-bar-fill" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="doc-stat-count">{count}</span>
                    </div>
                    <div className="doc-stat-dl">téléchargements</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="content1">
          <div className="horaire">Total</div>
          <div className="cards">
            <div className="card reussi" onClick={() => navigation("/sidebar/download")}>
              <div className="nbr">
                <span> {(rapport).length} </span>
                <h5>Total téléchargements</h5>
              </div>
              <div className="icon">
                <BsFiletypePdf className='i' />
              </div>
            </div>
            <div className="card n-finalise" onClick={() => navigation("/sidebar/download")}>
              <div className="nbr">
                <span> {rapport.filter((rapport, index, self) =>
                  index === self.findIndex((r) => r.document_name === rapport.document_name)
                ).length} </span>
                <h5>Documents distincts</h5>
              </div>
              <div className="icon">
                <BsFiletypePdf className='i' />
              </div>
            </div>
            <div className="card promo plus" onClick={() => navigation("/sidebar/download")}>
              <div className="nbr">
                <span className='doc-name'>
                  {
                    Object.entries(
                      rapport.reduce((acc, { document_name }) => {
                        acc[document_name] = (acc[document_name] || 0) + 1;
                        return acc;
                      }, {})
                    ).sort((a, b) => b[1] - a[1])[0]?.[0]
                  }
                </span>
                <h5>Rapports le plus téléchargés</h5>
              </div>
              <div className="icon">
                <BsFiletypePdf className='i' />
              </div>
            </div>
          </div>


          <div className="listing">
            {docs.map((doc, i) => {
              const count = getDownloadCount(rapport, doc.key);
              const pct = maxCount > 0 ? Math.round((count / maxCount) * 100) : 0;
              return (
                <div key={doc.key} className="doc-stat-item" onClick={() => navigation("/sidebar/rapport-telechargement")}>
                  <div className="doc-stat-icon"><BsFiletypePdf /></div>
                  <div className="doc-stat-meta">
                    <div className="doc-stat-name">{doc.label}</div>
                    <div className="doc-stat-bar-row">
                      <div className="doc-stat-bar-bg">
                        <div className="doc-stat-bar-fill" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="doc-stat-count">{count}</span>
                    </div>
                    <div className="doc-stat-dl">téléchargements</div>
                  </div>
                </div>
              );
            })}
          </div>




        </div>
      </div>
    </div>
  )
}
