import React, { useState, useEffect, useRef } from 'react';
import './SelectWPills.css';
import { useForm, useController } from 'react-hook-form';
import { CXPill } from "../index"

const useOutsideClick = (ref, callback) => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      callback(event);
    };
  
    useEffect(() => {
      document.addEventListener("click", listener);
      return () => document.removeEventListener("click", listener);    
    }, []);
};


const SelectWPills = ({control, options, name, width}) => {

    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [pills, setPills] = useState([]);
    const [filter, setFilter] = useState("");

    const selectRef = useRef();

    useOutsideClick(selectRef, ()=>{setIsSelectOpen(false)});

    useEffect(() => {
        onChange(pills)
    }, [pills]);

    const {
        field: { onChange, value },
      } = useController({
        name,
        control,
        rules: { required: true },
        defaultValue: "",
      });

      return (
        <>
        <div className='cx-select-w-pills-container' style={{width}} ref={selectRef}>
            <div className="cx-select-w-pills__pillsContainer">
                {
                    pills.map((pill, i)=>{
                        return (
                            <CXPill 
                                text={pill.label}
                                key={i}
                                close={()=>{
                                    setPills(pills.filter(p=>p.value!=pill.value))
                                }}
                            />
                        )
                    })
                }
            </div>
            <div className={`cx-select-w-pills__selectContainer ${isSelectOpen && 'cx-select-w-pills-open'}`}>
                <button
                    className="cx-btn cx-select-w-pills__selectContainer__trigger"
                    onClick={()=>setIsSelectOpen(!isSelectOpen)}
                >
                    <i className="fa fa-plus"></i>
                </button>
                {
                    isSelectOpen &&
                    <div className="cx-select-w-pills__selectContainer__popup">
                        <i className="fa-sharp fa-solid fa-caret-up"></i>
                        <input type="text" value={filter} onChange={(e)=>{setFilter(e.target.value); console.log(filter)}}/>
                        <ul>
                            {
                                options.filter(o=>(o.label.indexOf(filter)>-1 && !pills.includes(o))).map((o, i)=>{
                                    return (
                                        <li key={i} onClick={()=>{setPills([...pills, o])}}>
                                            {o.label}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                }
            </div>
        </div>
        </>
    );
}


const SelectWPillsForm = () => {

    const {handleSubmit, control} = useForm();
    const options = [
        { label: "one" , value: "1" },
        { label: "two" , value: "2" },
        { label: "three" , value: "3" },
        { label: "four" , value: "4" },
        { label: "five" , value: "5" },
        { label: "six" , value: "6" },
        { label: "sevem" , value: "7" },
    ]

    return (
        <form onSubmit={handleSubmit((values)=>console.log(values))}>
            <SelectWPills 
                {...{
                    width: '400px',
                    control,
                    options, 
                    name: "swp"
                }}
            />

        </form>
    );
}




export default SelectWPillsForm;
