import { StyledChat, StyledChatInput, StyledChatPrivAvatar, StyledChatPrive, StyledChatPrivName, StyledChatPlace, 
			StyledChatSendDiv, StyledChatSep, StyledChatSettingButton, StyledChatSwith, StyledChatSwithButton, StyledChatText, 
			StyledChatWindow, StyledContact, StyledContaite, StyledSender, StyledUser, StyledChatTextArea, StyledMenuNav, StyledMenuDiv, 
			StyledMenuSwitch, StyledAddInput, StyledAddInputdiv, StyledAddInputdivButton } from '../components/Styles/StyleChat';
import React, {useEffect, useState } from 'react';
import BackgroundAnimate from '../components/BackGroundAnimate';
import Footer from '../components/Footer';
import Header from '../components/Header';
import {Colors} from "../components/Colors"
import { AiFillSetting, AiOutlineSend } from 'react-icons/ai';
import { GrAddCircle } from 'react-icons/gr';
import { UserListPrivate, DataMesssage, SocketClient } from '../components/interfaces';
import {InfoServer, NotifyInter} from "../components/interfaces"
import {Notification} from "../components/Notify"
import { v4 as uuid } from 'uuid';
import { io } from 'socket.io-client';

const Chat = () => {
    const [notify, setNotify] = useState<NotifyInter>({isOpen: false, message:'', type:''});
    const [navActive, setNavActive] = useState("UnActiveMenu");
    const [chatSwitch, setChatSwitch] = useState<string>('private');
    const endRef = React.useRef<HTMLInputElement>(null);

    const [inputChat, setInputChat] = useState("");
    const [inputContact, setInputContact] = useState("");
    const [inputChannel, setInputChannel] = useState("");

    const [selectUser, setSelectUser] = useState<DataMesssage[]>();
    const [chatUser, setChatUser] = useState<UserListPrivate[]>([
    {id: uuid(), user: "waxdred", mute:false, block: false, active: false, data:[
        {id: uuid(), message: "salut", from: "pc"},
        {id: uuid(), message: "ca va?", from: "pc"},
        {id: uuid(), message: "super et toi?", from: "waxdred"},
        {id: uuid(), message: "quoi de neuf", from: "waxdred"},
    ]},
    {id: uuid(), user: "rcuminal", mute:false, block: false, active: false, data:[]},
    {id: uuid(), user: "aartiges", mute:false, block: false, active: false, data:[
        {id: uuid(), message: "test", from: "pc"},
        {id: uuid(), message: "de merde", from: "pc"},
        {id: uuid(), message: "super et toi?", from: "waxdred"},
    ]}
    ]);

    SocketClient.socket.on('connect', () => console.log("Connected to server"))
    function handChange(event: any, setInput: any, input: string){
        if (input === "" && event.target.value ==="\n")
            return;
		setInput(event.target.value);
	}	

    const handleUserSelector = (user: string) => {
        const newArr = chatUser.map(ls => {
            if (ls.user === user) {
                ls.active = true;
                return ls
            } else {
                ls.active = false;
                return ls
            }
        });
        setNavActive("UnActiveMenu");
        getuserSelect();
        setChatUser(newArr);
    }

    const getuserSelect = () => {
        chatUser.map(ls => {
            if (ls.active === true)
                setSelectUser(ls.data);
        })
    }

    const sendMsg = () => {
        //TODO send to db by socket
        if (inputChat === " " || inputChat === "\n" || inputChat === ""){
            setInputChat("");
            return;
        }
        let newMessage = selectUser;
        newMessage?.push({id: uuid(), message: inputChat, from: "pc"})
        console.log("emit to server")
        SocketClient.socket.emit('message', newMessage);
        setSelectUser(newMessage)
        setInputChat("");
    }

    const navMenu = () => {
        if (navActive === "ActiveMenu") {
            setNavActive("UnActiveMenu");
        } else setNavActive("ActiveMenu");
    }

    const addContact = () =>{
        //TODO check contact before add
        const add = {id: uuid(), user: inputContact, mute:false, block: false, active: false, data:[]}
        setChatUser(chatUser => [...chatUser, add])
        setNotify({isOpen: true, message: 'User ' + inputContact + ' is add', type:'success'});
        setInputContact('')
    }
	
    const addChannel = () =>{
        //TODO check contact before add
        setNotify({isOpen: true, message: 'Channel ' + inputChannel + ' is add', type:'success'});
        setInputChannel('')
    }
	return (
		<React.Fragment>
			<BackgroundAnimate name="contact"/>
            <Header colorHome={Colors.MenuDisable} colorGame={Colors.MenuDisable} colorLeadBoard={Colors.MenuDisable} colorChat={Colors.MenuActive}/>
            <StyledContaite>
                <StyledMenuSwitch>
                    <StyledMenuNav className={navActive} onClick={navMenu}>
                        <StyledMenuDiv className={navActive}></StyledMenuDiv>
                        <StyledMenuDiv className={navActive}></StyledMenuDiv>
                        <StyledMenuDiv className={navActive}></StyledMenuDiv>
                    </StyledMenuNav>
                    <StyledChatSwithButton color={chatSwitch === "private" ? Colors.ChatMenuButtonHover : "transparent"} 
									onClick={() => setChatSwitch("private")}>Private</StyledChatSwithButton>
                    <StyledChatSwithButton color={chatSwitch === "channel" ? Colors.ChatMenuButtonHover : "transparent"}
									onClick={() => setChatSwitch("channel")}>Channel</StyledChatSwithButton>
                </StyledMenuSwitch>
                <StyledContact className={navActive}>
                    <StyledChatSwith> 
                        <StyledChatSwithButton color={chatSwitch === "private" ? Colors.ChatMenuButtonHover : "transparent"}
									onClick={() => setChatSwitch("private")}>Private</StyledChatSwithButton>
                        <StyledChatSwithButton color={chatSwitch === "channel" ? Colors.ChatMenuButtonHover : "transparent"} 
									onClick={() => setChatSwitch("channel")}>Channel</StyledChatSwithButton>
                    </StyledChatSwith>
                    <StyledChatSep/>
                    {chatSwitch === "private" ?
                    <StyledAddInputdiv>
                        <StyledAddInput type="text" value={inputContact} placeholder='Add contact' onChange={(e) => handChange(e, setInputContact, inputContact)}
                                                                                                   onKeyDown={(e) => {
                                                                                                    if (e.key === 'Enter'){
                                                                                                        addContact();
                                                                                                    }}}/>
                        <StyledAddInputdivButton onClick={() => addContact()}>
                            <GrAddCircle size={"40px"}/>
                        </StyledAddInputdivButton>
                    </StyledAddInputdiv> :
                    <StyledAddInputdiv>
                        <StyledAddInput type="text" value={inputChannel} placeholder='Add channel' onChange={(e) => handChange(e, setInputChannel, inputChannel)}
                                                                                                   onKeyDown={(e) => {
                                                                                                    if (e.key === 'Enter'){
                                                                                                        addChannel();
                                                                                                    }}}/>
                        <StyledAddInputdivButton onClick={() => addChannel()}>
                            <GrAddCircle size={"40px"}/>
                        </StyledAddInputdivButton>
                    </StyledAddInputdiv>
                    }
                    <StyledChatPrive className={navActive}>
                <>
                    {chatSwitch === "private" ? chatUser.map((user:UserListPrivate) =>(
                        <StyledUser key={user.id} color={user.active ? Colors.ChatMenuButton : Colors.ChatMenu} onClick={() => handleUserSelector(user.user)}>
                            <StyledChatPrivAvatar/>
                        <StyledChatPrivName key={user.id}>{user.user}</StyledChatPrivName>
                        </StyledUser>
                    )) : ""}
                </>
                <>
                    {chatSwitch === "channel" ? chatUser.map((user:UserListPrivate) =>(
                        <StyledUser key={user.id} color={user.active ? Colors.ChatMenuButton : Colors.ChatMenu} onClick={() => handleUserSelector(user.user)}>
                        <StyledChatPrivName key={user.id}>channel</StyledChatPrivName>
                        <StyledChatSettingButton >
                            <AiFillSetting className='setting' size={15} color={Colors.ChatMenuButtonText}/>
                        </StyledChatSettingButton>
                        </StyledUser>
                    )): ""}
                </>
                    </StyledChatPrive>
                </StyledContact>

                <StyledChat>
                    <StyledChatWindow>
                        <StyledChatTextArea>
                            {selectUser?.map((data:DataMesssage) => (
                                    <StyledChatPlace key={data.id} className={data.from === "pc" ? "send" : "receive"}>
                                        <StyledChatText>{data.message}</StyledChatText>
                                    </StyledChatPlace>
                            ))}
                            <div className='field' ref={endRef}/>
                        </StyledChatTextArea>
                        <StyledChatSendDiv className={selectUser ? "active" : "deactive"}>
                        <StyledChatInput  name='chat' placeholder="Send message" onChange={(e) => handChange(e, setInputChat, inputChat)} 
                                                                                onKeyDown={(e) => {
                                                                                    if (e.key === 'Enter' && !e.shiftKey){
                                                                                        sendMsg();
                                                                                    }}}
                                                                                value={inputChat}/>
                        <StyledSender>
                            <AiOutlineSend size={30} color={Colors.primary} onClick={() => sendMsg()}/>
                        </StyledSender>
                        </StyledChatSendDiv>
                    </StyledChatWindow>
                </StyledChat>
            </StyledContaite>
            <Notification notify={notify} setNotify={setNotify}/>
			<Footer/>
		</React.Fragment>
	)
}

export default Chat;