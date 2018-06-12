import React, { Component } from 'react';
import Gif from './Gif'

class Board extends Component {
    constructor(props){
        super(props)
        this.state = {
            words: ["Pennsylvania", "Texas", "New York", "Connecticut", "California", "Maryland", "North Carolina"],
            gifs: [],
            newWord: ''
        }
        this.selectWord = this.selectWord.bind(this)
        this.addWord = this.addWord.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    selectWord(word){
        fetch(`http://api.giphy.com/v1/gifs/search?q=${word}&api_key=m1tz9av1s1dwBd9aQJ60i27gyf7qQqJS&limit=10`)
            .then(response => 
                response.json()) 
            .then( (json) => {
                var currentGifs = json.data
                this.setState(prevState => ({
                    gifs: currentGifs
                }))
            })           
    }   
    
    addWord(e){
        this.setState({
          newWord: e.target.value
        })
      }

    handleSubmit(e){
        e.preventDefault();
        this.setState(prevState => ({
            words: [...prevState.words, this.state.newWord],
            newWord: ''
        }))
    }
    
    render() {
        return (
            <div>
                <div>
                    {this.state.words.map((word) =>
                        <button 
                            key={word}
                            word={word}
                            onClick={this.selectWord.bind(this, word)}
                        >
                            {word}
                        </button>
                    )}
                </div>
                <div>
                    <input
                        type="text"
                        value={this.state.newWord}
                        onChange={this.addWord}
                        name="newWord" />
                    <input type="submit" value="Submit" onClick={this.handleSubmit}/>
                </div>
                <div>
                    {this.state.gifs.map((gif) =>
                        <Gif 
                            key={gif.id}
                            rating={gif.rating}
                            moving={gif.images.original.url}
                            still={gif.images.original_still.url} /> 
                    )}
                </div>
            </div>
        );
    }
}

export default Board;