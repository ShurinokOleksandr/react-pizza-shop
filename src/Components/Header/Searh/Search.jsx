import React, {useCallback, useContext, useRef, useState} from 'react';
import clas from './Search.module.scss'
import deleteInputValueIcon from '../../../assets/img/closeIcon.svg'
import searchIcon from '../../../assets/img/searchIcon.svg'
import {SearchValueContext} from "../../../context/context";
import debounce from 'lodash.debounce'


const Search = () => {
    const [value ,setValue] = useState('')
    const {setSearchValue} = useContext(SearchValueContext)
    let inputRef = useRef()


    const FocusOnChangeInput =  useCallback(
        debounce((str) => {
            setSearchValue(str)
        },500)
        ,[])


    const onClickClear = () => {
        setSearchValue('')
        setValue('')
        inputRef.current.focus();
    }


    const onChangeInput = (e) => {
        setValue(e.target.value)
        FocusOnChangeInput(e.target.value)
    }

    return (
        <div className={clas.root}>
            <img className={clas.searchIcon} src={searchIcon} alt="searchIcon"/>
            <input
                ref={inputRef}
                className={clas.input}
                placeholder='Поиск пиццы...'
                type="text"
                value={value}
                onChange={onChangeInput}
            />
            {value &&
                <img onClick={onClickClear} className={clas.deleteInputValueIcon} src={deleteInputValueIcon} alt="deleteInput"/>}
        </div>
    );
};

export default Search;