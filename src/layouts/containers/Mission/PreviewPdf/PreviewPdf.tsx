import React, {useEffect, useState} from 'react';
import {BillModel} from '../../../../core/models/bill/bill.model';
import {supabase} from '../../../../core/supabase/client';
import {Document, Page} from 'react-pdf';

interface ITBodyBillProps {
    bill: BillModel;
    handleClose: () => void;
}

const PreviewPdf: React.FC<ITBodyBillProps> = ({bill, handleClose}) => {

    const [pdfFile, setPdfFile] = useState<any>();

    useEffect(() => {
        const loadPdf = async () => {
            try {
                const {data, error} = await supabase
                    .storage
                    .from('bills')
                    .download(bill.pdf_url)
                blobToBase64(data).then(res => {
                    console.log(res); // res is base64 now
                    if (!error) setPdfFile(res);
                });
            } catch (error) {
                console.log(error);
            }
        }
        loadPdf();
    }, [setPdfFile])


    const blobToBase64 = (blob: Blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise(resolve => {
            reader.onloadend = () => {
                resolve(reader.result);
            };
        });
    };

    return (
        <>
            <div>
                <a href={pdfFile} target="_blank">Download Pdf</a>
            </div>
        </>
    );
}

export default PreviewPdf;
