import React, {useEffect, useState} from 'react';
import {FilterEnabledModel} from '../../../../core/models/utils/filters/filterEnabled.model';
import Pagination from '../../../components/Pagination/pagination';
import {handleFiltersChange} from '../../../../core/helpers/filters/filter-enabled.helper';
import {Paper, TableContainer} from '@mui/material';
import Table from '@mui/material/Table';
import MyModal from '../../../components/Modal/MyModal';
import SearchInput from '../../../components/SearchInput/SearchInput';
import {toast} from 'react-toastify';
import HeadSection from "../../../components/HeadSection/HeadSection";
import {QuestionFilterModel, QuestionModel} from '../../../../core/models/question/question.model';
import {getCountQuestions, getFiltersQuestion, getQuestions} from '../../../../core/service/question/question.service';
import FiltersQuestion from '../FilterQuestion/FiltersQuestion';
import THeadQuestion from '../TableQuestion/THeadQuestion';
import TBodyQuestion from '../TableQuestion/TBodyQuestion';
import FormQuestion from '../Forms/FormQuestion';
import {handleCloseHelper, handleOpenHelper} from "../../../../core/helpers/modal/modal.helper";
import {useDebouncedFunction} from "../../../../core/helpers/debounce/debounce.helper";

const QuestionPage: React.FC = () => {
    const [questions, setQuestions] = useState<QuestionModel[]>();
    const [question, setQuestion] = useState<QuestionModel>();
    const [countQuestions, setCountQuestions] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>();
    const [filters, setFilters] = useState<QuestionFilterModel>();
    const [filtersEnabled, setFiltersEnabled] = useState<FilterEnabledModel[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [date, setDate] = useState<Date>(new Date());
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = (question: QuestionModel): void => handleOpenHelper(setQuestion, setOpen, question);
    const handleClose = (updated?: boolean): void => handleCloseHelper(setDate, setQuestion, setOpen, updated);

    const fetchQuestionsAndCount = async () => {
        try {
            setLoading(true);
            const {data, error} = await getQuestions(filtersEnabled, currentPage, search);
            if (error) {
                setErrorMessage('Loading questions has failed !');
                toast.error('Loading questions has failed !')
            } else {
                setQuestions(data);
            }
            const query = await getCountQuestions(filtersEnabled, search);
            if (query.error) {
                setErrorMessage('An error has appeared on the loading of the count of questions !');
                toast.error('An error has appeared on the loading of the count of questions !')
            } else {
                setCountQuestions(query.count);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    useDebouncedFunction(fetchQuestionsAndCount, [search, filtersEnabled, currentPage, date], 500);

    // Get the list of the filters for the Question page
    useEffect(() => {
        const fetchFilters = async () => {
            try {
                setLoading(true);
                const {listValues, error} = await getFiltersQuestion();
                if (error) {
                    setErrorMessage('An error has appeared on the loading of the filters !');
                    toast.error('An error has appeared on the loading of the filters !')
                } else {
                    setFilters(listValues);
                }
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        fetchFilters();
    }, [setFilters])

    return (
        <>
            <HeadSection
                title={"List of the questions"}
                textButton={"Add Question"}
                handleOpen={handleOpen}
            />
            <SearchInput
                onSearch={(value: string) => {
                    setCurrentPage(1);
                    setSearch(value);
                }}
            />
            {<FiltersQuestion
                filters={filters}
                filtersEnabled={filtersEnabled}
                setFiltersEnabled={(filters) => handleFiltersChange(filters, setFiltersEnabled, setCurrentPage)}
            />}
            {questions && questions.length !== 0 ? (
                    <>
                        <Paper>
                            <TableContainer>
                                <Table>
                                    <THeadQuestion/>
                                    <TBodyQuestion
                                        questions={questions}
                                        handleOpen={handleOpen}
                                        setDate={() => setDate(new Date())}
                                    />
                                </Table>
                            </TableContainer>
                            {<Pagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalItems={countQuestions}
                            />}
                        </Paper>
                    </>
                )
                : loading ? (
                    <p>Loading</p>
                ) : errorMessage ? (
                    <p>{errorMessage}</p>
                ) : (
                    <p>No questions available</p>
                )}
            <MyModal
                open={open}
                handleClose={handleClose}>
                <FormQuestion
                    question={question}
                    handleClose={handleClose}
                />
            </MyModal>
        </>
    )
}

export default QuestionPage;
