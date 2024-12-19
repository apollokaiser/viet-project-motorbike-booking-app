const title = {
    total: 'Số lượng xe',
    rented: 'Xe đã thuê'
}

// Số liệu sản phẩm
export default class ProductStatistic {
    constructor(total, rented) {
        this.total = total;
        this.rented = rented;
    }
   getData() {
        return Object.keys(title).map(propName => {
            return { data: this[propName], title: title[propName] };
        })
    }
}