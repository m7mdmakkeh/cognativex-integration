import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import './Select.css';


const CXSelect = ({options, register, name, className})=>{
    return (
        <>
        <select className={`cx-select-native ${className??''}`} name="select" id="select" {...register(name)} >
            {
                options.map((option, index)=>{
                    return (
                        <option value={option.value} key={index}>{option.label}</option>
                    )
                })
            }
        </select>
        </>
    )
}


const CXArray = ({control, register, data}) => {
    const { fields, append, remove } = useFieldArray({
        control: control,
        name: "array"
    });

    return (
        <>
            <button type='button' onClick={()=>{append({numbers: '', food: ''})}}>Add</button>
            {
                fields.map((field, index)=>{
                    return (
                        <div key={field.id} style={{backgroundColor: '#1e1e2f', padding: '1rem', borderRadius: '5px', marginBottom: '1rem'}}>
                            <CXSelect 
                                options={data?.numbers}
                                register={register}
                                name={`array.${index}.numbers`}
                            />
                            &nbsp;
                            &nbsp;
                            <CXSelect 
                                options={data?.food}
                                register={register}
                                name={`array.${index}.food`}
                            />
                            &nbsp;
                            &nbsp;
                            <button type='button' onClick={()=>{remove(index)}}>remove</button>
                        </div>
                    )
                })
            }
        </>
    )
}





const Select = () => {

    const {register, control, handleSubmit} = useForm({
        defaultValues:{
            array:[
                {
                    numbers: '1',
                    food: 'pizza'
                }
            ]
        }
    });
    console.log("renderd")

    const numbers = [
        { label: "one" , value: "1" },
        { label: "two" , value: "2" },
        { label: "three" , value: "3" },
    ]
    const food = [
        { label: "pizza" , value: "pizza" },
        { label: "pasta" , value: "pasta" },
        { label: "burger" , value: "burger" },
    ]

    const data = {
        numbers,
        food
    }

    const onSubmit = (values) => {
        console.log(values)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CXArray 
                control={control}
                data={data}
                register={register}
            />
            <br />
            <br />
            <input type="submit" />
        </form>

    );
}

export default Select;
