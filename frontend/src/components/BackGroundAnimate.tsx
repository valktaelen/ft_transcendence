import { useState } from 'react';
import {StyledHexaArea, StyledContainer, StyledGrid, StyledHexaAreaLight} from "./Styles/StyleBackGround"

function BackgroundAnimate(props:{name:string}){
    //const w = window.innerWidth;
    //const h = window.innerHeight;
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
	if (props.name !== "game"){
    	document.addEventListener("mousemove", (e) => {
        	setX(e.clientX);
        	setY(e.clientY);
    	});
	}
    const sendX = x.toString() + "px";
    const sendY = y.toString() + "px";
    //const sendW = w.toString() + "px";
    //const sendH = h.toString() + "px";
	return (
        <StyledContainer>
            <StyledGrid id="hex-grid">
                <StyledHexaArea className='grid'/>
				{props.name === "game" ?
					<StyledHexaAreaLight className='game' x={sendX} y={sendY} /> : 
					<StyledHexaAreaLight className='light' x={sendX} y={sendY} />}
            </StyledGrid>
        </StyledContainer>
	)
}

export default BackgroundAnimate;

