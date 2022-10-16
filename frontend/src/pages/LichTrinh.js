import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import Apis, { endpoints } from "../configs/Apis"

function LichTrinh() {
    const [lichTrinh, setLichTrinh] = useState([])
    const [goToTop, setGoToTop] = useState(false)
    const { tourID } = useParams()

    useEffect(() => {
        const loadLichTrinh = async () => {
            let res = await Apis.get(endpoints.lichTrinh(tourID))
            setLichTrinh(res.data)
        }
        loadLichTrinh()
    }, [])


    return (
        <>
            <h3 className="text-center text-danger" style={{padding: '40px 0'}}>Lịch trình</h3>
            <div style={{border: '1px solid #666', borderRadius: '4px'}}>
                {lichTrinh.map(lt => {
                    return <Row key={lt.id} style={{marginLeft: 0, marginRight: 0}}>
                        <Col md={4} xs={12} style={{backgroundColor: '#ccc', paddingTop: '20px'}}>
                            <h5>{lt.tieu_de}</h5>
                        </Col>
                        <Col md={8} xs={12} style={{padding: '20px 0 0 20px'}}>
                            <h5>{lt.tieu_de}</h5>
                            <p>{lt.noi_dung}</p>
                        </Col>
                    </Row>
                })}
            </div>
        </>
    )
}

export default LichTrinh