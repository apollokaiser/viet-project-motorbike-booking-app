import { useEffect, useState } from "react";
import Box from "./Box";
import ProductService from "@/services/ProductService";

function BoxGroup() {
  const [datas, setDatas] = useState(null);
  useEffect(() => {
   ProductService.getProductStatus().then((result) => {
      if (result) setDatas(result);
    });
  }, []);
  return (
    <>
      <div className="cards">
        {datas &&
          datas.map((item, index) => (
            <Box key={index} data={item.data} title={item.title} />
          ))}
      </div>
    </>
  );
}
export default BoxGroup;
