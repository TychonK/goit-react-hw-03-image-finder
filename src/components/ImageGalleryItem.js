export default function ImageGalleryItem({ hits }) {
    const renderedData = hits.data.map((hit, index) => {
        return (
            <li key={index} className="ImageGalleryItem">
                <img
                    id={hit.id}
                    src={hit.webformatURL}
                    alt="image found"
                    className="ImageGalleryItem-image"
                />
            </li>
        )
    })
    return renderedData
}