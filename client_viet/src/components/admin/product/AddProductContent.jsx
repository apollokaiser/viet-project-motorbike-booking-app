import UploadImageButton from "@comps/UploadImageButton";
import * as XLSX from 'xlsx'
import Alert from "@utils/Alert";
import ProductService from "@/services/ProductService";
import { useState } from "react";
 export default function AddBikes() {
    const [bikes, setBikes] = useState(null);
    const [headers, setHeaders] = useState(null);

    const handleUpload = (e) =>{
        e.preventDefault();
        const files = e.target.files;
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (e) =>{
            const data = e.target.result;
            const workbook = XLSX.read(data,{type: 'array'})
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const excelDataJson = XLSX.utils.sheet_to_json(worksheet, {defval:""}); 
            // get header row
            setHeaders(Object.keys(excelDataJson[0]))
            setBikes(excelDataJson);
        }
        reader.readAsArrayBuffer(file);
    }
    const updateImages = (image, index) =>{
        const updatedBikes =[...bikes];
        updatedBikes[index].image = image;
        setBikes(updatedBikes);
    }
    const deleteBike = (index) => {
        const updatedBikes = [...bikes];
        updatedBikes.splice(index, 1);
        setBikes(updatedBikes);
    }
    const addBikes = async () =>{
       const result = await ProductService.uploadAndAddBikes(bikes);
       if(result) {
        Alert.showToast("Thêm dữ liệu thành công");
        return;
       }
       Alert.showToast("Thêm dữ liệu thất bại");

    }
    return (
        <>
            <input onChange={handleUpload} type="file" name="file" accept=".xls,.xlsx" />
            <table className="add-bikes-table">
	<thead>
		<tr>
            {headers && headers.map((value, index) =>
                <td key={index}>{value}</td>
            ) }
            {bikes && <>
                <td>Hình ảnh</td>
                <td></td>
            </>
            }
		</tr>
	</thead>
	<tbody>
        { bikes &&
            bikes.map((bike, index)=>
                <tr key={index}>
                    {headers.map((header,index) =>
                        <td key={index}>{bike[header]}</td>
                    )}
            <td>
                <UploadImageButton name={bike[0]} index={index} onAddImage={updateImages}/>
            </td>
            <td>
                <button onClick={()=>deleteBike(index)} className="delete-button">
                <svg width="20px" height="20px" strokeWidth="0px" stroke="transparent" xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 512"><path fill="#FD3B3B" d="M74.981 74.981c99.976-99.975 262.063-99.975 362.038 0 99.975 99.976 99.975 262.063 0 362.038-99.975 99.975-262.062 99.975-362.038 0-99.975-99.975-99.975-262.063 0-362.038zm270.295 91.742l.003.003c8.86 8.86 8.819 23.415.003 32.232l-57.043 57.043 59.133 59.133c8.861 8.861 8.856 23.375-.002 32.233l-.003.002c-8.86 8.861-23.417 8.818-32.232.003l-59.134-59.134-57.041 57.041c-8.816 8.816-23.411 8.823-32.234 0l-.003-.003c-8.824-8.823-8.865-23.37 0-32.234l57.041-57.041-59.133-59.132c-8.815-8.816-8.821-23.414 0-32.235l.003-.003c8.821-8.821 23.372-8.863 32.235 0l59.133 59.132 57.043-57.043c8.861-8.862 23.375-8.853 32.231.003z"/></svg>
                </button>
            </td>
		</tr>
            )
        }
        <tr>
            {headers && 
            <td colSpan={headers.length}>
                <button onClick={addBikes} className="add-product-button">Thêm xe <span>({bikes && bikes.length})</span></button>
            </td>
            }
        </tr>
	</tbody>
</table>
        </>
    )
}