import img from "@/assets/img/admin/teachers.png"

function Box({title,data}) {

    return (<>
        <div className="card">
                    <div className="box">
                        <h1>{data}</h1>
                        <h3>{title}</h3>
                    </div>
                    <div className="icon-case">
                        <img src={img} alt="" />
                    </div>
                </div>
    </>);
}

export default Box;