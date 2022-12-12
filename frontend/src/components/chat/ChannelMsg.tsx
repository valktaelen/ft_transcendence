
import { Dispatch, FunctionComponent, useContext, useEffect, useRef, useState } from "react";
import { v4 as uuid } from 'uuid';
import { accountService } from "../../services/account.service";
import { GOT } from "../../shared/types";
import { emitSocket } from "../../socket/socketEmit";
import { offSocket } from "../../socket/socketOff";
import { onSocket } from "../../socket/socketOn";
import { SocketContext } from "../../socket/socketPovider";
import { StyledChat, StyledChatInput, StyledChatPlace, StyledChatSendDiv, StyledChatText, StyledChatTextArea, StyledChatWindow } from "../Styles/StyleChat";


interface IProps {
   profil: GOT.Profile | undefined;
   setProfil:Dispatch<React.SetStateAction<GOT.Profile | undefined>> | undefined;
   chanName: string;
   active: string;
}

const ChannelMsg:FunctionComponent<IProps> = (props:IProps)=> {
    const [handleSocket, setHandleSocket] = useState<string>('');
    const bottomChat = useRef<null | HTMLDivElement>(null);
    const [inputChat, setInputChat] = useState("");
    const socket = useContext(SocketContext)
    const codeParam: Map<string, string> = accountService.getParamsPriv();

    const [selectChanMsg, setSelectChanMsg] = useState<GOT.MsgChannel[]>();
    useEffect(() => {
        //  scroll to bottom every time messages change
        bottomChat.current?.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'start' });
    }, [socket, setSelectChanMsg, selectChanMsg]);

    useEffect(() =>{
        if (codeParam.get("code") === "Priv" && !codeParam.get("name")){
            setSelectChanMsg(undefined);
        }
    }, [codeParam])
    
    useEffect(() => {
        //receive list message
        onSocket.client_channelMsg(socket, setSelectChanMsg);
        return () => {
            offSocket.client_channelMsg(socket);
        } 
    },[socket, setSelectChanMsg, selectChanMsg])

    useEffect(() =>{
        emitSocket.emitChannelMsg(socket, props.chanName)
    }, [socket])

    useEffect(() => {
        //receive send
        // socket.on('client_privmsg_send', (rep:GOT.msg) => {
        //     if (rep.userFrom.login === props.userSelect?.login){
        //         if (selectChanMsg){
        //             let tmp:GOT.msg[] = selectChanMsg; 
        //             tmp.push(rep);
        //             setSelectUserMsg(tmp);
        //         }else{
        //             let tmp:GOT.msg[] = []; 
        //             tmp.push(rep);
        //             setSelectUserMsg(tmp);
        //         }
        //     }else{
        //         emitSocket.emitPrivmsgUsers(socket);
        //     }
        // })
        // return () => {
        //     offSocket.client_privmsg_send(socket);
        // } 
    },[socket, setSelectChanMsg, selectChanMsg])

    function handChange(event: any, setInput: any, input: string){
        if (input === "" && event.target.value ==="\n")
            return;
		setInput(event.target.value);
	}	

    const sendMsg = () => {
        if (inputChat === " " || inputChat === "\n" || inputChat === ""){
            return;
        }
        if (props.profil && props.chanName){
            // const msg:GOT.msg = {userFrom: props.profil.userInfos, userTo:props.chanName, msg: inputChat};
            // emitSocket.emitSendPrivmsg(socket, props.userSelect.login, msg.msg);
        }
        setInputChat("");
    }

    return (
            <StyledChat className={props.active}>
                <StyledChatWindow>
                    <StyledChatTextArea>
                        {selectChanMsg?.map((data:GOT.MsgChannel) => (
                                <StyledChatPlace key={uuid()} className={data.userFrom.login === props.profil?.userInfos.login ? "send" : "receive"}>
                                    <StyledChatText>{data.msg}</StyledChatText>
                                </StyledChatPlace>
                        ))}
                        <div className='field' ref={bottomChat}/>
                    </StyledChatTextArea>
                    <StyledChatSendDiv className={selectChanMsg ? "active" : "deactive"}>
                    <StyledChatInput  name='chat' placeholder="Send message"  onChange={(e) => handChange(e, setInputChat, inputChat)} 
                                                                            onKeyDown={(e) => {
                                                                                if (e.key === 'Enter' && !e.shiftKey){
                                                                                    sendMsg();
                                                                                }}}
                                                                            value={inputChat} autoFocus/>
                    </StyledChatSendDiv>
                </StyledChatWindow>
            </StyledChat>
    )
}
export default ChannelMsg;
