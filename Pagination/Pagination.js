import React, {useState} from 'react';
import Pagination from '@atlaskit/pagination';

function Page({set,total}) {

    const [Active, setActive] = useState(0);

    return (
        <>
        <Pagination max={8} onChange={(_, page) => {set(page-1);setActive(page-1)}} selectedIndex={Active} pages={new Array(total).fill(1).map((x,i)=>i+1)}/>
        </>
    );
}

export default Page;