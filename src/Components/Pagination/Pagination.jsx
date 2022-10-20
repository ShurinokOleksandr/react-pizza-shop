import React from 'react';
import ReactPaginate from "react-paginate";
import clas from './Pagination.module.scss'
const Pagination = ({onChangePage}) => {
    return (
            <ReactPaginate
                className={clas.root}
                breakLabel="..."
                nextLabel=">"
                onPageChange={e => onChangePage(e.selected+1) }
                pageRangeDisplayed={4}
                pageCount={3}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
    );
};

export default Pagination;