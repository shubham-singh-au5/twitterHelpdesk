import React from 'react'

export default function Header({ sessionTime }) {
  return (
    <header className="row mx-0 head mb-5 " >
      <span className="border-bot update " >Updates</span>

      <div className="ml-auto  col-3 " >
        <div className="row right-header justify-content-between">

          <span className="mr-1 " >Session: 34 mins</span>
          <span className=" " >User: {sessionStorage.getItem("name")}</span>
        </div>
      </div>

    </header>
  )
}
