
import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { withRouter } from "react-router";
 
class Edit extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);
 
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDirBy = this.onChangeDirBy.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.onChangeFormat = this.onChangeFormat.bind(this);
    this.onChangeSeen = this.onChangeSeen.bind(this);
    this.onChangeScore = this.onChangeScore.bind(this);
    this.onChangeGenre = this.onChangeGenre.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
 
    this.state = {
        name: "",
        dirBy: "",
        year: 0,
        format: "",
        seen: false,
        score: 0,
        genre: "",
    };
  }
  // This will get the record based on the id from the database.
  componentDidMount() {
    axios
      .get("http://localhost:5000/movie/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          name: response.data.name,
          dirBy: response.data.dirBy,
          year: response.data.year,
          format: response.data.format,
          seen: response.data.seen,
          score: response.data.score,
          genre: response.data.genre
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
 
  // These methods will update the state properties.
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
 
  onChangeDirBy(e) {
    this.setState({
      dirBy: e.target.value,
    });
  }
 
  onChangeYear(e) {
    this.setState({
      year: e.target.value,
    });
  }

  onChangeFormat(e) {
    this.setState({
      format: e.target.value,
    });
  }

  onChangeSeen(e) {
    this.setState({
      seen: e.target.value,
    });
  }

  onChangeScore(e) {
    this.setState({
      score: e.target.value,
    });
  }

  onChangeGenre(e) {
    this.setState({
      genre: e.target.value,
    });
  }
 
  // This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();
    const newEditedMovie = {
        name: this.state.name,
        dirBy: this.state.dirBy,
        year: this.state.year,
        format: this.state.format,
        seen: this.state.seen,
        score: this.state.score,
        genre: this.state.genre,
    };
    console.log(newEditedMovie);
 
    // This will send a post request to update the data in the database.
    axios
      .post(
        "http://localhost:5000/update/" + this.props.match.params.id,
        newEditedperson
      )
      .then((res) => console.log(res.data));
 
    this.props.history.push("/");
  }
 
  // This following section will display the update-form that takes the input from the user to update the data.
  render() {
    return (
      <div>
        <h3 align="center">Update Movie Entry</h3>
        <form onSubmit={this.onSubmit}>
        <div className="form-group">
            <label>Name of the Movie: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Name of the Movie's Director: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.dirBy}
              onChange={this.onChangeDirBy}
            />
          </div>
          <div className="form-group">
            <label>What is the Year of the Movie's Release: </label>
            <input
              type="number"
              className="form-control"
              min="1920"
              max="2100"
              value={this.state.year}
              onChange={this.onChangeYear}
            />
          </div>
          <div className="form-group">
            <label>What is the format of the movie?</label>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="formatOptions"
                id="digitalFormat"
                value="Digital"
                checked={this.state.format === "Digital"}
                onChange={this.onChangeFormat}
              />
              <label className="form-check-label">Digital</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="formatOptions"
                id="4kFormat"
                value="4K"
                checked={this.state.format === "4K"}
                onChange={this.onChangeFormat}
              />
              <label className="form-check-label">4K Blu-Ray</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="formatOptions"
                id="blurayFormat"
                value="BluRay"
                checked={this.state.format === "BluRay"}
                onChange={this.onChangeFormat}
              />
              <label className="form-check-label">Blu-Ray</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="formatOptions"
                id="dvdFormat"
                value="DVD"
                checked={this.state.format === "DVD"}
                onChange={this.onChangeFormat}
              />
              <label className="form-check-label">DVD</label>
            </div>
        </div>
        <div className="form-group">
            <label>Have You Seen the Movie: </label>
            <input
            type="checkbox"
            id="seen"
            className="form-control"
            value={this.state.seen}
            onChange={this.onChangeSeen}
            />
            <label for="seen">I have seen the movie</label>
        </div>
        <div className="form-group">
            <label>What Score Would You Give The Movie: </label>
            <input
            type="number"
            className="form-control"
            min="1"
            max="10"
            value={this.state.score}
            onChange={this.onChangeScore}
            />
        </div>
        <div className="form-group">
        <label>What is the Genre of the Movie?</label>
        <div className="form-check form-check-inline">
            <input
            className="form-check-input"
            type="radio"
            name="genreOptions"
            id="actionGenre"
            value="Action"
            checked={this.state.format === "Action"}
            onChange={this.onChangeGenre}
            />
            <label className="form-check-label">Action/Adventure</label>
        </div>
        <div className="form-check form-check-inline">
            <input
            className="form-check-input"
            type="radio"
            name="genreOptions"
            id="comedyGenre"
            value="comedy"
            checked={this.state.format === "comedy"}
            onChange={this.onChangeGenre}
            />
            <label className="form-check-label">Comedy</label>
        </div>
        <div className="form-check form-check-inline">
            <input
            className="form-check-input"
            type="radio"
            name="genreOptions"
            id="horrorGenre"
            value="Horror"
            checked={this.state.format === "Horror"}
            onChange={this.onChangeGenre}
            />
            <label className="form-check-label">Horror</label>
        </div>
        <div className="form-check form-check-inline">
            <input
            className="form-check-input"
            type="radio"
            name="genreOptions"
            id="sciFiGenre"
            value="SciFi"
            checked={this.state.format === "SciFi"}
            onChange={this.onChangeGenre}
            />
            <label className="form-check-label">Sci-Fi</label>
        </div>
          </div>
          <br />
 
          <div className="form-group">
            <input
              type="submit"
              value="Update Movie"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
 
// You can get access to the history object's properties and the closest <Route>'s match via the withRouter
// higher-order component. This makes it easier for us to edit our records.
 
export default withRouter(Edit);