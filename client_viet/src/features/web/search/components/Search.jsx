import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../search.css"

function Search() {
    const [open, setOpen] = useState(false);
    const [keywords, setKeywords] = useState("")
    const openSearch =() => {
        setOpen(!open);
    }
    const navigate = useNavigate()

    const insertKeywords  = (e) =>{
        setKeywords(e.target.value);
    }
    const handeSearchByKeywords = (e) =>{
       keywords && e.key=="Enter" && navigate("/tim-kiem?search="+keywords.trim())
    }

    return ( 
        <>
            <div className="search-block">
                <div onClick={openSearch} className="search-button">
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 32 32">
<path fill="#ed0049" d="M31.414,28.586l-9.648-9.648c1.213-1.706,2-3.736,2.183-5.938h-4.019c-0.495,3.94-3.859,7-7.931,7 s-7.436-3.06-7.931-7H0.051C0.562,19.15,5.72,24,12,24c2.588,0,4.979-0.833,6.939-2.233l9.646,9.647L31.414,28.586z" /><path fill="#0f518c" d="M12,4c4.072,0,7.436,3.06,7.931,7h4.019C23.438,4.85,18.28,0,12,0S0.562,4.85,0.051,11h4.019 C4.564,7.06,7.928,4,12,4z" />
</svg>
                    </div>
                </div>
                <div className={`search-input ${open ? "active":''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 32 32">
<path fill="#ed0049" d="M31.414,28.586l-9.648-9.648c1.213-1.706,2-3.736,2.183-5.938h-4.019c-0.495,3.94-3.859,7-7.931,7 s-7.436-3.06-7.931-7H0.051C0.562,19.15,5.72,24,12,24c2.588,0,4.979-0.833,6.939-2.233l9.646,9.647L31.414,28.586z" /><path fill="#0f518c" d="M12,4c4.072,0,7.436,3.06,7.931,7h4.019C23.438,4.85,18.28,0,12,0S0.562,4.85,0.051,11h4.019 C4.564,7.06,7.928,4,12,4z" />
</svg>
                    <input className="search-input-data" onKeyDown={handeSearchByKeywords} value={keywords} onChange={insertKeywords} type="text" />
                </div>
            </div>
        </>
     );
}

export default Search;