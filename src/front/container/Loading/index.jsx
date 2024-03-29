import React from 'react'
import './style.css'

export default function Loading() {
  return (
    <div>
      <div className="space">

        <div className="ship">
          <div className="ship-rotate">
            <div className="pod"></div>
            <div className="fuselage"></div>

            <div className="exhaust-flame"></div>
            <ul className="exhaust-fumes">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>

        <div className="ship-shadow"></div>

        <div className="mars">
          <div className="tentacle"></div>
          <div className="flag">
            <div className="small-tentacle"></div>
          </div>
          <div className="planet">
            <div className="surface"></div>
            <div className="crater1"></div>
            <div className="crater2"></div>
            <div className="crater3"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
