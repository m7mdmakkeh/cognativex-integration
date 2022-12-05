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
        let status = typeof data === 'string' ? "ERROR" : (typeof data === 'object' && data.errors.length > 0) ? "MISTAKES" : "OK";
        switch (status){
            case "OK": msg = "Valid MetaData"; icon=check; break;
            case "ERROR": msg = data; icon=errorIcon; break;
            case "MISTAKES": msg = "You have some mistakes in the metdata format"; icon=errorIcon; break;
        }
        const fields = data?.fieldsInfo;
        const errors = data?.errors;
        return (
            <>
            <div className="statusDisplay">
                <span className="statusMsg">{msg}</span>
                <img className="statusIcon" src={icon}/>
            </div>
            {
                (fields && status === "OK") ? (<div className='table'>
                    <div className="row">
                        <div className="label">Type</div>
                        <div className="data-value">{fields.type || 'No Type'}</div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="label">Title</div>
                        <div className="data-value">{fields.title || 'No Title'}</div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="label">Image</div>
                        <img className="data-value" src={fields.thumbnail || 'No image'} alt="image of the post not"/>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="label">Published Date</div>
                        <div className="data-value">{formatDate(fields.published_time)} (GMT)</div>
                    </div>
                    
                </div>) : 
                errors?.length ? (
                    <div className='error-container'>
                        {
                            errors.map(e => 
                            <div className="error-item">
                                <div className="error-item__problem">
                                    Error At Position <span>{e.location}</span>: <span>{e.title}</span> 
                                </div>
                                <div className="error-item__solution">{e.solution}</div>
                            </div>)
                        }
                    </div>
                ): ''
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
        let url = inputRef.current.value;
        if(url === ''){
            inputRef.current.placeholder = "Please enter a URL";
            setTimeout(() => {
                inputRef.current.placeholder = "";
            }, 6000);
        }
        else{
            setIsChecking(true);
            const res = await crawlJsonLd(encodeURIComponent(url));
            if (res && res.data) setUrlCrawledData(res.data);
            setIsChecking(false);
        }
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
