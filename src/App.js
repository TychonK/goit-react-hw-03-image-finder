import './App.scss';
import { Component } from 'react';
import axios from 'axios'

import Searchbar from './components/Form'

const baseUrl = 'https://pixabay.com/api/';
const api_key = '23036221-d804a8a78d7b0866edf7d8fc3';

let searchQuery = '';
let searchPage = 1;
let url = `${baseUrl}?key=${api_key}&q=${searchQuery}&page=${searchPage}&image_type=photo&orientation=horizontal&per_page=12`

axios.get(url).then((data) => {console.log(data)}).catch((err) => {console.log(err)})

class App extends Component {

  render() { 
    return (
      <Searchbar />
    )
  }
}

export default App;
