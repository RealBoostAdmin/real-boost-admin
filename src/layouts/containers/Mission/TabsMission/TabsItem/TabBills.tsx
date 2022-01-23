import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import HeadSection from '../../../../components/HeadSection/HeadSection';
import {Paper, TableContainer} from '@mui/material';
import Table from '@mui/material/Table';
import {MissionModel} from '../../../../../core/models/mission/mission.model';
import TBodyBill from "../../Tables/TableBill/TBodyBill";
import THeadBill from "../../Tables/TableBill/THeadBill";
import {BillModel} from "../../../../../core/models/bill/bill.model";
import {getBillsOfMission} from "../../../../../core/service/bill/bill.service";
import MyModal from "../../../../components/Modal/MyModal";
import FormBill from "../../Forms/FormBill";
import {ProductModel} from "../../../../../core/models/product/product.model";
import {handleCloseHelper, handleOpenHelper} from "../../../../../core/helpers/modal/modal.helper";

interface IPropsTabBills {
    mission: MissionModel;
}

const TabBill: React.FC<IPropsTabBills> = ({mission}) => {
    const [billsOfMission, setBillsOfMission] = useState<BillModel[]>();
    const [bill, setBill] = useState<BillModel>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(new Date());
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = (bill: BillModel): void => handleOpenHelper(setBill, setOpen, bill);
    const handleClose = (updated?: boolean): void => handleCloseHelper(setDate, setBill, setOpen, updated);

    useEffect(() => {
        const fetchBillsOfMission = async () => {
            try {
                setLoading(true);
                const {data, error} = await getBillsOfMission(mission.id);
                if (error) {
                    setErrorMessage('Loading bills of mission has failed !');
                    toast.error('Loading bills of mission has failed !')
                } else {
                    setBillsOfMission(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchBillsOfMission();
    }, [date])

    return (
        <>
            <HeadSection
                title={`List of bills for the mission : ${mission.code}`}
                textButton={"Add Bill"}
                handleOpen={() => handleOpen(bill)}
            />
            {billsOfMission && billsOfMission.length !== 0 ? (
                    <>
                        <Paper>
                            <TableContainer>
                                <Table>
                                    <THeadBill/>
                                    <TBodyBill
                                        bills={billsOfMission}
                                        handleOpen={handleOpen}
                                        setDate={() => setDate(new Date())}
                                    />
                                </Table>
                            </TableContainer>
                        </Paper>
                    </>
                )
                : loading ? (
                    <p>Loading</p>
                ) : errorMessage ? (
                    <p>{errorMessage}</p>
                ) : (
                    <p>No bills available</p>
                )}
            <MyModal
                open={open}
                handleClose={handleClose}>
                <FormBill
                    mission={mission}
                    bill={bill}
                    handleClose={handleClose}
                />
            </MyModal>
        </>
    )
}

export default TabBill;
