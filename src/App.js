//* CSS *//
import './App.scss';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

//* Everything else *//
import { Component } from 'react';
import Loader from "react-loader-spinner";

import { Searchbar } from './components/Searchbar'
import ImagesGallery from './components/ImagesGallery'
import {Button} from './components/Button'

import { FetchPhotos } from './searchService';

class App extends Component {
  state = {
    data: [],
    page: 1,
    query: '',
    isLoading: false,
  }

  async componentDidMount() {
    this.setState({isLoading: true,})
    let foundData;
    await FetchPhotos(this.state.query, this.state.page).then((data) => {foundData = data})
    this.setState({
      data: foundData,
      isLoading: false,
    })
  }

  addImages = (arrData) => {
    this.setState(() => {
      return {
        data: arrData,
      }
    })
  }

  loadMore = async (moreData) => {
    await this.setState((prev) => {
      return {
        data: [...prev.data, ...moreData],
      }
    })
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  annulePage = async(initialPage) => {
    await this.setState({page: initialPage,})
  }

  pageCount = (pageNumber) => {
    this.setState(() => {
      return {
        page: pageNumber,
      }
    })
  }

  render() {
      return (
      <>
        <Searchbar addImages={this.addImages} loadMore={this.loadMore} page={this.state.page} annulePage={ this.annulePage}/>
          {this.state.isLoading ? <Loader className="loader" type="ThreeDots" width="500px" color="#00BFFF"/> : <ImagesGallery data={this.state.data} /> }
        <Button pageCount={this.pageCount} page={ this.state.page }/>
      </>
    )
  }
  
}


export default App;
