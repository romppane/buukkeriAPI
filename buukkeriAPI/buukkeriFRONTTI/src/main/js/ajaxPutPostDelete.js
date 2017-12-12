

const LOCALHOST = 'http://localhost:8090/';

export function callUser(method,url,data){
	return new Promise((resolve, reject)=>{
		const call = new XMLHttpRequest();
		call.open(method,LOCALHOST+url);
		call.onload = ()=> resolve(call.responseText);
		call.onerror = ()=> reject(call.statusText);
		call.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		call.send(data);
		
	});
}