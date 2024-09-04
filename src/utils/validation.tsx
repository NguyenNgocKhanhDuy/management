export function handleCheckEmail(email: string) {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
}

export function handleCheckPassword(password: string) {
	return password.length >= 8;
}
