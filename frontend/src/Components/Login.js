import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
// import { Link } from "react-router-dom";
// import axios from "axios";
import { Redirect } from 'react-router-dom';
import { setUser } from "../actions";
export class Login extends Component {

  componentDidMount() {
    const { location } = this.props

    // const req = axios.get("https://twitterhdesk.herokuapp.com/id")
    const [, token, tokenSecret, screen_name, profile_image_url, name] = location.search.split('&')
    this.props.setUser({ token, tokenSecret, screen_name, profile_image_url, name })
    sessionStorage.setItem("token", token)
    sessionStorage.setItem("tokenSecret", tokenSecret)
    sessionStorage.setItem("screen_name", screen_name)
    sessionStorage.setItem("profile_image_url", profile_image_url)
    sessionStorage.setItem("name", name)

  }

  render() {
    const { location } = this.props

    const [, token, tokenSecret, screen_name] = location.search.split('&')

    return (
      <div className="login-page">
        {token &&
          <Redirect to="dashboard" />
        }
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" > <i className="fa fa-twitter"></i> Twitter Client</a>
        </nav>

        <main>

          <div className="row justify-content-end mt-5 mr-5 " >
            <div className="jumbotron shadow col-3 mr-5">
              <div className="bg-white">

                <h4 className=" text-center p-2 rounded">Welcome!</h4>
                <h5 className=" text-center px-4 pb-4 rounded" >
                  Track activity and reply to all tweets in real time.

              </h5>
              </div>
              <div className="row mt-5 justify-content-center ">

                <a className="btn btn-primary" href="https://twitterhdesk.herokuapp.com/login" > Login Via Twitter</a>

              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})


export default connect(mapStateToProps, { setUser })(Login)
