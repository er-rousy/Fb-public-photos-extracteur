import React from 'react'
import { Link } from 'react-router';
import './../scss/home.scss';
import ConnectionManager from './../services/ConnectionManager'
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.connectionManager = new ConnectionManager();
        this.state = {
            isLoading: true
        }
    }

    async   isLoggedIn() {
        try {

            this.setState({
                isLoggedIn: await this.connectionManager.isLoggedIn(),
                profile: await this.connectionManager.getProfile()
            });
            console.log(this.state.profile);
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

    render() {
        return (
            <div>
                <h1>Home... bla bla bla </h1>
                {
                   
                    this.state.isLoggedIn ?
                        (
                            <div className="user-info">
                                <div>
                                    <img src={this.state.profile.thumbnail} className="profile-photo" />
                                </div>
                                <div>
                                    <ul>
                                        <li>
                                            <span>
                                                Last Name :
                                            </span>
                                            {this.state.profile.last_name}
                                        </li>
                                        <li>
                                        <span>
                                                Last Name :
                                            </span>
                                            {this.state.profile.first_name}
                                        </li>
                                        <li>
                                        <span>
                                                Name :
                                            </span>
                                            {this.state.profile.name}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <Link to="/login"> <i className="fa fa-sign-in"></i> Login</Link>
                            </div>
                        )
                }
            </div>
        )
    }
}

export default Home;