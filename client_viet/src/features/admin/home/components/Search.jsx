import { useSearchParams } from "react-router-dom";
import search from "@assets/img/admin/search.png";
import { useState } from "react";
function Search() {
  const [params, setParams] = useSearchParams();
  const [keyword, setKeyword] = useState("");
  const changeSearchKeyword = (e) => {
    e.preventDefault();
    if (e.code != "Enter" && e._reactName != "onClick") return;
    setParams((pre) => {
      const newURLParams = new URLSearchParams(pre);
      if(keyword =="") {
        newURLParams.delete("search");
        return newURLParams;
      }
      newURLParams.set("search", keyword);
      return newURLParams;
    });
  };
  return (
    <>
      <div className="search">
        <input
          onKeyUp={changeSearchKeyword}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          type="text"
          placeholder="Search.."
        />
        <button type="submit" onClick={changeSearchKeyword}>
          <img src={search} alt="" />
        </button>
      </div>
    </>
  );
}

export default Search;
