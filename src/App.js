import React from "react";
import Card from "./Card";
import Button from "./Button";
import Header from "./Header";
import { Facebook, Twitter, Email, Reddit } from "react-sharingbuttons";
import "react-sharingbuttons/dist/main.css";
import "./App.css";
import shuffle from "shuffle-array";
import SearchBar from "./SearchBar";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      index: 0,
      randomClicked: false,
      randomData: null
    };
  }
  componentDidMount() {
    fetch("https://elamin-quotes-app.glitch.me/quotes")
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({ data: shuffle(res) });
      });
  }
  randomQuote = () => {
    fetch("https://elamin-quotes-app.glitch.me/quotes/random")
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({
          randomData: res,
          randomClicked: true
        });
      });
  };

  leftArrowHandler = () => {
    this.state.index > 0
      ? this.setState({ index: --this.state.index, randomClicked: false })
      : clearInterval(this.autoLeftTimer);
  };
  rightArrowHandler = () => {
    this.state.index < this.state.data.length - 1
      ? this.setState({ index: ++this.state.index, randomClicked: false })
      : clearInterval(this.autoRightTimer);
  };
  onSelectChange = e => {
    const author = e.target.value;
    this.setState(prev => {
      return { data: prev.data.filter(quote => quote.author === author) };
    });
  };

  //Set the ref for the div which containt share button so we can hide them and show them whenever we clicked the sgare button
  setDiv = div => {
    this.div = div;
  };
  //Enable the share button when clicked
  enableShare = () => {
    this.div.style.display = "";
  };

  //The search method help us to search for specific quote according to the quote or it's author
  search = searchVal => {
    fetch(
      `https://elamin-quotes-app.glitch.me/quotes/myOwnSearch?term=${searchVal}`
    )
      .then(res => {
        return res.json();
      })
      .then(res => {
        const [extractedData] = res;
        this.setState({
          randomData: extractedData,
          randomClicked: true
        });
      });
  };
  render() {
    if (this.state.data && !this.state.randomClicked) {
      return (
        <div className="container">
          <Header />
          <SearchBar search={this.search} data={this.state.data} />
          <Card
            quote={this.state.data[this.state.index].quote}
            author={this.state.data[this.state.index].author}
          />
          <div className="btn-container">
            <Button
              onClick={this.leftArrowHandler}
              className="btn"
              title="<< Previous"
            />
            <Button
              onClick={this.randomQuote}
              className="btn"
              title="Get a random quote"
            />
            <Button onClick={this.enableShare} className="btn" title="Share" />
            <Button
              onClick={this.rightArrowHandler}
              className="btn"
              title="Next >>"
            />
            <div ref={this.setDiv} style={{ display: "none" }}>
              <Facebook
                url={window.location.href}
                shareText={this.state.data[this.state.index].quote}
              />
              <Twitter
                url={window.location.href}
                shareText={`"${this.state.data[this.state.index].quote}"
              Author:${this.state.data[this.state.index].author} 
              For more quotes visit`}
              />
              <Email
                url={`${this.state.data[this.state.index].quote}
               Author:${this.state.data[this.state.index].author} 
              For more quotes please visit ${window.location.href} `}
                subject={`Quote from ${
                  this.state.data[this.state.index].author
                }`}
              />
              <Reddit
                url={window.location.href}
                shareText={this.state.data[this.state.index].quote}
              />
            </div>
          </div>
        </div>
      );
    } else if (this.state.randomData && this.state.randomClicked) {
      return (
        <div className="container">
          <Header />
          <SearchBar search={this.search} />
          <Card
            quote={this.state.randomData.quote}
            author={this.state.randomData.author}
          />
          <div className="btn-container">
            <Button
              onClick={this.leftArrowHandler}
              className="btn"
              title="<< Previous"
            />
            <Button
              onClick={this.randomQuote}
              className="btn"
              title="Get a random quote"
            />
            <Button onClick={this.enableShare} className="btn" title="Share" />
            <Button
              onClick={this.rightArrowHandler}
              className="btn"
              title="Next >>"
            />
            <div ref={this.setDiv} style={{ display: "none" }}>
              <Facebook
                url={window.location.href}
                shareText={this.state.randomData.quote}
              />
              <Twitter
                url={window.location.href}
                shareText={`"${this.state.randomData.quote}"
              Author:${this.state.randomData.author} 
              For more quotes visit`}
              />
              <Email
                url={`${this.state.randomData.quote}
               Author:${this.state.randomData.author}
              For more quotes please visit ${window.location.href} `}
                subject={`Quote from ${this.state.randomData.author}`}
              />
              <Reddit
                url={window.location.href}
                shareText={this.state.randomData.quote}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default App;
