import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import axios from "axios";
import { useState, useEffect } from 'react';
import uuid from "uuid/v4";

export const FocusTweet = ({ centerData: tweet }) => {
  const [reply, setReply] = useState("")
  const handleSubmit = (e) => {
    //console.log("submit")
    e.preventDefault()
    axios.post("https://twitterhdesk.herokuapp.com/reply", { status: reply, in_reply_to_status_id: tweet.id_str }, { withCredentials: true })
    setReply("")
  }



  return (
    <Fragment>
      {tweet.user &&
        <Fragment>

          <div className="row focus-tweet-head align-items-center border-bot mx-0 ">
            <div className="pr-3">
              <img className="rounded-circle" height="21px" src={tweet.user.profile_image_url} alt="" />

            </div>
            <h6 className="m-0 username-font " >{tweet.user.name}  <i className="fa fa-circle" /></h6>
          </div>
          <div className="tweet-para">
            <div className="row">
              <img className="rounded-circle" height="21px" src={tweet.user.profile_image_url} alt="" />

              <p className=" col " dangerouslySetInnerHTML={{ __html: tweet.text.replace(/(^|[^@\w])@(\w{1,15})\b/g, '$1<a href="http://twitter.com/$2">@$2</a>') }} >

              </p>
              <p className="created-at" >
                {new Date(tweet.created_at).toLocaleTimeString('en-US', { hour: "numeric", minute: "numeric" })}
                <br />
                {new Date(tweet.created_at).toLocaleDateString()}

              </p>
            </div>
          </div>
          {tweet.entities.media &&
            tweet.entities.media.map(elem =>
              <iframe width="200px" src={elem.media_url} frameborder="0"></iframe>
            )
          }
          {tweet.replies && tweet.replies.map(tweet => (
            <div key={uuid()} className="tweet-para-reply">
              <div className="row">
                <img className="rounded-circle" height="21px" src={tweet.user.profile_image_url} alt="" />

                <p className=" col " dangerouslySetInnerHTML={{ __html: tweet.text.replace(/(^|[^@\w])@(\w{1,15})\b/g, '$1<a href="http://twitter.com/$2">@$2</a>') }} >
                </p>
                <p className="created-at" >
                  {new Date(tweet.created_at).toLocaleTimeString('en-US', { hour: "numeric", minute: "numeric" })}
                  <br />
                  {new Date(tweet.created_at).toLocaleDateString()}

                </p>
              </div>

            </div>
          ))

          }
          <div className="tweet-para-reply mt-auto ">
            <div className="row">
              <img className="rounded-circle" height="21px" src={sessionStorage.getItem("profile_image_url")} alt="" />

              <form onSubmit={handleSubmit} className="col"  >
                <label htmlFor="" className="position-relative w-100">

                  <input type="text" value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Reply..." className="form-control" required />
                  <i className=" position-absolute fa fa-paperclip"></i>
                </label>
              </form>

            </div>

          </div>


        </Fragment>
      }
    </Fragment>
  )

}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(FocusTweet)
