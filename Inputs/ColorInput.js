import React, {useEffect} from 'react'
import Input from "./Input";

const ColorInput =  React.forwardRef( ({margin,label,defaultColor,onChange},ref) => {
    const [color, setColor] = React.useState(defaultColor);
    useEffect(()=>{
        setColor(defaultColor)
    },[defaultColor])
	return (
        <Input label={label}
               morph={true}
               className={margin}
               defaultValue={color} disabled>
           <div style={{
               position:'absolute',
               right:12,
               top:12
           }}>
               <input
                   ref={ref}
                   type="color"
                   value={color}
                   onChange={(e) => {
                       setColor(e.target.value)
                       onChange(e.target.value)
                   }}
               />
           </div>
        </Input>
	)
});

export default ColorInput;
