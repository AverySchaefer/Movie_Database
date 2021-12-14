import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link } from "react-router-dom";

const Movie = (props) => (
  <tr>
    <td>{props.record.name}</td>
    <td>{props.record.dirBy}</td>
    <td>{props.record.year}</td>
    <td>{props.record.format}</td>
    <td>{props.record.seen}</td>
    <td>{props.record.score}</td>
    <td>{props.record.genre}</td>
    <td>
      <Link to={"/edit/" + props.record._id}>Edit</Link> |
      <a
        href="/"
        onClick={() => {
          props.deleteMovie(props.record._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

export default class RecordList extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.deleteMovie = this.deleteRecord.bind(this);
    this.state = { movies: [] };
  }

  // This method will get the data from the database.
  componentDidMount() {
    axios
      .get("http://localhost:5000/movie/")
      .then((response) => {
        this.setState({ movies: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This method will delete a movies based on the method
  deleteMovie(id) {
    axios.delete("http://localhost:5000/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      movie: this.state.movies.filter((el) => el._id !== id),
    });
  }

  // This method will map out the users on the table
  movieList() {
    return this.state.movies.map((currentmovie) => {
      return (
        <Movie
          movie={currentmovie}
          deleteMovie={this.deleteMovie}
          key={currentmovie._id}
        />
      );
    });
  }

  // This following section will display the table with the movies of individuals.
  render() {
    return (
      <div>
        <h3>Your Movie Collection</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Director's Name</th>
              <th>Year of Release</th>
              <th>Format</th>
              <th>Seen?</th>
              <th>Score (1-10)</th>
              <th>Genre</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.movieList()}</tbody>
        </table>
      </div>
    );
  }
}