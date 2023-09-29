import { useState, useEffect } from "react"
import MovieCard from "../components/MovieCard"
import './MovieGrid.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const moviesURL = import.meta.env.VITE_API
const imageUrl = import.meta.env.VITE_IMG
const apiKey = import.meta.env.VITE_API_KEY
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};


const Home = () => {
  const [topMovies, setTopMovies] = useState([])
  const moviesCarousel = topMovies.slice(0,10)

  const getTopRatedMovies = async (url) => {
      const res = await fetch(url)
      const data = await res.json()
      
      setTopMovies(data.results)
  }
  
  useEffect(() => {
      const topRatedUrl = `${moviesURL}top_rated?${apiKey}`
      getTopRatedMovies(topRatedUrl)
  }, [])

  return (
    <div className="container">
        <h2 className="title">Filmes</h2>
        <p className="effect-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem nihil autem delectus alias iusto architecto, soluta quaerat maiores cumque similique exercitationem.</p>

        <div className="carousel-container">
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside
            responsive={responsive}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            { 
              moviesCarousel.map(movie => <img key={movie.id} src={imageUrl + movie.poster_path}/>)
            }
          </Carousel>
        </div>
        
        <h1 className="title">Melhores Avaliados</h1>
        <div className="movies-container">
            {topMovies.length === 0 && <p>Carregando...</p>}
            {topMovies.length > 0 && 
                topMovies.map((movie) => <MovieCard key={movie.id} movie={movie}/>)}
        </div>
    </div>
  )
}

export default Home