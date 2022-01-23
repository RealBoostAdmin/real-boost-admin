import React, {useState} from 'react';
import {TableBody, TableCell, TableRow} from '@mui/material';
import {toast} from 'react-toastify';
import {BillModel} from '../../../../../core/models/bill/bill.model';
import {deleteBill} from '../../../../../core/service/bill/bill.service';
import {deleteFiles} from '../../../../../core/helpers/storage/storage.helper';
import ActionButton from '../../../../components/Table/ActionButtons/ActionButtons';
import ImageUpload from '../../../../components/Forms/FileUpload/ImageUpload';
import {handleCloseHelper, handleOpenHelper} from '../../../../../core/helpers/modal/modal.helper';
import MyModal from '../../../../components/Modal/MyModal';
import PreviewPdf from '../../PreviewPdf/PreviewPdf';

interface ITypesTBodyBill {
    handleOpen: (bill?: BillModel) => void;
    bills: BillModel[];
    setDate: () => void;
}

const TBodyBill = ({
                       handleOpen,
                       bills,
                       setDate,
                   }: ITypesTBodyBill) => {

    const [bill, setBill] = useState<BillModel>();
    const [openModalPdf, setOpenModalPdf] = useState<boolean>(false);
    const handleOpenPdf = (bill: BillModel): void => handleOpenHelper(setBill, setOpenModalPdf, bill);
    const handleClosePdf = (updated?: boolean): void => handleCloseHelper(setDate, setBill, setOpenModalPdf, updated);

    const removeBill = async (bill: BillModel): Promise<void> => {
        try {
            const {error} = await deleteBill(bill.id);
            if (error) {
                toast.error('Delete bill has failed !')
            } else {
                const {errorFile} = await deleteFiles('bills', [bill.pdf_url]);
                if (errorFile) {
                    console.log(errorFile);
                    toast.error('Error on delete previous pdf files');
                }
                toast.success('The bill has been removed.')
                setDate();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <TableBody>
                {(bills && bills.length !== 0) && (
                    bills.length !== 0 && bills.map((bill: BillModel) => (
                        <TableRow key={bill.id} hover role="checkbox" tabIndex={-1}>
                            <TableCell
                                key={bill.code}
                                align={'center'}
                            >
                                <b>{bill.code}</b>
                            </TableCell>
                            <TableCell align={'center'} onClick={() => handleOpenPdf(bill)}>
                                <ImageUpload
                                    url={bill?.pdf_url}
                                    size={75}
                                    storageName={'bills'}
                                />
                            </TableCell>
                            <TableCell
                                align={'center'}
                            >
                                <b>{bill.user.username}</b>
                            </TableCell>
                            <ActionButton
                                model={bill}
                                handleOpen={handleOpen}
                                deleteItem={() => removeBill(bill)}
                            />
                        </TableRow>
                    ))
                )}
            </TableBody>
            <MyModal
                open={openModalPdf}
                handleClose={handleClosePdf}>
                <PreviewPdf
                    bill={bill}
                    handleClose={handleClosePdf}
                />
            </MyModal>
        </>
    )
}

export default TBodyBill;
