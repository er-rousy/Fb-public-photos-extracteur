import hello from 'hellojs'
import axios from 'axios'
import * as firebase from 'firebase';
// allow single instance during app lifecycle
let connectionManagerSingletonInstance = false

/**
 * Manage user authentication and account albums/photos using Hello.js library
 */
class ConnectionManager {
    constructor() {

        if (!connectionManagerSingletonInstance) {

            hello.init({
                facebook: FACEBOOK_APP_ID
            }, {
                    scope: 'photos',
                    display: 'popup',
                    force: false
                });
            connectionManagerSingletonInstance = this;
        }
        // proxify some of Hello.js methods
        this.login = hello.login.bind(hello)
        this.logout = hello.logout.bind(hello)
        this.on = hello.on.bind(hello)
        this.off = hello.on.bind(hello)

        // listen to logout event
        this.on('auth.logout', this.onLogout.bind(this));
        return connectionManagerSingletonInstance;
    }

    /**
     * get list of all user's albums sorted by name (ascending)
     */
    async getGalegies() {
        let Galeries = []
        let fetchedGaleries = []
        // default Facebook Api endpoint query string params 
        let options = {
            limit: 2
        }
        do {
            let response = await hello('facebook').api('me/albums', 'get', options)
            options.after = response.paging ? response.paging.cursors.after : ''
            fetchedGaleries = response.data
            Galeries = Galeries.concat(fetchedGaleries)
        } while (fetchedGaleries.length > 0) // stop once there is no more data
        // return sorted array
        return Galeries.sort((x, y) => x.name.localeCompare(y.name))
    }


    async isLoggedIn() {
        let session = hello('facebook').getAuthResponse()
        let currentTime = (new Date()).getTime() / 1000
        return session && session.access_token && session.expires > currentTime
    }

    /**
     * get current user profile data
     */
    async getProfile() {
        try {
            return await hello('facebook').api('me')
        } catch (exception) {
            // return empty object in case of inactive access token
            if (exception.error && exception.error.code === 2500) {
                return {}
            } else {
                throw exception
            }
        }
    }

    /**
     * handle user sign out
     */
    onLogout() {
        // empty selected photos collections
        // as it contains sensitive data such as access token
        localStorage.removeItem('selectedPhotos')
        
    }

}


export default ConnectionManager;

