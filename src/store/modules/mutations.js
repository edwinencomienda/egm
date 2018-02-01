/**
 * setToken
 * @param  {State} state AuthStore State
 * @param  {String} token  authenticated user access token
 * @return void
 */
export const setToken = (state, response) => {
	// Store access_token ot LocalStorage
	const data = {
		access_token: response.access_token,
		expire_date: Date.now() + (response.expires_in * 1000),
	};
	localStorage.setItem("access_token", data.access_token);
	localStorage.setItem("expire_date", data.expire_date);
	state.user.authenticated = true;
};

/**
 * setUserData
 * @param  {State} state AuthStore State
 * @param  {JSON} data  Authenticated User Initial data
 * @return void
 */
export const setUserData = (state, data) => {
	localStorage.setItem('role',data.me.role);
	state.user.data = data;
};

/**
 * setToken
 * @param  {State} state AuthStore State
 * @param  {String} token  authenticated user access token
 * @return void
 */
export const logout = state => {
	// Store access_token ot LocalStorage
	localStorage.removeItem("access_token");
	localStorage.removeItem("expire_date");
	localStorage.removeItem('role');
	state.user.authenticated = false;
	state.user.data = null;
};
