import React from 'react'
import './style.css'

export default function Loading() {
  return (
    <div>
      <div class="space">

        <div class="ship">
          <div class="ship-rotate">
            <div class="pod"></div>
            <div class="fuselage"></div>

            <div class="exhaust-flame"></div>
            <ul class="exhaust-fumes">
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

        <div class="ship-shadow"></div>

        <div class="mars">
          <div class="tentacle"></div>
          <div class="flag">
            <div class="small-tentacle"></div>
          </div>
          <div class="planet">
            <div class="surface"></div>
            <div class="crater1"></div>
            <div class="crater2"></div>
            <div class="crater3"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
