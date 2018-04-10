import React, {
  Component
} from 'react'
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      years: ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'],
      movies: []
    }
  }

  componentDidMount() {
    this._getAllMovies()
  }



  _getAllMovies = () => {
    // request(window.__LOADING__)({
    //   method: 'get',
    //   url: `/api/v0/movies`
    // }).then(res => {
    //   this.setState({
    //     movies: res
    //   })
    // }).catch(() => {
    //   this.setState({
    //     movies: []
    //   })
    // })
    axios.get('/api/v0/movies').then(results => {
      console.log(results.data.data)
      this.setState({
        movies: results.data.data
      })
    });
    // }
  }

  render() {

    return (
      <div >
    {
      this.state.movies.map((item, i) => {
        return <div key={i}>{item.title}</div>
      })
    }
      </div>

    )
  }
}