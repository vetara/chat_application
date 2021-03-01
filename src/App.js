import { ChatEngine } from "react-chat-engine";
import './App.css';
import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';

const App = () => {
    
    if (!localStorage.getItem('username')) return <LoginForm />
        
    return (
        <ChatEngine
        
        height="100vh"
        projectID="67ec309f-4db7-4a2d-8c5f-5310843be5c7"
        userName={localStorage.getItem('username')}
        userSecret={localStorage.getItem('password')}

        //Creating Custom Component To Render For The Entire Chat Feed
        renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
        />
    )
}

export default App;