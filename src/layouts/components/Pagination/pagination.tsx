import React from 'react';
import './pagination.scss';

interface IPaginationProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    itemsPerPage?: number;
    totalItems: number
}

const Pagination: React.FunctionComponent<IPaginationProps> = ({
                                                                   currentPage,
                                                                   setCurrentPage,
                                                                   itemsPerPage = 10,
                                                                   totalItems
                                                               }) => {

    const lastPage = Math.ceil(totalItems / itemsPerPage);

    const updatePage = (page: number, currentPage: number): void => {
        if (page !== currentPage) {
            setCurrentPage(page);
        }
    }

    const returnPages = (lastPage: number, currentPage: number) => {
        let listPages = [];
        while (lastPage !== 0) {
            listPages.push(lastPage);
            lastPage = lastPage - 1;
        }
        listPages.reverse();

        return (
            <div className="list_pages">
                {listPages && listPages.map((page, index) => {
                    return <span onClick={() => updatePage(page, currentPage)}
                                 className={page === currentPage ? 'current_page' : 'other_page'}
                                 key={index}>{page}</span>
                })}
            </div>
        )
    }

    if (totalItems && totalItems !== 0) {

        return (
            <div className="row_pagination">
                <div className="navigation_pages">
                    {currentPage !== 1 ? <span onClick={() => updatePage(currentPage - 1, currentPage)}
                                               className="action">Previous Page</span> : ''}

                    {lastPage > 1 ? returnPages(lastPage, currentPage) : ''}

                    {currentPage !== lastPage ?
                        <span onClick={() => updatePage(currentPage + 1, currentPage)}
                              className="action">Next Page</span> : ''}
                </div>
            </div>
        )
    }

    return <></>;
}

export default Pagination;
