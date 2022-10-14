import React, { useState, useRef, useEffect } from 'react';
import {useController, useForm} from "react-hook-form";
import "./AdvancedSelect.css"
import useOutsideClick from "../../hooks/useOutsideClick"

const CXAdvancedSelect = ({ control, name, options, defaultDisplay="Select", dislayProp="label", customOnChange, startFresh, startOpened }) => {
    
    const { field: { onChange, value } } = useController({
        name,
        control,
        rules: { required: true },
    });
    const [isSelectOpen, setIsSelectOpen] = useState(startOpened ? true : false);
    const [filter, setFilter] = useState("");

    const selectRef = useRef();
    useOutsideClick(selectRef, ()=>{setIsSelectOpen(false)});

    console.log("rede")

    useOutsideClick(selectRef, ()=>setIsSelectOpen(false));

    const toggleSelect = () => {
        setIsSelectOpen(!isSelectOpen);
    }

    const selectValue = (value) => {  
        if(customOnChange) customOnChange(value);
        onChange(value);
    }

    const getSelectedValueLabel = () => {
        const selection = options.filter(o=>{
            if(dislayProp && o.value[dislayProp]){
                return o.value[dislayProp]===value[dislayProp]
            }
            else{
                return o.value===value?.value
            }
        });
        if(selection.length)
            return selection[0].label;
    }

    return(
        <div 
            className={`cx-advanced-select ${isSelectOpen&&'cx-advanced-select-open'}`}
            ref={selectRef}
        >
            
            <div className="cx-advanced-select__trigger" onClick={toggleSelect}>
                <span className='cx-advanced-select__placeholder'>{getSelectedValueLabel() || defaultDisplay}</span>
                <span className="cx-advanced-select__arrow"></span>          
            </div>

            {
                isSelectOpen &&
                <div className="cx-advanced-select__selectContainer__popup">
                    <i className="fa-sharp fa-solid fa-caret-up"></i>
                    <input type="text" value={filter} onChange={(e)=>{setFilter(e.target.value)}} placeholder="Search..." />
                    <ul>
                        {
                            options.filter(o=>(o.label.indexOf(filter)>-1)).map((o, i)=>{
                                return (
                                    <li key={i} onClick={()=>{selectValue(o); toggleSelect()}}>
                                        {o.label}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            }
            
        </div>
    )
}

const Wrapper = () => {
    const {register, handleSubmit, control } = useForm();

    const options = [
        {
            "label": "Ad Set Categories Last Clicked Time",
            "value": "adset_categories:lastClickedTime",
            "extra": {
                "helper": "by selecting a country you can check the total number of users in it",
            }
        },
        {
            "label": "country code",
            "value": "country_code",
            "extra": {
                "helper": "by selecting a country you can check the total number of users in it",
            }
        },

      ]
    return (
        <form onSubmit={handleSubmit((values)=>console.log(values))}>
            <CXAdvancedSelect 
                {...{
                    control,
                    name: "advancedSelect ",
                    options,
                    dislayProp: "label"
                }}
            />
            <input type="submit" />
        </form>
    );

    
}


export default Wrapper;