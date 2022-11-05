import React, { useState, useEffect, useRef } from 'react';
import { StyledLeftPad, StyledLeftPad1alias, StyledLeftPad2, StyledBall, StyledBallalias } from './game/StyleLeftPad';
import {User} from "./game/User"
import {StyledCursor} from "./Styles/StyleMouse"
import Async from "react-async"
import { useAsync } from "react-async"
import styled from 'styled-components';
import {StyledHexaArea, StyledContainer, StyledGrid, StyledHexaAreaLight} from "./Styles/StyleBackGround"



async function useInterval(callback: any, delay: number) {
	const savedCallback: any = useRef();
	
	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);
	
	// Set up the interval.
	useEffect(() => {
		function tick() {
			if (savedCallback.current)
			savedCallback.current();
		}
		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
		
  }


	// const [ball, setBall] = useState({
	// 	x : 100,
	// 	y : 100,
	// 	radius : 10,
	// 	velocityX : 1,
	// 	velocityY : 1,
	// 	speed : 7,
	// 	maph : 0,
	// 	mapw : 0,
	// });

	type ball = {
		x : number,
    	y : number,
		radius: number,
    	velocityX : number,
    	velocityY : number,
    	speed : number,
		maph : number,
		mapw : number,
	};

function resetBall(ball: ball, width: number, height: number){
    ball.x = width/2;
    ball.y = height/2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
}



async function update(ball: ball, setBall:any){
	const newBall = ball;
	// if( newBall.x - newBall.radius < 0 ){
    //     resetBall(newBall, newBall.mapw, newBall.maph);
    // }else if( newBall.x + newBall.radius > newBall.mapw){
    //     resetBall(newBall, newBall.mapw, newBall.maph);
    // }
	newBall.x += newBall.velocityX;
	newBall.y += newBall.velocityY;
	if(newBall.y - newBall.radius + 15 < 64 || newBall.y + newBall.radius > ball.maph - 40 - 15){
		newBall.velocityY = -newBall.velocityY;
    }
	if(newBall.x - newBall.radius + 15 < 0 || newBall.x + newBall.radius + 47 > ball.mapw){
		newBall.velocityX = -newBall.velocityX;
    }
	
	setBall(newBall);
}



const MousePadLeft = () => {
	
	const [ball, setBall] = useState({
		x : 100,
		y : 100,
		radius : 10,
		velocityX : 1,
		velocityY : 1,
		speed : 7,
		maph : 0,
		mapw : 0,
	});

	let	tmp: number;
	var mouseY;
	
	const [y, setY] = useState(0);
	const [count, setCount] = useState(0);
	useInterval(() => {
		
		update(ball, setBall);
		setCount(count + 1);
		
		
	}, 5);
	useInterval(() => {
		
		document.addEventListener("mousemove", (e) => {
			setY(e.pageY);
	
		});

	}, 50);
	var table = document.querySelector(".Table");
	var p1 = document.querySelector(".leftpad");
	
	if(table && p1) {
		
		var rect = table.getBoundingClientRect();
		var rect1 = p1.getBoundingClientRect();
		ball.mapw = rect.width;
		ball.maph = rect.height;
		
		
		if (y > rect.height - 40 - rect1.height / 2){
			tmp = rect.height - 40 - rect1.height / 2;
			mouseY = tmp.toString();
		}
		else if (y < 64 + rect1.height / 2){
			tmp = 64 + rect1.height / 2;
			mouseY = tmp.toString();
		}
		else
		mouseY = y.toString();
		
		
		
		
		
		
		
		
		
		
	}
	else{
		console.log("bug");}
		
		// let framePerSecond = 20;
	
		// let loop = setInterval((update),1000/framePerSecond);
		//let loop = setInterval(update,1000/framePerSecond);
		var X: number  = ball.x;
    	var Y: number = ball.y;
		
		X += 10;
		Y += 10;
		const sendX = X.toString() + "px";
		const sendY = Y.toString() + "px";
		return (
			<StyledLeftPad className="Table">
			
				
				<StyledHexaArea className='grid' x="0" y="0"/>
				<StyledHexaAreaLight className='light' x={sendX} y={sendY}/>
				<StyledLeftPad1alias className="leftpad" y={mouseY+"px"}></StyledLeftPad1alias>
				<StyledLeftPad2 className="rightpad"></StyledLeftPad2>
				<StyledBallalias className="ball"  x={ball.x.toString()+"px"} y={ball.y.toString()+"px"}></StyledBallalias>
	
		</StyledLeftPad>
	)
}




export default MousePadLeft;

//40 64