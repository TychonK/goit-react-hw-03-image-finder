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
import { Modal } from './components/Modal';
import {searchBigImg} from './searchBigImg'

class App extends Component {
  state = {
    data: [],
    page: 1,
    query: '',
    isLoading: false,
    modalIsOpen: false,
    bigImgUrl: '',
  }

  async componentDidMount() {
    this.setState({isLoading: true,})
    let foundData;
    await FetchPhotos(this.state.query, this.state.page).then((data) => {foundData = data})
    this.setState({
      data: foundData,
      isLoading: false,
    })
    document.addEventListener("keydown", this.closeModal)
    document.querySelector(".ImageGallery").addEventListener("click", this.openModal)
  }

  addImages = (arrData) => {
    this.setState(() => {
      return {
        data: arrData,
      }
    })
  }

  loadMore = async (moreData) => {
        this.setState((prev) => {
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

  isLoading = (isLoading) => {
    this.setState({isLoading: isLoading,})
  }

  openModal = async(e) => {
    await this.setState({
      modalIsOpen: true,
    })
    await searchBigImg(e.target.id).then((bigImgUrl) => { this.setState({bigImgUrl: bigImgUrl,}) })
  }

  closeModal = (e) => {
    if (this.state.modalIsOpen === false) {
      return
    }
   if(e.keyCode === 27) {
     this.setState({
       modalIsOpen: false,
       bigImgUrl: '',
     })
    }
  }

  closeModalOverlay = (modalIsOpen) => {
    this.setState({
      modalIsOpen: modalIsOpen,
      bigImgUrl: '',
    })
  }

  render() {
    const style = {
      position: "fixed",
      top: "50%",
      left: "35%",
    }
      return (
        <>
          {this.state.modalIsOpen ? <Modal imgUrl={this.state.bigImgUrl} closeModalOverlay={this.closeModalOverlay}/> : null}
        <Searchbar addImages={this.addImages} loadMore={this.loadMore} page={this.state.page} annulePage={this.annulePage} isLoading={this.isLoading}/>
        {this.state.isLoading ? <Loader className="loader" type="ThreeDots" width="500px" color="#00BFFF" style={style} /> : null}
        <ImagesGallery data={this.state.data}/>
        <Button pageCount={this.pageCount} page={ this.state.page }/>
      </>
    )
  }
  
}


export default App;
