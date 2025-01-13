import { useSearchParams } from "react-router-dom";

function Sort({ label, items, selected, displayName, valueName }) {
  const [params, setParams] = useSearchParams();
  const changeSortCondition = (e) => {
    setParams((pre) => {
      const newURLParams = new URLSearchParams(pre);
      newURLParams.set("sort", e.target.value);
      return newURLParams;
    });
  };
  return (
    <>
      <div className="form-inline">
        <label className="text-muted mr-3" htmlFor="sort">
          {label}
        </label>
        <select onChange={changeSortCondition} defaultValue={selected} className="form-control" id="sort">
          <option value={"all"}>Tất cả</option>
          {items &&
            items.map((item) => {
              return (
                <option
                  key={item[valueName || "value"]}
                  value={item[valueName || "value"]}
                >
                  {item[displayName || "name"]}
                </option>
              );
            })}
        </select>
      </div>
    </>
  );
}

export default Sort;
