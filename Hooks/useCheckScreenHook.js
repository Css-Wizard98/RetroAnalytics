import {useEffect, useState} from 'react';

function useCheckScreenHook() {

    const [Size, setSize] = useState('md');

    const checkScreen = () => {
        if(window.innerWidth<992){
            setSize('sm')
        }else{
            setSize('md')
        }
    }

    useEffect(() => {
        checkScreen()
        window.addEventListener('resize', checkScreen);
        return ()=>{
            window.removeEventListener('resize', checkScreen);
        }
    }, []);

    return Size
}

export {useCheckScreenHook};