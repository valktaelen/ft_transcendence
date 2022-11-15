import React from 'react'
import BackgroundAnimate from "../components/BackGroundAnimate";
import Footer from "../components/Footer";
import { accountService } from '../services/account.service';
import { apiPost } from '../api/post';

const Waiting = () => {
	const url = window.location.href;
	let params = (new URL(url)).searchParams;
    const code = params.get("code");
    if (!!code){
            console.log("start rersponde connect")
            const response = apiPost.PostConnectIntra(code);
	        response.then((response:any) => {
	        	if(response.status === 201){
                    accountService.saveToken(response.data.access_token);
                    window.location.href = '/game';
	        	}
	        }).catch((e) =>{
                console.log(e);
            });
    }else{
        window.location.href = '/';
    }

	return (
        <React.Fragment>
            <BackgroundAnimate name="waiting"/>
            <Footer/>
        </React.Fragment>
	)
}

export default Waiting;

