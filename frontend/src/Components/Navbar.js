import React, { Component } from 'react'
import { connect } from 'react-redux'
import diamond from "./diamond.png";
import clock from "./clock.png";
import hut from "./hut.png";
import card from "./card.png";
import support from "./support.png";
import messages from "./messages.png";
import people from "./people.png";
import house from "./house.png";
import { Link } from "react-router-dom";
import axios from "axios"

export const Navbar = () => {
  const handleLogout = () => {
    axios.get("https://twitterhdesk.herokuapp.com/logout")
  }
  return (
    <nav className="position-relative twit-navbar " >
      <ul className="nav-list list-unstyled text-center " >
        <Link to="/" >
          <i onClick={handleLogout} className="fa fa-power-off position-absolute  "></i>
        </Link>
        <li className="mb-3" ><img className="diamond" src={diamond} alt="" /></li>
        <li> <img id="clock" src={clock} alt="" />  </li>
        <li> <img id="house" src={house} alt="" /> </li>
        <li> <img id="people" src={people} alt="" /> </li>
        <li id="messages" className="selected" > <img src={messages} alt="" /> </li>
        <li> <img id="card" src={card} alt="" /> </li>
        <li> <img id="hut" src={hut} alt="" /> </li>


      </ul>
      <ul className="mt-auto list-unstyled text-center" >
        <li><img className="support" src={support} alt="" /></li>
        <li> <img className="rounded-circle" height="30rem" src={sessionStorage.getItem("profile_image_url")} alt="" /> </li>

      </ul>

    </nav>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
