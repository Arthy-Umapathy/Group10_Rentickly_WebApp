import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Form, FormElement } from '@progress/kendo-react-form';
import { Button } from '@progress/kendo-react-buttons';
import { Stepper } from '@progress/kendo-react-layout';
import { Link, useHistory } from "react-router-dom";
import  GeneralDetails from "./Steps/GeneralDetails";
import  MiscDetails  from './Steps/MiscelleneousDetails';
import OtherDetails from './Steps/OtherDetails';
import axios from "axios"; 
import { storage } from "../../../src/index"; 
import Footer from "../Footer/Footer";
import NavBar from "../LandingPage/NavBar";

const firebaseUrl = "gs://rentickly.appspot.com"

const stepPages = [ 
    GeneralDetails, 
    MiscDetails, 
    OtherDetails 
];

function PostAdvertisement() {
    const [step, setStep] = React.useState(0);
    const [formState, setFormState] = React.useState({});

    const [steps, setSteps] = React.useState([
        { label: 'Ad Details', isValid: undefined },
        { label: 'Property Details', isValid: undefined },
        { label: 'Other Details', isValid: undefined }
    ]);

    function handleUpload(image, imageName) {
        const upload = storage.ref(`advertisements/tesUser/${imageName}`).put(image);
        upload.on(
            "state_changed",
            snapshot => {},
            err => {
                console.log(err);
            }
        )
    }

    const history = useHistory();
    function redirectHome() {
        history.push("/");
      }

    function getEmailId() {
         return localStorage.getItem('email');  
    }
    

    const lastStepIndex = steps.length - 1;
    const isLastStep = lastStepIndex === step;

    const onStepSubmit = React.useCallback(
        (event) => {
            const { isValid, values } = event;

            const currentSteps = steps.map((currentStep, index) => ({
                ...currentStep,
                isValid: index === step ? isValid : currentStep.isValid
            }));

            setSteps(currentSteps);

            if (!isValid) {
                return;
            }

            setStep(() => Math.min(step + 1, lastStepIndex));
            setFormState(values);

            if (isLastStep) {
                alert(JSON.stringify(values));
                console.log(values, JSON.stringify(values)); 
                const adObject = values;
                adObject.applicationStatus = "submitted"
                adObject.email = getEmailId() 
                const imageUrls = [] 
                for(let i=0; i < values['propertyDocument'].length;i++) {
                    imageUrls.push(firebaseUrl + "/" + values['propertyDocument'][i].name)
                    handleUpload(values['propertyDocument'][i].getRawFile(),values['propertyDocument'][i].name,adObject.email)
                }
                adObject.imageUrls = imageUrls
                console.log("Before Post Request: ", adObject); 
                axios.post("/postAd/post", adObject)
                    .then(res => {
                        console.log(res); 
                    })
                    .catch(err => {
                        console.log(err); 
                    })
                // alert("Application sent successfully: ", values);
                redirectHome()
            }
        },
        [step, steps, setSteps, setStep, setFormState, isLastStep]
    );

    const onPrevClick = React.useCallback(
        (event) => {
            event.preventDefault();
            setStep(() => Math.max(step - 1, 0));
        },
        [step, setStep]
    );

    return (
        <div>
            <NavBar />
                <div style={{ display: 'flex', marginTop: '50px', flexDirection: 'column', justifyContent: 'center' }}>
                <Stepper value={step} items={steps} />
                <Form 
                    initialValues={formState}
                    onSubmitClick={onStepSubmit}
                    render={(formRenderProps) => (
                        <div style={{ alignSelf: 'center' }}>
                            <FormElement style={{ width: 480 }}>
                                {stepPages[step]}
                                <span style={{ marginTop: '40px' }} className={'k-form-separator'} />
                                <div
                                    style={{ border: '1px',  justifyContent: 'space-between', alignContent: 'center' }}
                                    className={'k-form-buttons k-buttons-end'}
                                >
                                    <span style={{ alignSelf: 'center' }}>Step {step + 1} of 3</span>
                                    <div>
                                        {
                                            step !== 0 ? (
                                                <Button style={{ marginRight: '16px' }} onClick={onPrevClick}>
                                                    Previous
                                                </Button>
                                            ) : undefined
                                        }
                                        <Link to="/">
                                            <Button
                                                primary={true}
                                                disabled={!formRenderProps.allowSubmit}
                                                onClick={formRenderProps.onSubmit}
                                            >
                                                {isLastStep ? 'Submit' : 'Next'}
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </FormElement>
                        </div>
                    )}
                />
            </div>
            <Footer />
        </div>
      
    );
};

export default PostAdvertisement;