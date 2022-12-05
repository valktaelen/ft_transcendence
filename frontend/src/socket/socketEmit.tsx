import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { accountService } from "../services/account.service";
import { GOT } from "../shared/types";

let emitProfil = async (socket:Socket<DefaultEventsMap, DefaultEventsMap>) =>{
    socket.emit('server_profil', {Authorization: accountService.getToken()});
}

let emitFriends = async (socket:Socket<DefaultEventsMap, DefaultEventsMap>) =>{
    socket.emit('server_friends', {Authorization: accountService.getToken()});
}

let emitDemandFriend = async (socket:Socket<DefaultEventsMap, DefaultEventsMap>, username: string) => {
    socket.emit('server_demand_friend', {Authorization: accountService.getToken(), login: username})
}

let emitChangeUsername = async (socket:Socket<DefaultEventsMap, DefaultEventsMap>, username: string) => {
    socket.emit('server_change_username', {Authorization: accountService.getToken(), username: username})
}

let emitLeaderboard = async (socket:Socket<DefaultEventsMap, DefaultEventsMap>) => {
    socket.emit('server_leaderboard', {Authorization: accountService.getToken()})
}

let emitPrivmsg = async (socket:Socket<DefaultEventsMap, DefaultEventsMap>, login:string) => {
    socket.emit('server_privmsg', {Authorization: accountService.getToken(), login: login})
}

let emitSendPrivmsg = async (socket:Socket<DefaultEventsMap, DefaultEventsMap>, login:string, msg:GOT.msg) => {
    socket.emit('server_privmsg_send', {Authorization: accountService.getToken(), login: login, msg: msg})
}

let emitUsers = async (socket:Socket<DefaultEventsMap, DefaultEventsMap>) => {
    socket.emit('server_users', {Authorization: accountService.getToken()})
}
export const emitSocket ={
    emitProfil, emitFriends, emitDemandFriend, emitChangeUsername, emitLeaderboard, emitPrivmsg, emitSendPrivmsg, emitUsers

}
