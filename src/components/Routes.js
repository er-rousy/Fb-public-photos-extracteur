import React from 'react'
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'
import App from './App'
import Home from './../views/home'
import Galeries from './../views/Galeries'
import Galerie from './../views/Galerie'
import Login from './../views/login'



class Routes extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Home} />
                    <Route path="galeries" component={Galeries} />
                    <Route path="galerie/:idgalerie" component={Galerie} />
                    <Route path="login" component={Login} />
                </Route>
            </Router>
        )
    }
}

export default Routes;


