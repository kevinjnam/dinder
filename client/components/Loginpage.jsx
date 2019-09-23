import React, { Component } from "react";

const Login = ({ User, Password, verification }) => {
	return (
		<div id="login">
			Login
			<div id="wrapUser">
				User:
				<input type="text" name="user" id="user" onChange={User}></input>
			</div>
			<div>
				Password:
				<input
					type="text"
					name="password"
					id="password"
					onChange={Password}
				></input>
			</div>
			<button name=" button" id="button" onClick={verification}>
				Login
			</button>
		</div>
	);
};
export default Login;
