import React from "react";
import MovieList from './movielist/MovieList';
import InfiniteScroll from 'react-infinite-scroll-component'
const axios = require('axios');

class MovieBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
     movies: [],
     isLoading: true,
     count: 20,
     start: 0
   };
   this.getGenereFromMongo = this.getGenereFromMongo.bind(this);
   this.fetchNextMovies = this.fetchNextMovies.bind(this);
  }
   getMoviesFromMongo()  {
       const { count, start } = this.state;
       axios(
           `http://localhost:4000/api/movies/count=${count}&start=${start}`)
      .then(response => {
        this.setState({ movies: response.data, isLoading: false })
    })
  };

    fetchNextMovies() {
        const { count, start } = this.state;
        let newStart = this.state.start + this.state.count;
        this.setState({start: newStart })
         axios(`http://localhost:4000/api/movies/count=${count}&start=${newStart}`)
            .then((response) => {
                this.setState({ movies: this.state.movies.concat(response.data) })
            })
    }

    async getGenereFromMongo()  {
        const result = await axios(
            'http://localhost:4000/api/genres')
            .then(response => {
                this.setState({ genres: response.data });
            })
    };

    componentDidMount() {
        this.getMoviesFromMongo();
        this.getGenereFromMongo();
    }

    async getMoviesFromGenre(genre)  {
        await axios(
            'http://localhost:4000/api/movies/'+genre)
            .then(response => {
                this.setState({ movies: response.data })
            })
    };

  render() {
   
    return (
      <div>
          <InfiniteScroll className="infinite-scroll"
              dataLength={this.state.movies.length}
              next={this.fetchNextMovies}
              hasMore={true}>
                    <MovieList movies={this.state.movies} isLoading={this.state.isLoading} />
        </InfiniteScroll>
      </div>
    );
  }
}

export default MovieBrowser;