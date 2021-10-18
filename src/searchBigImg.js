import axios from 'axios'

export function searchBigImg(id) {
    const baseUrl = 'https://pixabay.com/api/';
    const api_key = '23036221-d804a8a78d7b0866edf7d8fc3';
    let url = `${baseUrl}?key=${api_key}&id=${id}`

    return axios
        .get(url)
        .then((data) => {
            return data
        })
        .then((data) => {
            return data.data.hits[0].largeImageURL
        })
        .catch((err) => {
            console.log(err)
        })
}