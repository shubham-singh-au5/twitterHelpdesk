import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from "./Login";
import Dashboard from "./Dashboard";
import { BrowserRouter, Route } from 'react-router-dom';

export class Page extends Component {

  render() {
    return (
      <BrowserRouter >

        <Route path="/" component={Login} exact>

        </Route>
        <Route path="/dashboard" component={Dashboard} >

        </Route>


      </BrowserRouter >


    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
