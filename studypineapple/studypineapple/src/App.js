import React from 'react';
import useSocket from './components/useSockets';
import Home from './components/rooms/Chat';
import Login from './components/rooms/Login';


const App = () => {

    const client = useSocket();

    return (
        <div className="app">
            { client.user ? <Home client={client} /> : <Login logIn={client.logIn} />}
        </div>
    );

}

export default App;