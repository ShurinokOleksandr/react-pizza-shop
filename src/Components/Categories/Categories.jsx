import React from 'react';

const Categories = () => {
    const [catInx,setCatInx] = React.useState()


    const categoriesList =[
        {index:0,text:'Все'},
        {index:1,text:'Мясные'},
        {index:2,text:'Вегетарианская'},
        {index:3,text:'Гриль'},
        {index:4,text:'Острые'},
        {index:5,text:'Закрытые'},
    ]
    return (
        <div className="categories">
            <ul>
                {categoriesList.map(({index,text}) =>

                    <li key={index}
                        onClick={() => setCatInx(index)}
                        className={catInx === index ? 'active' : ''}
                    >
                        {text}
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Categories;