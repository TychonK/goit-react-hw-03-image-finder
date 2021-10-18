import { Component } from 'react';
import { FetchPhotos } from '../searchService';

export class Searchbar extends Component {
    state = {
        query: '',
        page: 1,
    }

    async componentDidUpdate() {
        if (this.state.page != this.props.page) {
           await this.setState({ page: this.props.page, })
            let isLoading = true;
            this.props.isLoading(isLoading)
            let newData;
            await FetchPhotos(this.state.query, this.state.page).then((data) => { newData = data })
            isLoading = false;
            this.props.isLoading(isLoading)
            this.props.loadMore(newData)
        }
    }

    handleSearch = async(e) => {
        e.preventDefault()

        let initialPage = 1;
        await this.props.annulePage(initialPage)

        let arrData;
        await FetchPhotos(this.state.query, this.state.page).then((data) => { arrData = data })
        this.props.addImages(arrData)
    }

    handleChange = (e) => {
        this.setState({
            query: e.target.value,
           
        })
    }

    render() {
        return (
            <header className="Searchbar">
            <form className="SearchForm" onSubmit={this.handleSearch}>
                <button type="submit" className="SearchForm-button">
                <span className="SearchForm-button-label">Search</span>
                </button>

                <input
                className="SearchForm-input"
                name="searchQuery"
                type="text"
                autoComplete="off"
                autoFocus
                        placeholder="Search images and photos"
                        onChange={this.handleChange}
                />
            </form>
            </header> 
        )
    }
}