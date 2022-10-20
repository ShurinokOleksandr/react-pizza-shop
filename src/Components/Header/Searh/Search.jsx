import React from 'react';
import clas from './Search.module.scss'
import deleteInputValueIcon from '../../../assets/img/closeIcon.svg'
import searchIcon from '../../../assets/img/searchIcon.svg'

const Search = ({searchValue,setSearchValue}) => {
    return (
        <div className={clas.root}>
            <img className={clas.searchIcon} src={searchIcon} alt="searchIcon"/>
            <input
                className={clas.input}
                placeholder='Поиск пиццы...'
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            {searchValue &&
                <img onClick={() => setSearchValue('')} className={clas.deleteInputValueIcon} src={deleteInputValueIcon} alt="deleteInput"/>}
        </div>
    );
};

export default Search;