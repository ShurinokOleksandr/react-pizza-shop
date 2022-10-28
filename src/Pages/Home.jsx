import React, {useContext, useEffect, useRef, useState} from 'react';
import Categories from "../Components/Categories/Categories";
import Sort, {parameters} from "../Components/Sort/Sort";
import SkeletonPizzaBlock from "../Components/PizzaBlock/SkeletonPizzaBlock";
import PizzaBlock from "../Components/PizzaBlock/PizzaBlock";
import Pagination from "../Components/Pagination/Pagination";
import {SearchValueContext} from "../context/context";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage, setFilters} from "../features/filter/filterSlice";
import axios from "axios";
import qs from "qs";
import {useNavigate} from "react-router-dom";


const Home = () => {
    const [items,setItems] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const {searchValue} = useContext(SearchValueContext)
    const {categoryId,sort,currentPage} = useSelector( state => state.filterSlice)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isSearch = useRef(false)
    const isMount = useRef(false)


    useEffect(() => {
        if(isMount.current){
            const queryString = qs.stringify({
                criteriaSort:sort.criteriaSort,
                categoryId,
                currentPage,
            })
            navigate(`?${queryString}`)
        }
        isMount.current = true
    },[categoryId,sort ,currentPage])
    useEffect(() => {
        if(window.location.search){
            const params = qs.parse(window.location.search.substring(1))
            const sortTypeFing = parameters.find(obj => obj.criteriaSort ===  params.criteriaSort)


            dispatch(setFilters({...params,sortTypeFing}))
            isSearch.current = true
        }
    },[])
    useEffect(() => {
        window.scrollTo(0,0)
        if (!isSearch.current){
            fetchPizzas()
        }
        isSearch.current= false
    },[categoryId,sort,searchValue,currentPage]);

    function fetchPizzas() {
        setIsLoading(true)

        const replaceMinus = sort.criteriaSort.replace('-','')
        const getSortDecision = sort.criteriaSort.includes('-') ? 'asc' : 'desc'
        const getCategory = categoryId > 0 ? `category=${categoryId}`:''
        const search = searchValue ? `&search=${searchValue}`:''

        axios.get(`https://634d210bf5d2cc648e9d3578.mockapi.io/items?page=${currentPage}&limit=4&${getCategory}&sortBy=${replaceMinus}&order=${getSortDecision}${search}`)
            .then((response) => {
                    setItems(response.data)
                    setIsLoading(false)
                }
            )
    }
    const dispatchSetCurrentPage = (i) => {
        dispatch(setCurrentPage(i))
    }

    const pizzas = items.filter(item => {
        if(item.title.toLowerCase().includes(searchValue.toLowerCase())){
            return true
        }
        return false
    })
        .map(item => <PizzaBlock key={item.id} {...item} />)

    const skeletons = [...new Array(5)].map((_,index) => <SkeletonPizzaBlock key={index}/>)


    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(index) => dispatch(setCategoryId(index))} />
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? skeletons
                        : pizzas
                }
            </div>
            <Pagination currentPage={currentPage} onChangePage={i => dispatchSetCurrentPage(i)}/>
        </div>
    );
};

export default Home;


