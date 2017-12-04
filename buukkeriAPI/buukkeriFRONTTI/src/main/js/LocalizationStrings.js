


import LocalizedStrings from 'react-localization';










export  let strings = new LocalizedStrings({
	fin:{
		picture:"TÄMÄ KUVA EI TOIMI",
		register: "Rekisteröidy",
		firstname: "Etunimi",
		surname: "Sukunimi",
		email: "Sähköposti",
		telnum: "Puhelinnumero",
		password: "Salasana",
		submit: "Vahvista",
		close: "Sulje",
		confirm: "Vahvista salasana",
		login: "Kirjaudu sisään",
		errdialpasswdmatch: "Salasana ja salasanan vahvistus täytyy olla sama",
		errdialfillall: "Täytä kaikki kentät ja yritä uudelleen",
		errdialcheckemail: "Tarkasta sähköposti",
		errdialcheckphone: "Virheellinen puhelin numero",
		

	},
	en: {
		picture:"THIS IS NOT WORKING",
		register: "Register",
		firstname: "Firstname",
		surname: "Surname",
		email: "Email",
		telnum: "Phone number",
		password: "Password",
		submit: "Submit",
		close: "Close",
		confirm: "Confirm Password",
		login: "Login",
		errdialpasswdmatch: "Passwords are not matching",
		errdialfillall: "Fill in all the fields and try again",
		errdialcheckemail: "Check email",
		errdialcheckphone: "Phone number is incorrect"

	}
});
strings.setLanguage('en');





