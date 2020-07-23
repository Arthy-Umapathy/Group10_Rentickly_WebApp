import React, { Component } from 'react'; 

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import InsightsPanel from "./Panel";
import Footer from "../Footer/Footer";
import NavBar from "../LandingPage/NavBar";
import PdfReport from "./PdfReport"; 
import { PDFViewer } from '@react-pdf/renderer';
  


class Insights extends Component {

    render() {
        return (
            <div>
                <NavBar />
                <div style={{ marginTop: '50px' }} >
                    <InsightsPanel />
                    <PDFViewer>
                        <PdfReport />
                    </PDFViewer>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Insights; 