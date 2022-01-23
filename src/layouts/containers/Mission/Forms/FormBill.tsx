import React, {useState} from 'react';
import {makeStyles} from '@mui/styles';
import Button from '@mui/material/Button';
import {useForm} from 'react-hook-form';
import HeaderFormModal from '../../../components/Forms/HeaderFormModal/HeaderFormModal';
import {toast} from 'react-toastify';
import {MissionModel} from '../../../../core/models/mission/mission.model';
import {createBill, updateBill} from "../../../../core/service/bill/bill.service";
import {BillModel} from "../../../../core/models/bill/bill.model";
import {FormControl} from "@mui/material";
import ImageUpload from "../../../components/Forms/FileUpload/ImageUpload";
import {deleteFiles} from "../../../../core/helpers/storage/storage.helper";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import ErrorInputForm from "../../../components/Errors/ErrorInputForm/ErrorInputForm";
import {getUserByUsername} from "../../../../core/service/user/user.service";
import {billCodeGenerateHelper} from '../../../../core/helpers/code-generate/code-generate.helper';

type BillFormType = {
    pdf_url?: string;
    username?: string;
}

interface IAddBillProps {
    mission: MissionModel;
    bill?: BillModel;
    handleClose: (updated?: boolean) => void;
}

const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}))

const FormBill: React.FC<IAddBillProps> = ({
                                               mission,
                                               bill,
                                               handleClose
                                           }) => {
    const classes = useStyles();
    const {register, formState, handleSubmit} = useForm<BillFormType>({mode: 'onChange'})
    const {isSubmitting, isValid, errors} = formState;
    const [billPdf, setBillPdf] = useState(null);
    const [oldFiles, setOldFiles] = useState<string[]>([]);

    const addBill = async (postData: BillFormType): Promise<void> => {
        try {
            const {user, errorUser} = await getUserByUsername(postData.username);
            if (errorUser || !user || user.length !== 1) {
                toast.error(`Can't find user with the username ${postData.username}`);
            } else {
                const {dataBill, errorBill} = await createBill({
                    pdf_url: billPdf,
                    code: await billCodeGenerateHelper(mission.id),
                    user_id: user[0].id,
                    mission_id: mission.id
                });
                if (errorBill) {
                    toast.error('Add bill has failed !');
                } else {
                    if (oldFiles) {
                        const {errorFile} = await deleteFiles('bills', oldFiles);
                        if (errorFile) {
                            console.log(errorFile);
                            toast.error('Error on delete previous pdf files');
                        }
                    }
                    toast.success(`The bill ${dataBill.code} has been added !`);
                    handleClose(true);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editBill = async (patchData: BillFormType): Promise<void> => {
        try {
            const {user, errorUser} = await getUserByUsername(patchData.username);
            if (errorUser || !user || user.length !== 1) {
                toast.error(`Can't find user with the username ${patchData.username}`);
            } else {
                const {data, error} = updateBill({pdf_url: billPdf, user_id: user[0].id}, bill.id);
                if (error) {
                    toast.error('Edit bill has failed !');
                } else {
                    if (oldFiles) {
                        const {errorFile} = await deleteFiles('bills', oldFiles);
                        if (errorFile) {
                            console.log(errorFile);
                            toast.error('Error on delete previous pdf files');
                        }
                    }
                    toast.success(`The bill ${data.code} has been edited !`);
                    handleClose(true);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <HeaderFormModal
                title={bill ? 'Edit a bill' : 'Add a bill'}
            />
            <form onSubmit={handleSubmit(bill ? editBill : addBill)} className={classes.form}>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Username of the booster for the bill</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="username"
                        placeholder={'Username'}
                        id="username-input"
                        {...register('username', {required: 'This field is required.'})}
                        error={!!errors.username}
                    />
                    {errors.username && <ErrorInputForm errorMessage={errors.username.message}/>}
                </FormControl>
                <FormControl sx={{my: 2}}>
                    <ImageUpload
                        url={billPdf ? billPdf : bill ? bill?.pdf_url : null}
                        size={150}
                        onUpload={(url) => setBillPdf(url)}
                        storageName={'bills'}
                        oldFiles={oldFiles}
                        setOldFiles={setOldFiles}
                    />
                </FormControl>
                <Button
                    sx={{marginTop: '1rem'}}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                >
                    {bill ? 'Edit' : 'Create'}
                </Button>
            </form>
        </>
    )
}

export default FormBill;
