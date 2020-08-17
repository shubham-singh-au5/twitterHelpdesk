import React, { Component } from 'react'
import { connect } from 'react-redux'
import { useEffect } from 'react'

export const Tweet = ({ tweet, setCenterData, centerData }) => {

  useEffect(() => {
    if (centerData.length === 0) {
      setCenterData(tweet)
    }
  }, []);
  return (
    <div onClick={() => setCenterData(tweet)} className="row  pointer single-mention rounded border-3px " >
      {/* <div className="col-2"> */}
      <img className="rounded-circle" height="21px" src={tweet.user.profile_image_url} alt="" />
      {/* </div> */}

      <div className="col-10 tweet-info ">
        <h6 className="text-capitalize" >{tweet.user.name}</h6>
        <p className="text-truncate tweet-content" >
          {tweet.text}
        </p>
      </div>

    </div>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Tweet)
