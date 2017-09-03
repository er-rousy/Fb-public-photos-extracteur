import React from 'react';
import { browserHistory } from 'react-router'
import { Link } from 'react-router';
import ConnectionManager from './../services/ConnectionManager'
// application header
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.connectionManager = new ConnectionManager();
        this.state = {

        }
        this.logOut = this.logOut.bind(this);
    }

    async   isLoggedIn() {
        try {

            this.setState({
                isLoggedIn: await this.connectionManager.isLoggedIn(),
                profile: await this.connectionManager.getProfile()
                
            });
            if(this.state.isLoggedIn)
                browserHistory.push('/')

        } catch (exception) {

            console.error(exception)
        }
    }

    async logOut() {
        await this.connectionManager.logout('facebook');
        browserHistory.push('/')
    }

    componentWillMount() {
        this.isLoggedIn()
    }
    render() {
        return (
            <div className="top-nav">
                <ul>
                    <li><Link to="/"> <i className="fa fa-home"></i> Home</Link></li>
                    {
                        this.state.isLoggedIn ? (
                            <li><Link to="/galeries"> <i className="fa fa-picture-o"></i> Galeries</Link></li>

                        ) : null
                    }

                    {
                        (
                            this.state.isLoggedIn ?
                                (
                                    <li className="pull-right"><a onClick={this.logOut}> <i className="fa fa-sign-out"></i> Logout</a></li>
                                ) :
                                (
                                    <li className="pull-right"><Link to="/login"> <i className="fa fa-sign-in"></i> Login</Link></li>
                                )
                        )
                    }
                </ul>
            </div>
        );
    }
}
export default Header;