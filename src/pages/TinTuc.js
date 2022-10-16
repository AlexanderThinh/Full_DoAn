import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faAngleUp, faCalendarDay} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react"
import { Button, ButtonGroup, Col, Container, Image, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import Apis, { endpoints } from "../configs/Apis"
import '../App.css'

function TinTuc() {
    const [tinTuc, setTinTuc] = useState([])
    const [goToTop, setGoToTop] = useState(false)
    const [prev, setPrev] = useState(false)
    const [next, setNext] = useState(false)
    const [page, setPage] = useState(1)

    const handleScroll = () => {
        setGoToTop(false)
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
        });
    }

    useEffect(() => {
        const loadTinTuc = async () => {
            // let query = location.search 

            // if (query === "")
            //     query = `?page=${page}`
            // else
            //     query += `&page=${page}`

            let query = `?page=${page}`

            try {
                let res = await Apis.get(`${endpoints.tinTuc}${query}`)
                setTinTuc(res.data.results)

                setNext(res.data.next != null)
                setPrev(res.data.previous != null)
            } catch (err) {
                console.error(err)
            }  
        }
        loadTinTuc()
        window.scrollTo({
            top: 0, 
            behavior: 'instant'
        });
    }, [page])

    useEffect(() => {
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
        });

        const handleScroll = () => {
            if(window.scrollY >= 400) {
                setGoToTop(true)
            } else {
                setGoToTop(false)
            }
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const paging = (num) => {
        setPage(page + num)
    }

    return (
        <>
            <Container>
                <h3 style={{margin: '100px 0 40px'}}>Trang Tin Tức Du Lịch Trong Nước Và Ngoài Nước</h3>

                <Row>
                    <Col md={4}>
                        <h4 style={{backgroundColor: '#3882b6', margin: '0', padding: '10px 14px', borderRadius: '8px 8px 0 0'}}>Liên Hệ</h4>
                        <div style={{backgroundColor: '#ccc', padding: '10px 14px', borderRadius: '0 0 8px 8px'}}>
                            <h4>CÔNG TY CỔ PHẦN DỊCH VỤ DU LỊCH AlexanderThinh</h4>
                            <p>- Trụ sở: 70 Lý Tự Trọng, P. Bến Thành, Quận 1, TP. Hồ Chí Minh</p>
                            <p>- Điện thoại: 028.3520 2020</p>
                            <p>- Fax: 028.3829 5060</p>
                            <p>- Email: AlexanderThinh@tourist.com</p>
                            <p>- Tổng đài: 1900 6668</p>
                        </div>
                    </Col>
                    <Col md={8}>
                        {tinTuc.map(tt => {
                            let path = `/tin-tuc/${tt.id}/`
                            return <Row key={tt.id} style={{backgroundColor: '#ccc', margin: '0 0 20px', padding: '16px 0', borderRadius: '6px'}}>
                                <Col md={4}>
                                    <Link to={path}>
                                        <Image src={tt.hinh_anh} style={{width: '100%'}} />
                                    </Link>
                                </Col>
                                <Col md={8}>
                                    <h5>{tt.chu_de}</h5>
                                    <p className="noi_dung__tin_tuc">{tt.noi_dung}</p>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <h6 style={{margin: '0'}}>
                                            <FontAwesomeIcon icon={ faCalendarDay } style={{margin: '0 6px 0 0'}} /> 
                                            {new Date(tt.ngay_dang).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                        </h6>
                                        <Link to={path} style={{textDecoration: 'none'}}>Xem chi tiết</Link>
                                    </div>
                                </Col>
                            </Row>
                        })}

                    <ButtonGroup>
                        <Button onClick={() => paging(-1)} variant="info" disabled={!prev}>&lt;&lt;</Button>
                        <Button onClick={() => paging(1)} variant="info" disabled={!next}>&gt;&gt;</Button>
                    </ButtonGroup>
                    </Col>
                </Row>
            </Container>
                        
            {goToTop && (
                <div onClick={handleScroll} className='btn_go_to_top'>
                    <FontAwesomeIcon icon={faAngleUp} />
                </div>
            )}
        </>
    )
}

export default TinTuc