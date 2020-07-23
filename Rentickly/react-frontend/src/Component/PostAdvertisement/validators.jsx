import React from 'react';
import { getter } from '@progress/kendo-react-common';

const emailRegex = new RegExp(/\S+@\S+\.\S+/);
const phoneRegex = new RegExp(/^[0-9 ()+-]+$/);
const ccardRegex = new RegExp(/^[0-9-]+$/);
const cvcRegex = new RegExp(/^[0-9]+$/);
const zipCodeRegex = new RegExp(/^[a-zA-Z][0-9][a-zA-Z]\s?[0-9][a-zA-Z][0-9]$/);


export const termsValidator = (value) => value ? "" : "It's required to agree with Terms and Conditions.";
export const emailValidator = (value) => !value ?
            "Email field is required." :
            (emailRegex.test(value) ? "" : "Email is not valid format." );
export const nameValidator = (value) => !value ?
            "Full Name is required" :
            value.length < 7 ? "Full Name should be at least 7 characters long." : "";

export const streetAddressValidator = (value) => !value ?
    "Street Address can't be left empty": ""; 
            
export const adTitleValidator = (value) => !value ?
            "Ad Title is required" :
            value.length < 8 ? "Ad Title should be at least 3 characters long." : "";

export const zipCodeValidator = (value) => !value ?
            "Zip Code is required" :
            value.length < 6 || value.length > 6 ? "Zip Code must containe 6 characters only": 
                (zipCodeRegex.test(value)) ? "" :"Please enter a valid zip code"

export const propertyDescValidator = (value) => !value ? "Please enter the property Description" : "";

export const propertyRentAmountValidator = (value) => !value ? "Rent Amount can't be left empty": ""; 

export const contactTimingValidator = (value) => !value? "Contact Timing Field can't be left empty": ""; 

export const phoneValidator = (value) => !value ?
            "Phone number is required." :
            phoneRegex.test(value) ? "" : "Not a valid phone number.";
export const cardValidator = (value) => !value ?
            "Credit card number is required. " :
            ccardRegex.test(value) ? "" : "Not a valid credit card number format.";
export const cvcValidator = (value) => !value ?
            "CVC code is required," :
            cvcRegex.test(value) || value.length !== 3 ? "" : "Not a valid CVC code format.";
export const guestsValidator = (value) => !value ?
            "Number of guests is required" :
            value < 5 ? "" : "Maximum 5 guests";
export const nightsValidator = (value) => value ? "" : "Number of Nights is required";
export const arrivalDateValidator = (value) => value ? "" : "Arriaval Date is required";
export const colorValidator = (value) => value ? "" : "Color is required.";
export const requiredValidator = (value) => value ? "" : "Error: This field is required.";
export const passwordValidator = (value) => value && value.length > 8 ? '' : 'Password must be at least 8 symbols.';

const userNameGetter = getter('username');
const emailGetter = getter('email');

export const formValidator = (values) => {
    const userName = userNameGetter(values);
    const emailValue = emailGetter(values);

    if (userName && emailValue && emailRegex.test(emailValue)) {
        return {};
    }

    return {
        VALIDATION_SUMMARY: 'Please fill the following fields.',
        ['username']: !userName ? 'User Name is required.' : '',
        ['email']: emailValue && emailRegex.test(emailValue) ? '' : 'Email is required and should be in valid format.'
    };
};