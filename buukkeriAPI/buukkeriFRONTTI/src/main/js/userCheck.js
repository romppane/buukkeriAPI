



export function userCheck(user){
	let loginState;
	if(user.user){
		loginState={
				id: user.id,
				fname: user.fname,
				lname: user.lname,
				email: user.email,
				pass: user.pass,
				phone: user.phone,
				user: user.user
		}
	}else if (user.sp){
		loginState={
				id: user.id,
				name: user.name,
				email: user.email,
				pass: user.pass,
				phone: user.phone,
				sp: user.sp
		}
	}else{
		
	}
	return loginState;
	
}