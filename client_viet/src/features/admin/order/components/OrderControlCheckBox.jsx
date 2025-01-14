import { TextField } from "@mui/material";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

/**
 *
 * @param {} items
 * @param {String} value value name
 * @param {String} name display name
 */
function OrderControlCheckBox({
  items,
  value,
  name,
  getall = true,
  handleChoose,
  defaultCheck,
  radio = false,
}) {
  const [selected, setSelected] = useState([]);
  const [radioCheck, setRadioCheck] = useState(defaultCheck);
  const [params, setParams] = useSearchParams();
  const handleChooseCheckbox = (e) => {
    console.log(e.target);
    // code logic if that's the checkbox
    console.log("Value of target is: ", e.target.value);
    console.log("Value name is : ", value, e.target.name);
    let list = [];
    if (e.target.value == "all") {
      setSelected(list);
      handleChoose(null, value);
      return;
    }
    if (e.target.checked) {
      list = [...selected, e.target.value];
    } else {
      list = selected.filter((item) => item !== e.target.value);
    }
    handleChoose(list.join("-"), value);
    setSelected(list);
    return;
  };
  const handleChooseRadio = (e) => {
    setRadioCheck(e.target.value);
    handleChoose(e.target.value, value);
  };
  const defaultSelected = useMemo(() => {
    return !selected?.length;
  }, [JSON.stringify(selected)]);

  const check = (item) => {
    let valueParams = params.get(value);
    if (valueParams) {
      valueParams = valueParams.split("-");
      if (!selected.length) setSelected(valueParams);
      return valueParams.includes(item[value] + "");
    }
    if (defaultCheck) {
      return defaultCheck == item[value];
    }
    return selected?.includes(item[value] + "");
  };
  return (
    <>
      {getall && !radio && (
        <div className="checkbox-wrapper-4">
          <input
            onChange={handleChooseCheckbox}
            className="inp-cbx"
            id={value}
            type="checkbox"
            name={value}
            checked={defaultSelected}
            defaultValue={"all"}
          />
          <label className="cbx" htmlFor={value}>
            <span></span>
            <span>Tất cả</span>
          </label>
        </div>
      )}
      {items &&
        items.map((item) => (
          <div key={item[value]} className="checkbox-wrapper-4">
            {radio && (
              <input
                onChange={handleChooseRadio}
                className="inp-cbx"
                id={value + item[value]}
                type={"radio"}
                name={value}
                value={item[value]}
                checked={radioCheck === item[value]}
              />
            )}
            {!radio && (
              <input
                onChange={handleChooseCheckbox}
                className="inp-cbx"
                id={value + item[value]}
                name={value}
                type={"checkbox"}
                value={item[value]}
                checked={check(item)}
              />
            )}
            <label className="cbx" htmlFor={value + item[value]}>
              <span></span>
              <span>{item[name]}</span>
            </label>
          </div>
        ))}
    </>
  );
}

export default OrderControlCheckBox;
