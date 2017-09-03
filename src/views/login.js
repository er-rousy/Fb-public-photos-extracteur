import React from 'react'
import ConnectionManager from './../services/ConnectionManager'
import { browserHistory } from 'react-router'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.connectionManager = new ConnectionManager();

        this.login = this.login.bind(this);
    }

    async   isLoggedIn() {
        try {
            this.setState({ isLoggedIn: await this.connectionManager.isLoggedIn() });
            if (this.state.isLoggedIn)
                browserHistory.push('/')
        } catch (exception) {
            console.error(exception)
        } finally {
            this.setState({
                isLoading: false
            })
        }
    }

    componentWillMount() {
        this.isLoggedIn()
    }

    async  login() {
        try {
            await this.connectionManager.login('facebook')
            this.isLoggedIn()
        } catch (exception) {
            console.error(exception)
        }
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <button className="" onClick={this.login} > <i className="fa fa-facebook"></i> Login with Facebook </button>
            </div>
        )
    }
}

export default Login;