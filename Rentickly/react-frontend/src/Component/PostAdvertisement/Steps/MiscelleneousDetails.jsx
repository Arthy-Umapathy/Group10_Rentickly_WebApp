import React from 'react';

import { Field } from '@progress/kendo-react-form';

import {
    FormInput, FormAutoComplete, FormRadioGroup,
    FormTextArea, FormFloatingNumericTextBox, FormDropDownList
} from '../form-components';

import {
    nameValidator, streetAddressValidator, zipCodeValidator
} from '../validators';

import {
    propertyType, propertyLocation 
} from "../data/data";

const defaultItemLocation = "Select Location";

export const MiscDetails = (
    <div>

    <Field
            key={'streetAddress'}
            id={'streetAddress'}
            name={'streetAddress'}
            label={'Street Address'}
            component={FormInput}
            validator={streetAddressValidator}
        />
         <Field
            key={'propertyLocation'}
            id={'propertyLocation'}
            name={'propertyLocation'}
            label={'Property Location'}
            defaultItem={defaultItemLocation}
            data={propertyLocation}
            component={FormDropDownList}
        />

        <Field
            key={'propertyZipCode'}
            id={'propertyZipCode'}
            name={'propertyZipCode'}
            label={'Zip Code'}
            component={FormInput}
            validator={zipCodeValidator}
        />

    </div>
);

export default MiscDetails;