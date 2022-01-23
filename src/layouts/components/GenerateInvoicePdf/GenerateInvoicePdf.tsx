import React from 'react';
import {Text, View, Document, Page, StyleSheet, PDFViewer} from '@react-pdf/renderer';
import {MissionModel} from '../../../core/models/mission/mission.model';
import {UserModel} from '../../../core/models/user/user.model';

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft: 60,
        paddingRight: 60,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    logo: {
        width: 74,
        height: 66,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});

interface IPropsGenerateInvoicePdf {
    mission: MissionModel;
    user: UserModel;
}

const GenerateBillPdf: React.FC<IPropsGenerateInvoicePdf> = ({mission, user}) => {
    return (
        <PDFViewer>
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <Text>TEST FIRST INVOICE STORED</Text>
                    {/*<Image style={styles.logo} src={logo} />
                <InvoiceTitle title='Invoice'/>
                <InvoiceNo invoice={invoice}/>
                <BillTo invoice={invoice}/>
                <InvoiceItemsTable invoice={invoice} />*/}
                </View>
            </Page>
        </Document>
        </PDFViewer>
    )
};

export default GenerateBillPdf
