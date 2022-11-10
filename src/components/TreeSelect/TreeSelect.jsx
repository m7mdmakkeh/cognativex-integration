import React, {useState} from "react";
import DropdownTreeSelect from "react-dropdown-tree-select";
import "./TreeSelect.css";
import data from "./data.json";
import {useController, useForm} from "react-hook-form"


const assignObjectPaths = (obj, stack) => { //not used and what is stack
  Object.keys(obj).forEach(k => {
    const node = obj[k];
    if (typeof node === "object") {
      node.path = stack ? `${stack}.${k}` : k;
      assignObjectPaths(node, node.path);
    }
  });
};

let selected = [];

const TreeSelect = ({name, control, setSelected}) => {

    const {field: { onChange, value }} = useController({
        name,
        control
    });


    const selectFromTree = (node, value) => {
        selected = [...value];
    }

    return (
        <div className="adset-form">
            <DropdownTreeSelect
                data={data}
                onChange={selectFromTree}
            />
        </div>
    );
};


const formWrapper = () => {
    const {register, control, handleSubmit} = useForm();


    return (
        <>
        <div>
        <pre>
            {JSON.stringify(selected, null, 2)}
        </pre>
        </div>
        <br />
        <form className="adset-form" onSubmit={handleSubmit((values)=>console.log(values))}>
            <TreeSelect control={control} name="IAB"/>
        </form>
        </>
    )
}

export default formWrapper;