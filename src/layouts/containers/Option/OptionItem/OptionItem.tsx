import React, {useState} from 'react';
import {Paper, TableContainer} from '@mui/material';
import Table from '@mui/material/Table';
import {OptionItemModel} from '../../../../core/models/option/option-item.model';
import TBodyOptionItem from '../Tables/TableOptionItem/TBodyOptionItem';
import THeadOptionItem from '../Tables/TableOptionItem/THeadOptionItem';
import FormOptionItem from '../Forms/FormOptionItem';
import HeadSection from '../../../components/HeadSection/HeadSection';
import MyModal from '../../../components/Modal/MyModal';
import {OptionModel} from '../../../../core/models/option/option.model';
import {handleCloseHelper, handleOpenHelper} from "../../../../core/helpers/modal/modal.helper";

interface IOptionItemProps {
    option: OptionModel;
    optionItems: OptionItemModel[];
    setDate: (date: Date) => void;
}

const OptionItem: React.FC<IOptionItemProps> = ({
                                                    option,
                                                    optionItems,
                                                    setDate
                                                }) => {
    const [optionItem, setOptionItem] = useState<OptionItemModel>();
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = (optionItem: OptionItemModel): void => handleOpenHelper(setOptionItem, setOpen, optionItem);
    const handleClose = (updated?: boolean): void => handleCloseHelper(setDate, setOptionItem, setOpen, updated);

    return (
        <>
            <HeadSection
                title={'List of the option items'}
                textButton={'Add Option items'}
                handleOpen={handleOpen}
            />
            {optionItems && optionItems.length !== 0 ? (
                <>
                    <Paper>
                        <TableContainer>
                            <Table>
                                <THeadOptionItem/>
                                <TBodyOptionItem
                                    optionItems={optionItems}
                                    handleOpen={handleOpen}
                                    setDate={() => setDate(new Date())}
                                />
                            </Table>
                        </TableContainer>
                    </Paper>
                </>
            ) : (
                <p>No option items available</p>
            )}
            <MyModal
                open={open}
                handleClose={handleClose}>
                <FormOptionItem
                    option={option}
                    optionItem={optionItem}
                    handleClose={handleClose}
                />
            </MyModal>
        </>
    )
}

export default OptionItem;
