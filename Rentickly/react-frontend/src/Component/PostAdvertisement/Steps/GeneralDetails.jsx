import React from 'react';
import { Field } from '@progress/kendo-react-form';
import { FormInput, FormRadioGroup,
    FormTextArea, FormFloatingNumericTextBox, FormDropDownList } from '../form-components';
import { propertyType, propertyLocation,petFriendly, leaseType } from "../data/data";
import { adTitleValidator, requiredValidator, propertyDescValidator, propertyRentAmountValidator } from '../validators';



const defaultItem = "Select Property Type";

const defaultItemLocation = propertyLocation[0];
const propertyLocationUpdated = propertyLocation.slice(1,propertyLocation.length); 

export const GeneralDetails = (
    <div>
        <Field
            key={'adTitle'}
            id={'adTitle'}
            name={'adTitle'}
            label={'Ad Title'}
            component={FormInput}
            validator={adTitleValidator}
        />
         <Field
            key={'propertyType'}
            id={'propertyType'}
            name={'propertyType'}
            label={'propertyType'}
            defaultItem={defaultItem}
            data={propertyType}
            component={FormDropDownList}
        />

        <Field
            key={'propertyDescription'}
            id={'propertyDescription'}
            name={'propertyDescription'}
            label={'Property Description'}
            validator={propertyDescValidator}
            component={FormTextArea}
        />
               <Field
            key={'rentAmount'}
            id={'rentAmount'}
            name={'rentAmount'}
            label={'Rent Amount'}
            validator={propertyRentAmountValidator}
            component={FormFloatingNumericTextBox }
        />
        <Field
            key={'petFriendly'}
            id={'petFriendly'}
            name={'petFriendly'}
            label={'Pet Friendly'}
            layout={'horizontal'}
            component={FormRadioGroup}
            data={petFriendly}
            validator={requiredValidator}
        />

        <Field
            key={'leaseType'}
            id={'leaseType'}
            name={'leaseType'}
            label={'Lease Type'}
            layout={'horizontal'}
            component={FormRadioGroup}
            data={leaseType}
            validator={requiredValidator}
        />
    </div>
);

export default GeneralDetails;