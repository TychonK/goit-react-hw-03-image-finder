import {Component} from 'react'

export class Modal extends Component {
    closeModal = () => {
        let modalIsOpen = false;
        this.props.closeModalOverlay(modalIsOpen);
    }

    render() {
        return (
            <div className="Overlay" onClick={this.closeModal}>
                <div className="Modal">
                    <img src={this.props.imgUrl} alt="Big image" />
                </div>
            </div>
        )  
    }
}