import React from 'react'
import Header from './header'
/**
 * Main app entry point
 */
class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="conetnt">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
export default App 