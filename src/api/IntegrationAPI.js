import axios from 'axios';

const CRAWLER_URL = 'https://crawler.cognativex.com/api/';

const crawlJsonLd = async (url) => {
    return await axios.get(`${CRAWLER_URL}verifyjsonld?url=${url}`).catch(function (error) {
        console.log(error.toJSON());
    });;
}    


export default crawlJsonLd;
