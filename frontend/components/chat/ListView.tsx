import Card from "./Card";
import DM from './DM'
import React, { useEffect, useState } from 'react';
import rooms from '../../rooms.json'
import direct from '../../dms.json'
import style from '../../styles/chat/ListView.module.css'
import stylee from '../../styles/chat/Card.module.css'
import {socket} from '../../pages/chat/[chat]'


function CreateNewRoom() {

    const [password, setPassword] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');

    const handlePasswordChange = (event: React.KeyboardEvent<HTMLInputElement>) => { setPassword(event.currentTarget.value); };
    const handleDescriptionChange = (event: React.KeyboardEvent<HTMLInputElement>) => { setDescription(event.currentTarget.value); };
    const handleTitleChange = (event: React.KeyboardEvent<HTMLInputElement>) => { setTitle(event.currentTarget.value); };

    const handleSubmitCreateNewRoom = () => {

        if (title === '' || description === '')
            return alert('all fields marked (*) must be filled');
        socket.emit('createRoom', { "title": title, "description": description, "privacy": (password !== ''), "password": password});
    }

    return (
        <div className={stylee.row}>
            <div className={stylee.column}>
                <div className={stylee.noHoverCard}>
                    <h3>Create New Room</h3>
                    <input placeholder="title *" className={stylee.input} type="text" onInput={handleTitleChange}></input><br />
                    <input placeholder="description *" className={stylee.input} type="text" onInput={handleDescriptionChange}></input><br />
                    <input placeholder="password (optional)" className={stylee.input} type="password" onInput={handlePasswordChange}></input><br />
                    <div className={style.buttonsHolder}>
                        <button onClick={handleSubmitCreateNewRoom} className={style.button}>Create New Room</button>
                    </div>

                </div>
            </div>
        </div>
    );

}


var pageLoaded = false; 

export default function ListView() {
    
    const [data, setData] = useState(rooms);
    const [dms, setDms] = useState(direct);
    const [tmp, setTMP] = useState(rooms);
    const [channel, setChannel] = useState('rooms');
    
    function OnRoomsClick() { socket.emit('findAllRooms'); setChannel('rooms'); setData(rooms); }
    function OnDMsClick() { socket.emit('conversation'); setChannel('friends'); setData(rooms); }

    

    if (!pageLoaded) {
        socket.emit('findAllRooms');
        pageLoaded = true;
    }

    socket.on('createRoom', ({ created }) => {
        console.log('oncreate=' + created);
        if (created)
            socket.emit('findAllRooms');
        else
            alert('went wrong :(');
    });

    socket.on('conversation', (arr) => {
        setChannel('friends'); 
        setData(rooms); 
        setDms(arr);
        setTMP(arr);
    });

    socket.on('findAllRooms', ({ rooms }) => {
        setData(rooms);
        setTMP(rooms);
    });

    const onSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.currentTarget.value.trim() != '') {
            const result = tmp.filter(function (data) {
                return data.title.includes(event.currentTarget.value);
            });
            setData(result);
        }
        else {
            socket.emit('findAllRooms');
        }
    };

    return (
        <div className={style.list}>
            <div className={style.buttonsHolder}>
                <button className={style.button} onClick={OnRoomsClick} >Rooms</button>
                <button className={style.button} onClick={OnDMsClick} >DMs</button>
            </div>
            <div className={style.searchHolder}>
                <input className={style.searchBar} type="text" placeholder="Search.." onInput={onSearch}></input>
            </div>
            <div className={style.scroll}>
                <div>
                    {channel === 'rooms' ? <CreateNewRoom /> : null}
                </div>
                {
                (channel == 'rooms') ?
                data.map(data => {
                    return (
                        <Card title={data.title} description={data.description} members={data.members} id={data.id} privacy={data.privacy} />
                    );
                })
                :
                dms.map(data => {
                    return (
                        <DM displayName={data.displayName} username={data.username} userId={data.userId} avatar={data.avatar} />
                    );
                })
                }
            </div>

        </div>
    );

}