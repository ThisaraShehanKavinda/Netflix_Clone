import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './TitleCards.css';





const TitleCards = ({title,category}) => {
  


  const [apiData,setApiData] = useState([]);

 
  //this is for scroll using mouse wheel

  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDRmMjk5ZjQ1ZmFlZDcxMDczYWI1NzYxNGJmNGYwMiIsInN1YiI6IjY2NGUxMjY2YzExYThjYzRmOTQyOTFiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zuvX3i7IJ75-sWk0ZugHvzLP7MYc4rObTpIYocFIJDY'
    }
  };
  
  

const handleWheel = (event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;

}

useEffect(()=>{



  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

  cardsRef.current.addEventListener('wheel',handleWheel)
},[])

//this is for scroll using mouse wheel

  return (
    <div className='titlecards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
            return <Link to={`/player/${card.id}`} className="card" key={index}>
                <img src={`https://image.tmdb.org/t/p/w500`+ card.backdrop_path} alt="" />
                <p>{card.original_title}</p>
            </Link>

        })}
      </div>
    </div>
  )
}

export default TitleCards
