import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import socketIOClient from "socket.io-client";
import Navbar from "./Navbar";
import Header from "./Header";
import Tweet from './Tweet';
import axios from "axios"
import FocusTweet from './FocusTweet';
import filterIcon from "./filterIcon.png";
import uuid from "uuid/v4"
const ENDPOINT = "https://twitterhdesk.herokuapp.com";
export function Dashboard({ user }) {
  const [response, setResponse] = useState([]);
  const [centerData, setCenterData] = useState({})
  const [old, setOld] = useState([])
  const [sessionTime, setSessionTime] = useState([])

  // new or old mention
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("mention", data => {
      let flag
      // old mention conversation continued
      setOld(oldTweets => {
        const oldCopy = JSON.parse(JSON.stringify(oldTweets))
        flag = true
        for (let tweet of oldCopy) {
          if (tweet.id_str === data['in_reply_to_status_id_str']) {

            if (tweet.replies) {
              tweet.replies = tweet.replies.filter(el => el.id_str !== data.id_str)
            }
            tweet.replies = tweet.replies ? [...tweet.replies, data] : [data]
            setCenterData(tweet)
            flag = false
            return oldCopy
          }
        }
        return oldTweets
      })
      if (flag) {
        // new mention
        setOld(oldTweets => {
          oldTweets = oldTweets.filter(tweet => tweet.id !== data.id)
          return [data, ...oldTweets]
        });
      }

    });

  }, []);


  // reply to exisisting mention 
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("follow", data => {
      setOld(oldTweets => {

        const oldCopy = JSON.parse(JSON.stringify(oldTweets))

        for (let tweet of oldCopy) {
          if (tweet.id_str === data['in_reply_to_status_id_str']) {

            if (tweet.replies) {
              tweet.replies = tweet.replies.filter(el => el.id_str !== data.id_str)
            }
            tweet.replies = tweet.replies ? [...tweet.replies, data] : [data]
            setCenterData(tweet)
            return oldCopy
          }
        }
        return oldTweets
      })
      // //console.log(centerData)



    });

  }, []);


  //populating initial data
  useEffect(() => {
    async function fetchData() {
      try {

        const req = await axios.get("https://twitterhdesk.herokuapp.com/mentions", { withCredentials: true })
        let mentions = req.data
        //console.log(mentions)

        mentions.sort(function (a, b) {
          // sort according to dates so that the replies can be tracked
          return new Date(b.created_at) - new Date(a.created_at);
        });
        // console.table(JSON.parse(JSON.stringify(mentions)))

        for (let i = 0; i < mentions.length - 1; i++) {
          let temp = mentions[i]
          for (let j = i + 1; j < mentions.length; j++) {
            if (mentions[j].id_str === temp['in_reply_to_status_id_str']) {
              if (!mentions[j].replies) {
                mentions[j].replies = []
              }
              // console.dir(mentions[j].replies, "reply added")
              mentions[j].replies.unshift(mentions.splice(i, 1)[0])

              i--
            }
          }
        }

        // //console.log(mentions)
        mentions = mentions.filter(el => el.replies || el.user.screen_name !== sessionStorage.getItem("screen_name"))
        setCenterData(mentions[0])
        setOld(mentions)
      } catch (error) {
        // console.log(error)
        window.location.href = "/"
      }
    }
    fetchData();
  }, []);


  //track session time
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setSessionTime(data);
    });
  }, []);


  return (
    <div className="dashboard-container" >
      <Navbar />
      <div className="main-content " >
        <Header sessionTime={sessionTime} />

        <div className="row mx-0 mb-4 align-items-center convo-heading" >
          <h3 className="conversations mr-3" >Conversations</h3>
          <label className="position-relative" >
            <i className="fa fa-search"></i>
            <input type="text" className="quick-search " placeholder="Quick search" />
          </label>
          <button className="filter" >
            <img src={filterIcon} alt="" />
            Filter
          </button>
          <button className="ml-auto  online" > <i className="fa fa-circle"></i> Online <i className="fa fa-caret-down"></i> </button>
        </div>

        <div className="row flex-1 justify-content-between main-content-box mx-0">
          <div className="tweets-container">
            {response.length > 0 &&
              response.map((tweet, index) => (
                <Tweet key={uuid()} setCenterData={setCenterData} tweet={tweet} index={index} />
              )
              )}
            <div className="row mentions-heading mt-4 border-bot">
              <span >
                Mentions
              </span>

            </div>
            {old.map((tweet, index) => (
              <Tweet key={uuid()} setCenterData={setCenterData} tweet={tweet} centerData={centerData} />
            )
            )}

          </div>

          <div className=" border-3px rounded center-space">
            <div className="col-9  focus-container">
              <FocusTweet centerData={centerData} />

            </div>
            <div className=" tweet-profile-container d-flex flex-column p-0 ">
              {
                centerData.user &&
                <Fragment>

                  <div className="border-bot extra-padding flex-3 " >
                    <div className="flex-column d-flex align-items-center px-5 pt-5  " >


                      <div className="rounded-circle tweet-profile"
                        style={{
                          backgroundImage: `url(${centerData.user.profile_image_url.replace("_normal", "")})`
                        }} alt="" />
                      <h6 className="p-0 tweet-username m-0" >{centerData.user.name}</h6>
                      <p className="text-success" ><small>Online </small> </p>


                    </div>
                    <div className="row justify-content-around mb-2 px-4" >
                      {!centerData.user.following &&
                        <button className="follow" ><i className="fa fa-plus" /> Follow </button>
                      }
                      {centerData.user.following &&
                        <button className="follow" > Following </button>
                      }
                      <button className="message" ><i className="fa fa-commenting" /> Message </button>
                    </div>
                    <div className="p-2 extra-details ">

                      <div className="row mb-2  ">
                        <div className="col-6">Followers</div>
                        <div className="col-6 text-right">{centerData.user.followers_count}</div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-6">Favorites</div>
                        <div className="col-6 text-right ">{centerData.user.favourites_count}</div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-6">Friends</div>
                        <div className="col-6 text-right ">{centerData.user.friends_count}</div>
                      </div>
                    </div >
                  </div>
                  <div className="flex-1 p-2 extra-details-2 " >
                    <h6 className="p-1 counts">Counts</h6>
                    <div className="row mb-2">
                      <div className="col-6">Quote Count</div>
                      <div className="col-6 text-right">{centerData.quote_count || 0}</div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-6">Reply Count</div>
                      <div className="col-6 text-right ">{centerData.reply_count || 0}</div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-6">Retweet Count</div>
                      <div className="col-6 text-right ">{centerData.retweet_count || 0}</div>
                    </div>
                  </div>
                </Fragment>
              }
            </div>
          </div>


        </div>




      </div>



    </div >
  );
}

const mapStateToProps = ({ appReducer: { user } }) => {

  return { user }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
