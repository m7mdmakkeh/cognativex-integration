import axios from 'axios';

const CRAWLER_URL = 'https://common-cxcrawler-zakpngxo5a-ew.a.run.app/api/';



const crawlJsonLd = async (url) => {
    return await axios.get(`${CRAWLER_URL}crawljsonld?url=${url}`).catch(function (error) {
        console.log(error.toJSON());
    });;
}    


export default crawlJsonLd;
