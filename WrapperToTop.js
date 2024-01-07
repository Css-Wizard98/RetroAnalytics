import {useEffect} from "react";
import {useLocation} from "react-router-dom";

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 */


export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
	const wrapper = document.getElementById("wrapper");
    if(wrapper){
		wrapper.scroll(0,0);
	}
  }, [pathname]);

  return null;
}
