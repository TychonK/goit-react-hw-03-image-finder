import { Component } from 'react'

export class Button extends Component {
    state = {
        page: 1,
    }

    componentWillUpdate() {
        if (this.state.page !== this.props.page) {
            this.setState({page: this.props.page,})
        }
    }

    incrementPage = async() => {
        await this.setState({ page: this.state.page + 1, })
        this.props.pageCount(this.state.page)
    }
    
    render() {
        return (
            <button
                type="button"
                className="Button"
                onClick={this.incrementPage}
            >Load More
            </button>
        )
    }
}