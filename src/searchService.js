import axios from 'axios'

export function FetchPhotos(searchQuery, searchPage) {
    const baseUrl = 'https://pixabay.com/api/';
    const api_key = '23036221-d804a8a78d7b0866edf7d8fc3';
    let url = `${baseUrl}?key=${api_key}&q=${searchQuery}&page=${searchPage}&image_type=photo&orientation=horizontal&per_page=12`

       return axios
            .get(url)
            .then((data) => {
                return data
            })
            .then((data) => {
                return data.data.hits
            })
            .catch((err) => {
                console.log(err)
            })
}