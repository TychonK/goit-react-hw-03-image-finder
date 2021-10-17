import ImageGalleryItem from "./ImageGalleryItem"

export default function ImagesList(data) {  
    return (
        <ul className="ImageGallery">
            <ImageGalleryItem hits={data}/>
        </ul>
    )
}