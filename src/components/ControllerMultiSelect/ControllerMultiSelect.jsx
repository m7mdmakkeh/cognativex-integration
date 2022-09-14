import React, {useState,useEffect, useRef} from 'react';
import { render } from 'react-dom';
import { useForm, useController, useFieldArray } from 'react-hook-form';
import './ControllerMultiSelect.css';



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


const CXArray = ({control, name, data}) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name
    });

    return (
        <>
            <button type='button' onClick={()=>{append({food: [],drinks: []})}}>Add</button>
            <div className="list">
                {
                    fields.map((field, index)=>{
                        return (
                            <div key={field.id} style={{display: 'flex', gap: '1rem', marginBottom: '1.4rem'}}>
                                <CXMultiSelect 
                                    control={control}
                                    name={`${name}.${index}.food`}
                                    options={data.food}
                                    defaultDisplay="Select Food"
                                />
                                <CXMultiSelect 
                                    control={control}
                                    name={`${name}.${index}.drinks`}
                                    options={data.drinks}
                                    defaultDisplay="Select Drinks"
                                />
                                <button type='button' onClick={()=>{remove(index)}}>remove</button>
                            </div>
                        )
                    })
                }
            </div>
            
        </>
    )
}


const CXMultiSelect = ({control, name, options, defaultDisplay}) => {

    const {
        field: { onChange, onBlur, value, ref },
      } = useController({
        name,
        control,
        rules: { required: true },
        defaultValue: "",
      });

    console.log("render")   //we have a performance issue

    const [isOpen, setIsOpen] = useState(false);
    const [selections, setSelections] = useState(value || []);
    const multiSelectRef = useRef();

    //instead of passing a single ref you can pass a list of refs to listen for the click outside them 
    useOutsideClick(multiSelectRef, ()=>{
        setIsOpen(false);
    });

    useEffect(() => {         // synchronize state with react-hook-form
        onChange(selections)
    }, [selections]);

    const toggleSelect = () => {
        setIsOpen(!isOpen);
    }

    const selectValue = (value) => {
        const selectionsClone = selections.slice();
        const index = selectionsClone.indexOf(value);   //may change the way of checking when dealing with objects(check for id or so, define your own high order fuinction)        
        index < 0
        ? setSelections([...selectionsClone, value])
        : setSelections(selectionsClone.splice(index, 1) && selectionsClone);
    }
    return(
        <div 
            className={`cx-multi-select ${isOpen&&'cx-multi-select-open'}`}
            ref={multiSelectRef}
        >
            <div onClick={toggleSelect} className="cx-multi-select__trigger">
                <span className='cx-multi-select__placeholder'>{defaultDisplay || "Select"}</span>
                <span className="cx-multi-select__arrow"></span>          
            </div>

            {
                isOpen && 
                <ul className='cx-multi-select__options'>
                    <span className='cx-multi-select__separator'></span>
                    {
                        options &&
                        options.map((o, i)=>{
                            return  <li 
                                        style={{'--i':i}} 
                                        className={`cx-multi-select__option ${(value.includes(o)) && "cx-multi-select__active-option"}`} 
                                        key={i} onClick={()=>{selectValue(o)}}
                                    >
                                        {o}
                                    </li>
                    })}
                </ul>
            }
            
        </div>
    )
}





const Controller = () => {

    const {register, handleSubmit, control } = useForm({
        defaultValues: {
            multiSelect: [
                {
                    food: ["pizza", "burger", "pasta"],
                    drinks: ["miranda"]
                }
            ]
        }
    });

    const data = {
        food: ["pizza", "burger", "pasta", "fries", "bbq", "burrito"],
        drinks: ["pepsi", "miranda", "ice tea", "water", "sparkling water", "lemon juice"],
    }

    return (
        <form onSubmit={handleSubmit((values)=>console.log(values))}>
            <CXArray 
                {...{
                    control,
                    data,
                    name: "multiSelect"
                }}
            />
            <input type="submit" />
        </form>
    );
}

export default Controller;
