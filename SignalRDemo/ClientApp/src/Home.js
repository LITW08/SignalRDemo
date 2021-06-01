import React, { useEffect, useState, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import axios from 'axios';

const Home = () => {

    const [chatMessage, setChatMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);

    const connectionRef = useRef(null);

    useEffect(() => {

        const connectToHub = async () => {
            const connection = new HubConnectionBuilder().withUrl("/chat").build();
            await connection.start();
            connection.invoke('newUser');
            connectionRef.current = connection;

            connection.on('newUser', obj => {
                setTotalUsers(obj.count);
            });

            connection.on('newMessage', obj => {
               setMessages(obj);
            });

            connection.on('guidRequested', () => {
                console.log('someone somewhere asked for a guid');
            })

        }

        connectToHub();

    }, []);


    const onSendClick = async () => {
        const connection = connectionRef.current;
        connection.invoke('sendMessage', { message: chatMessage });
        setChatMessage('');
    }


    const getGuid = async () => {
        const { data } = await axios.get('/api/sample/getdata');
        console.log(data);
    }

    return (
        <div className="container">

            <div style={{ marginTop: 100 }}>
                <h2>Total users: {totalUsers}</h2>
                <div className="row">
                    <div className="col-md-8">
                        <input className="form-control" onChange={e => setChatMessage(e.target.value)}
                            value={chatMessage}
                            type="text" placeholder="Enter chat message..." />
                    </div>
                    <div className="col-md-2">
                        <button onClick={onSendClick} className="btn btn-primary">Send Message</button>
                    </div>
                </div>
            </div>
            <div>
                <ul>
                    {messages.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
            </div>
            <div className="row">
                <button onClick={getGuid} className='btn btn-success'>Get Guid</button>
            </div>
        </div>
    )
}

export default Home;


