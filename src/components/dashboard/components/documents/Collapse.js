import React from 'react'

export default function Collapse() {
    return (
        <div class="collapse w-96 border rounded-box border-base-300 collapse-arrow">
        <input type="checkbox"> 
        <div class="collapse-title text-xl font-medium">
          I open/close with click
        </div> 
        <div class="collapse-content"> 
          <p>Collapse content reveals with focus. If you add a checkbox, you can control it using checkbox instead of focus. Or you can force-open/force-close using 
            <span class="badge badge-outline">collapse-open</span> and 
            <span class="badge badge-outline">collapse-close</span> classes.
          </p>
        </div>
      </div> 
    )
}
