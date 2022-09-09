import React, {useState,useEffect, useRef} from 'react';
import { render } from 'react-dom';
import { useForm, useController, useFieldArray } from 'react-hook-form';
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


const CXArray = ({control, name, data}) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name
    });

    return (
        <>
            <button type='button' onClick={()=>{append({food: 'Food',drinks: 'Drink'})}}>Add</button>
            <div className="list">
                {
                    fields.map((field, index)=>{
                        return (
                            <div key={field.id} style={{display: 'flex', gap: '1rem', marginBottom: '1.4rem'}}>
                                <CXSelect 
                                    control={control}
                                    name={`${name}.${index}.food`}
                                    options={data.food}
                                />
                                <CXSelect 
                                    control={control}
                                    name={`${name}.${index}.drinks`}
                                    options={data.drinks}
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


const CXSelect = ({control, name, options}) => {

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
      const selectRef = useRef();
  
      //instead of passing a single ref you can pass a list of refs to listen for the click outside them 
      useOutsideClick(selectRef, ()=>{     
          setIsOpen(false);
      });
  
      const toggleSelect = () => {
          setIsOpen(!isOpen);
      }
  
      const selectValue = (value) => {
          onChange(value);
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





const Controller = () => {

    const {register, handleSubmit, control } = useForm();

    const data = {
        food: ["pizza", "burger", "pasta"],
        drinks: ["pepsi", "miranda", "ice tea"],
    }

    return (
        <form onSubmit={handleSubmit((values)=>console.log(values))}>
            <CXArray 
                {...{
                    control,
                    data,
                    name: "customSelect"
                }}
            />
            <input type="submit" />
        </form>
    );
}

export default Controller;
