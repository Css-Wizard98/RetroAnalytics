import React from 'react'
import Avt, {Skeleton} from '@atlaskit/avatar';

export default function Avatar({type="user",user,onClick})
{
    if(type==="skeleton"){
        return <Skeleton appearance="circle" />;
    }
    if(!user){
        return (<Avt/>)
    }
    const {image,name} = user;
	return (
        <Avt
            name={name}
            src={image}
            onClick={onClick}
        />
	)
}
