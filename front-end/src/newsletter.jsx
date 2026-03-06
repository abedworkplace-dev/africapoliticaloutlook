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


export default function Newsletter() {
  const [newsletter, setnewsletter] = useState([])
  const [overlay, setOverlay] = useState(false)
  const [overlayItem, setOverlayItem] = useState({})

  useEffect(() => {
    axios.get("http://localhost:3006/newsletter")
      .then((res) => {
        setnewsletter(res.data)
      }).catch((err) => {
        console.log(err)
      })
  }, []);



  return (
    <div className='dashboard newsletter'>
      <div className="header">
        <h4>Newsletter</h4>
      </div>
      <div className="content">
        <table>
          <thead>
            <tr>
              <th className='col1'>N°</th>
              <th className='col2'>Email</th>
              <th className='col7'>Date</th>
            </tr>
          </thead>
          <tbody>
            {newsletter.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{item.id}</td>
                  <td><a href={`mailto:${item.email}`}>{item.email}</a></td>
                  <td>{new Date(item.date).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

    </div>
  )
}

