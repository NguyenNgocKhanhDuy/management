export function saveEmail(email: string) {
	localStorage.setItem("email", email);
}

export function getEmail() {
	return localStorage.getItem("email");
}

export function removeEmail() {
	localStorage.removeItem("email");
}

export function saveToken(token: string) {
	localStorage.setItem("token", token);
}

export function getToken() {
	return localStorage.getItem("token");
}

export function removeToken() {
	localStorage.removeItem("token");
}

export function setIsForgotPass(isForgotPass: boolean) {
	localStorage.setItem("isForgotPass", isForgotPass + "");
}

export function getIsForgotPass() {
	return localStorage.getItem("isForgotPass");
}

export function removeIsForgotPass() {
	localStorage.removeItem("isForgotPass");
}

export function setProjectId(id: string) {
	localStorage.setItem("idProject", id);
}

export function getProjectId() {
	return localStorage.getItem("idProject");
}

export function removeProjectId() {
	localStorage.removeItem("idProject");
}
