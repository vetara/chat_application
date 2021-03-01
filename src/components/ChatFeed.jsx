import MessageForm from './MessageForm';
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';

const ChatFeed = (props) => {
    //Props To Be Restructured
    const { chats, activeChat, userName, messages } = props;

    //Current Chat Variable
    const chat = chats && chats[activeChat]; /* If chats exists, get active chat */

    //Render Only Those People Who Have Read The Message
    const renderReadReceipts = (message, isMyMessage) => {
        return chat.people.map((person, index) => person.last_read === message.id && (
            <div 
                key={`read_${index}`}
                className="read-receipt"
                style={{
                    float: isMyMessage ? 'right' : 'left',
                    backgroundImage: `url(${person.person.avatar?.sender?.avatar})`
                }}
            />
        ))
    }
    
    //Rendering Messages
    const renderMessages = () => {
        const keys = Object.keys(messages); /* Take Keys (ID's of specific messages) From Messages & Place Them In This Component */
        return keys.map((key, index) => {
            const message = messages[key];
            const lastMessageKey = index === 0 ? null : keys[index-1]; /* Basically Locating The Last Message*/
            const isMyMessage = userName === message.sender.username; /* Determining If Sender Of Message Is The Logged In User*/

            return (
                <div key={`msg_${index}`} style={{ width: '100%' }}>
                    <div className="message-block">
                        {
                            isMyMessage         /* If Message Is Sent By Logged In User, Render MyMessage Component */
                            ? <MyMessage message={message} />
                            : <TheirMessage message={message} lastMessage={messages[lastMessageKey]} />  /* Else, Render TheirMessage Component */
                        }
                    </div>
                    <div className="read-receipts" style={{marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px'}}>
                        {renderReadReceipts(messages, isMyMessage)}
                    </div>
                </div>
            )
        })
    }

    //Checking Whether There Are Chats To Render
    if (!chat) {
        return 'Loading...';
    }

    return (
        <div className="chat-feed">
            <div className="chat-title-container">
                <div className="chat-title">{ chat.title }</div>
                <div className="chat-subtitle">
                    {chat.people.map((person) => ` ${person.person.username}`)}
                </div>
            </div>
            {renderMessages()}
            <div style={{ height: '100px'}} />
            <div className="message-form-container">
                <MessageForm { ...props} chatId={activeChat}/> 
            </div>
        </div>
    )
}

export default ChatFeed;