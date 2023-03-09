import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'

import './index.css'

class HomePage extends Component {
  logout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')

    history.replace('/ebank/login')
  }

  render() {
    return (
      <div className="home-main-container">
        <div className="header-box">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png "
            alt="website logo"
            className="img-logo"
          />
          <button type="button" onClick={this.logout} className="logout-btn">
            Logout
          </button>
        </div>
        <div className="home-container-box">
          <h1 className="home-heading">Your Flexibility, Our Excellence</h1>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
              alt="digital card"
              className="card-img"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(HomePage)
