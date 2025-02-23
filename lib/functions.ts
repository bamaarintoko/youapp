
import { chineseZodiac } from "./chineseZodiac";
import { zodiacSigns } from "./zodiacSigns";

type FormField = { value: string; error?: string; message?: string };
type FormObject = Record<string, FormField>;

export const cekEmpty = (formObject: FormObject): boolean => {
	return Object.values(formObject).some(field => field.value.trim() === '');
};

export const getZodiacSign = (dob: string) => {
	const day = parseInt(dob.slice(0, 2), 10);
	const month = parseInt(dob.slice(2, 4), 10);

	return zodiacSigns.find(({ start, end }) =>
		(month === start[0] && day >= start[1]) || (month === end[0] && day <= end[1])
	)?.name || "Unknown";
};

export const getChineseZodiac = (dob: string) => {
	const year = parseInt(dob.slice(4, 8), 10);
	return chineseZodiac[year % 12];
};

export function formatBirthday(dateString: string) {
	// Extract day, month, and year from the input
	const day = dateString.slice(0, 2);
	const month = dateString.slice(2, 4);
	const year = dateString.slice(4, 8);

	// Convert to a Date object
	const birthDate = new Date(`${year}-${month}-${day}`);

	// Get current date
	const today = new Date();
	let age = today.getFullYear() - birthDate.getFullYear();

	// Adjust age if birthday hasn't occurred yet this year
	const hasBirthdayPassed =
		today.getMonth() > birthDate.getMonth() ||
		(today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

	if (!hasBirthdayPassed) {
		age--;
	}

	return ` ${day} / ${month} / ${year} (Age ${age})`;
}

export const getFirebaseAuthErrorMessage = (error: string) => {
	switch (error) {
		case "auth/email-already-in-use":
			return "This email is already in use. Use a different email or try signing in.";
		case "auth/invalid-email":
			return "Invalid email. Please check again.";
		case "auth/weak-password":
			return "Password is too weak. Use at least 6 characters.";
		case "auth/user-not-found":
			return "User not found. Please sign up first.";
		case "auth/wrong-password":
			return "Incorrect password. Try again or reset your password.";
		case "auth/too-many-requests":
			return "Too many login attempts. Please try again later.";
		case "auth/invalid-email":
		case "auth/user-not-found":
		case "auth/wrong-password":
		case "auth/invalid-credential":
			return "Invalid credentials.";
		default:
			return "An error occurred. Please try again.";
	}
};

