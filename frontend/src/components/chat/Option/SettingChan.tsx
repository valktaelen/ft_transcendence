import { Dispatch, FunctionComponent, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { Colors } from "../../Colors";
import {StyledContaiteClose, StyledContaiteViewAddChan, StyledContaiteViewAddOption, StyledContaiteViewAddP } from "../../Styles/StyleViewProfil"; 
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GOT } from "../../../shared/types";


interface IProps {
   profil: GOT.Profile | undefined;
   listUser:GOT.User[] | undefined;
   setProfil:Dispatch<React.SetStateAction<GOT.Profile | undefined>> | undefined;
   setAction:Dispatch<React.SetStateAction<string>>;
   setSetting:Dispatch<React.SetStateAction<boolean>>;
   setFriends:Dispatch<React.SetStateAction<GOT.User[] | undefined>> | undefined;
   friends:GOT.User[] | undefined;
   chanName: string;
}


const PopupChannelSetting:FunctionComponent<IProps> = (props: IProps) =>{
    const [add, setAdd] = useState("");
    const navigate = useNavigate();
    const handleClose = () => {
        props.setSetting(false);
    }

    const handleAdd = (name: string) => {
        setAdd(name); 
        props.setSetting(false);
        navigate(`/chat?code=${name}`)
    }

    const handleSettingChannel = (name: string) => {
        setAdd(name); 
        props.setSetting(false);
        navigate(`/chat?code=${name}&name=change&chanName=${props.chanName}`)
    }
    return (
        <StyledContaiteViewAddChan>
            {add === "" ?
            <motion.div
            initial={{x: 300, y: 0}}
            animate={{x:0, y:0}}
            transition={{duration: 1}}
            exit={{x: 100, y: 0}}>
            <StyledContaiteClose onClick={handleClose}>
                    <FaWindowClose size={30} color={Colors.dark1}/>
            </StyledContaiteClose>
            <StyledContaiteViewAddP className="addTitle">Setting Channel</StyledContaiteViewAddP>
            <StyledContaiteViewAddOption onClick={() => {handleSettingChannel("addChannel")}}>
                <StyledContaiteViewAddP >Status Channel</StyledContaiteViewAddP>
                <StyledContaiteViewAddP>{">"}</StyledContaiteViewAddP>
            </StyledContaiteViewAddOption>
            <StyledContaiteViewAddOption onClick={() => {handleAdd("addChannel")}}>
                <StyledContaiteViewAddP>User status</StyledContaiteViewAddP>
                <StyledContaiteViewAddP>{">"}</StyledContaiteViewAddP>
            </StyledContaiteViewAddOption>
            <StyledContaiteViewAddOption onClick={() => {handleAdd("joinChannel")}}>
                <StyledContaiteViewAddP>Leave</StyledContaiteViewAddP>
                <StyledContaiteViewAddP>{">"}</StyledContaiteViewAddP>
            </StyledContaiteViewAddOption>
            </motion.div> : <></>}
        </StyledContaiteViewAddChan>
    )
}

export default PopupChannelSetting;
