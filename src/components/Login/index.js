import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter, Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', err: '', status: ''}

  updateUserPassword = e => {
    this.setState({password: e.target.value})
  }

  updateUserName = e => {
    this.setState({username: e.target.value})
  }

  setJwtToken = token => {
    console.log(token, '+++')
    const {history} = this.props
    Cookies.set('jwt_token', token, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  checkLoginDetails = async e => {
    e.preventDefault()
    try {
      const {username, password} = this.state
      console.log(username, password)

      const url = 'https://apis.ccbp.in/ebank/login'
      const userDetails = {user_id: username, pin: password}
      const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
      }

      const res = await fetch(url, options)
      const data = await res.json()
      this.setState({username: '', password: ''})
      if (res.ok) {
        console.log(data.jwt_token, '..')
        this.setJwtToken(data.jwt_token)
      } else {
        this.setState({err: data.error_msg})
        console.log(data)
      }
    } catch (err) {
      this.setState({status: 'FAILURE'})
      console.log(err, '...')
    }
    console.log('submitted')
  }

  render() {
    const {username, password, err, status} = this.state
    console.log(username, password, err, status)
    const jToken = Cookies.get('jwt_token')

    if (jToken) {
      return <Redirect to="/" />
    }

    return (
      <div className="main-container">
        <div className="login-box">
          <div className="login-img-box">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="login-img"
            />
          </div>
          <div className="login-form-box">
            <h1 className="form-heading">Welcome Back!</h1>
            <form className="form-box" onSubmit={this.checkLoginDetails}>
              <div className="label-input-box">
                <label htmlFor="userId" className="label-username">
                  User Id
                </label>
                <input
                  type="text"
                  onChange={this.updateUserName}
                  placeholder="Enter User ID"
                  id="userId"
                  value={username}
                  className="form-input"
                />
              </div>
              <div className="label-input-box">
                <label htmlFor="userPassword" className="label-username">
                  PIN
                </label>
                <input
                  type="password"
                  onChange={this.updateUserPassword}
                  placeholder="Enter User ID"
                  id="userPassword"
                  value={password}
                  className="form-input"
                />
              </div>
              <div className="login-btn-box">
                <button type="submit" className="login-btn">
                  Login
                </button>
                <p className="err-msg">{err}</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)
