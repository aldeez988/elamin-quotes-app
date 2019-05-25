import React, { useState } from 'react';
import unique from "array-unique";

// const SearchBar = (props) => {
//     const [input, setInput] = useState("");

//     const onClickHandler = (e) => {
//         props.search(input)
//         e.preventDefault()
//     }
//     return (

//         <form className="example" action="/action_page.php">
//             <input type="text"
//                 placeholder="Search.."
//                 name="search"
//                 value={input}
//                 onChange={(e) => {
//                     setInput(e.target.value)
//                     console.log(input)

//                 }}
//             />
//             <button onClick={onClickHandler} type="submit"><i class="fa fa-search"></i></button>
//         </form>


//     );
// };

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            filteredArray: [],
            data: unique(this.props.data.map(quote => quote.quote)).concat(
                unique(this.props.data.map(quote => quote.author))
            )
        }
    }
    onClickHandler = (e) => {
        this.props.search(this.state.input)
        this.setState({ input: "" })
        e.preventDefault()
    }
    onInputChange = (e) => {
        this.ulRef.style.display = ""
        const userInput = e.currentTarget.value;
        this.setState({ input: e.target.value })
        console.log(this.state.input)
        this.setState({
            filteredArray: this.state.data.filter(
                quote => quote.toLowerCase().indexOf(userInput.toLowerCase()) > -1)
        })
    }
    onListClick = (e) => {
        this.setState({ input: e.currentTarget.innerText })
        this.ulRef.style.display = "none"
    };
    setUlRef = (input) => {
        this.ulRef = input;
    }
    render() {
        return (
            <div className="example">
                <form className="example" action="/action_page.php" autocomplete="off">
                    <input type="text"
                        placeholder="Search.."
                        name="search"
                        value={this.state.input}
                        onChange={this.onInputChange}
                    />
                    <button onClick={this.onClickHandler} type="submit"><i class="fa fa-search"></i></button>
                </form>
                <ul className="suggestions" ref={this.setUlRef}>
                    {
                        this.state.filteredArray.map(quote => {
                            return (
                                <li onClick={this.onListClick} >{quote}</li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default SearchBar;