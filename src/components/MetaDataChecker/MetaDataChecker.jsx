import React from 'react';
import { useState, useRef } from 'react';
import crawlJsonLd from '../../api/IntegrationAPI';
import Loader from '../Loader';
import '../../css/App.css'
import './MetaDataChecker.css'
import check from '../../assets/check.svg'
import times from '../../assets/times.svg'
import errorIcon from '../../assets/errorIcon.svg'

const MetaDataChecker = () => {

    const inputRef = useRef(null);
    const [urlCrawledData, setUrlCrawledData] = useState(null);
    const [isChecking, setIsChecking] = useState(false);

    const displayResults = (data) => {
        if(!data) return;
        let msg="Unknown Status", icon=errorIcon;
        switch (data.status){
            case "OK": msg = "Valid MetaData"; icon=check; break;
            case "EXCEPTION": msg = "Link Invalid"; icon=errorIcon; break;
            case "NOT_FOUND": msg = "CognativeX Meta Data Not Found"; icon=errorIcon; break;
        }
        data = data.data;
        console.log(data.thumb)
        return (
            <>
            <div className="statusDisplay">
                <span className="statusMsg">{msg}</span>
                <img className="statusIcon" src={icon}/>
            </div>
            {
                data? (<div className='table'>
                                <div className="row">
                                    <div className="label">Type</div>
                                    <div className="data-value">{data.postType}</div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="label">Title</div>
                                    <div className="data-value">{data.title}</div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="label">Image</div>
                                    <img className="data-value" src={data.thumb} alt="image of the post"/>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="label">Published Date</div>
                                    <div className="data-value">{formatDate(data.datePublished)} (GMT)</div>
                                </div>
                            </div>)
                        : ""
            }
            
            </>
        )
    }


    const formatDate = (date) => {
        return date.split("T").map((part, index)=>{
            if(index == 1) return part.split("+")[0];
            else return part + " ";
        })
    }

    const checkUrl  = async () => {
        setIsChecking(true);
        const res = await crawlJsonLd(inputRef.current.value);
        if (res && res.data) setUrlCrawledData(res.data);
        setIsChecking(false);
    }



    return (
        <div className='metaDataChecker-container'>
            
            <div className="formContainer">
                <label htmlFor="urlInput">Paste the post URL you want to check the MetaData in</label>
                <input id="urlInput" name="url" ref={inputRef} type="text" />

                <button onClick={checkUrl} className={isChecking ? 'isChecking' : ""}>
                    {isChecking ? 'Checking...' : 'Check'}
                </button>
            </div>
            
            <div className="resultsContainer">

                {isChecking ? <Loader /> : displayResults(urlCrawledData)}
            </div>
        </div>
    ); 
}

export default MetaDataChecker;
