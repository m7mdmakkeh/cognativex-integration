import React, {useState,useEffect, useRef} from 'react';
import { useForm, useController } from 'react-hook-form';
import './Controller.css';



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







const CXControlledSelect = ({onChange, onBlur, value, name, inputRef, options}) => {

    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef();
    useOutsideClick(selectRef, ()=>{
        if(isOpen) alert("asd")
    });

    const toggleSelect = () => {
        setIsOpen(!isOpen);
    }

    const selectValue = (value) => {
        onChange(value);
        // setIsOpen(!isOpen);
    }

    return(
        <div 
            className={`cx-select ${isOpen&&'open'}`}
            onClick={toggleSelect}
            ref={selectRef}
        >
            <div className="cx-select__trigger">
                <span className='cx-select__placeholder'>{value || "Select"}</span>
                <span className="cx-select__arrow"></span>          
            </div>

            {
                isOpen && 
                <ul className='cx-select__options'>
                    <span className='cx-select__separator'></span>
                    {options.map((o, i)=>{
                        return <li style={{'--i':i}} className="cx-select__option" key={i} onClick={()=>{selectValue(o)}}>{o}</li>
                    })}
               </ul>
            }
            
        </div>
    )
} 



const ControlledInput = ({control, name}) => {

    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { isTouched, isDirty },
        formState: { touchedFields, dirtyFields }
      } = useController({
        name,
        control,
        rules: { required: true },
        defaultValue: "",
      });

    const options = ['one', 'two', 'three', 'three', 'three', 'three', 'three', 'three', 'three']
    return (
        <CXControlledSelect 
            {...{
                onChange,
                onBlur,
                value,
                name,
                options,
                inputRef:ref
            }}
        />
    )
}





const Controller = () => {

    const {register, handleSubmit, control } = useForm();


    console.log("rendereede")

    return (
        <form onSubmit={handleSubmit((values)=>console.log(values))}>
            <ControlledInput 
                {...{
                    control,
                    name: "controlled"
                }}
            />
            <input type="submit" />
        </form>
    );
}

export default Controller;
