import { useState } from "react";
import axios from 'axios';

const LoginForm = () => {
    // Two Fields Or States To Manage
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //State To Manage Error Messages
    const [error, setError] = useState('');

    // Submission Handler
    const handleSubmit = async (e) => {
        e.preventDefault(); //Prevents The Browser From Refreshing When Form Is Submitted

        /* 
            Once User Submits Their Credentials, The Chat Engine Will Attempt To Retrieve Given User's Messages
            If Successful, The User Will Be Logged In
            Else, Display An Error Message.
        */

        const authObject = { 'Project-ID': "67ec309f-4db7-4a2d-8c5f-5310843be5c7", 'User-Name': username, 'User-Secret': password };

        try {
            //Make Request To Chat Engine's API
            await axios.get('https://api.chatengine.io/chats', { headers: authObject });

            //Store Credentials Locally
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            localStorage.setItem('project-id', "67ec309f-4db7-4a2d-8c5f-5310843be5c7");

            //Reload The Page
            window.location.reload();
        } catch (error) {
            setError('[!] Error [!] Incorrect Credentials. Please Try Again.')
        }
    }

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Chat Application</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
                    <div align='center'>
                        <button type="submit" className="button">
                            <span>Start Chatting</span>
                        </button>
                    </div>
                    <h2 className="error">{error}</h2>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;