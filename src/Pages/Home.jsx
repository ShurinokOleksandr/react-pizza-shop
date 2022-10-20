import React, {useEffect, useState} from 'react';
import Categories from "../Components/Categories/Categories";
import Sort from "../Components/Sort/Sort";
import SkeletonPizzaBlock from "../Components/PizzaBlock/SkeletonPizzaBlock";
import PizzaBlock from "../Components/PizzaBlock/PizzaBlock";
import Pagination from "../Components/Pagination/Pagination";

const Home = ({searchValue}) => {
    const [items,setItems] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [categoryId,setCategoryId] = useState(0)
    const [sort,setSort] = useState({name:'популярности',sort:'rating'})
    const [currentPage,setCurrentPage] = useState(1)


    useEffect(() => {
        setIsLoading(true)
        const getCategory = categoryId > 0 ? `category=${categoryId}`:''
        const replaceMinus = sort.sort.replace('-','')
        const getSortDecision = sort.sort.includes('-') ? 'asc' : 'desc'
        const search = searchValue ? `&search=${searchValue}`:''

        fetch(`https://634d210bf5d2cc648e9d3578.mockapi.io/items?page=${currentPage}&limit=4${getCategory}&sortBy=${replaceMinus}&order=${getSortDecision}`)
            .then(res => res.json())
            .then((json) => {
                setItems(json)
                setIsLoading(false)
            })
        window.scrollTo(0,0)
    },[categoryId,sort,searchValue,currentPage]);


    const pizzas = items.filter(item => {
        if(item.title.toLowerCase().includes(searchValue.toLowerCase())){
            return true
        }
        return false

    }).map(item => <PizzaBlock key={item.id} {...item} />)

    const skeletons = [...new Array(5)].map((_,index) => <SkeletonPizzaBlock key={index}/>)
    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(index) => setCategoryId(index)} />
                <Sort value={sort} onChangeSort={(index) => setSort(index)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? skeletons
                        : pizzas
                }
            </div>
            <Pagination onChangePage={number => setCurrentPage(number)}/>
        </div>
    );
};

export default Home;
//

