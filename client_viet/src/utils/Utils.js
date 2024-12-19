export default class Utils {
    static formatUTF8(str) {
        return str.trim().toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .replace(" ", "_")
    }
    static sortObjects(array, property = "ma_xe", search = null, ascending = true) {
        if (!array || array.length === 0) return [];

        // Lọc nếu search có giá trị hợp lệ
        if (search?.trim()) {
            array = array.filter((item) =>
                JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
            );
        }

        // Sắp xếp dựa trên thuộc tính và thứ tự
        return array.sort((a, b) => {
            const valueA = a[property];
            const valueB = b[property];

            // Kiểm tra null hoặc undefined
            if (valueA == null || valueB == null) return 0;

            // So sánh giá trị theo kiểu chuỗi
            if (typeof valueA === "string" && typeof valueB === "string") {
                return ascending
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);
            }

            // So sánh giá trị theo kiểu số
            if (valueA < valueB) return ascending ? -1 : 1;
            if (valueA > valueB) return ascending ? 1 : -1;

            return 0; // Nếu bằng nhau
        });
    }
    /**
     * @norecommend
     * @param {Array} array 
     * @param {*} filter options
     * @returns 
     */
    static sortObjectsByFilter(array, filter) {
        return Utils.sortObjects(array, filter.orderBy, filter.search, filter.order == "asc")
    }
    static convertToVND(number) {
        try {
            if (isNaN(number)) {
                throw new Error("Giá trị nhập vào không hợp lệ");
            }
            number = parseFloat(number);
            let vnd = number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
            return vnd;
        } catch (error) {
            return null;
        }
    }
    static formatDate(date) {
        const d = new Date(date * 1000);
        const month = d.toLocaleString("default", { month: "numeric" });
        const day = d.getDate();
        const year = d.getFullYear();
        return `${day}/ ${month}/ ${year}`;
    };
}