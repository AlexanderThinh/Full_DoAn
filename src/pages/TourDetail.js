import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Image, Row, Table } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import Apis, { endpoints } from "../configs/Apis"
import LichTrinh from "./LichTrinh"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faBowlFood, faCar, faCircle, faClock, faHotel, faStar } from '@fortawesome/free-solid-svg-icons'
import cookie from "react-cookies"
import Rating from "react-rating"
import { load } from "react-cookies"
import Moment from "react-moment"
import '../App.css'

function TourDetail() {
    const [tour, setTour] = useState({})
    const [rating, setRating] = useState(0)
    const [commentsTour, setCommentsTour] = useState([])
    const [imagesTour, setImagesTour] = useState([])
    const [commentTourContent, setCommentTourContent] = useState('')
    const [goToTop, setGoToTop] = useState(false)
    const navigate = useNavigate()
    const user = useSelector(state => state.user.user)

    // Lay tourID tren URL
    const { tourID } = useParams()
    // Lay tourID tren URL

    useEffect(() => {
        const loadTour = async () => {
            let res = await Apis.get(endpoints.tourDetail(tourID), {
                headers: {
                    'Authorization': `Bearer ${cookie.load('access_token')}`
                }
            })
            setTour(res.data)
            setRating(res.data.rate)
        }   
        loadTour()
    }, [rating])

    useEffect(() => {
        const loadCommentsTour = async () => {
            let res = await Apis.get(endpoints.getCommentsTour(tourID))
            setCommentsTour(res.data)
        }
        loadCommentsTour()
    }, [])

    useEffect(() => {
        const loadImagesTour = async () => {
            let res = await Apis.get(endpoints.getImagesTour(tourID))
            setImagesTour(res.data)
            console.log(res.data);
        }
        loadImagesTour()
    }, [])

    const datTourPage = (tourID) => {
        if(user != null && user != undefined) {
            navigate(`/tours/${tourID}/booking/`)
        } else {
            alert('Bạn chưa đăng nhập! Vui lòng đăng nhập để đặt vé')
        }
    }

    const handleRating = async (newRating) => {
        if(user != null && user != undefined) {
            try {
                let res = await Apis.post(endpoints.ratingTour(tourID), {
                    'rate': newRating
                }, {
                    headers: {
                        'Authorization': `Bearer ${cookie.load('access_token')}`
                    }
                })
            } catch (err) {
                console.error(err);
            }
        } else {
            setRating(0)
            alert('Bạn chưa đăng nhập! Vui lòng đăng nhập để đánh giá sản phẩm')
        }
    } 

    const handleComment = async (e) => {
        e.preventDefault()

        if(user != null && user != undefined) {
            if(commentTourContent != '') {
                try {
                    let res = await Apis.post(endpoints.commentsTour(tourID), {
                        'noi_dung': commentTourContent
                    }, {
                        headers: {
                            'Authorization': `Bearer ${cookie.load('access_token')}`
                        }
                    })
                    //Cap nhat lai vung component Comment
                    setCommentTourContent('')
                    setCommentsTour([res.data, ...commentsTour])
                    //Cap nhat lai vung component Comment
                } catch (err) {
                    console.error(err);
                }
            }
        } else {
            alert('Bạn chưa đăng nhập! Vui lòng đăng nhập để bình luận')
        }
    }

    let commentTourBlock
    if(user != null && user != undefined) {
        commentTourBlock = <Row style={{margin: '50px 0 10px'}}>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                        as="textarea" rows={4}
                        placeholder='Nhập bình luận...'
                        value={commentTourContent}
                        onChange={e => setCommentTourContent(e.target.value)}
                    />
                    <Button onClick={handleComment} style={{margin: '20px 0'}} variant="success">Bình luận</Button>
                </Form.Group>
            </Form>
        </Row>
    } else {
        commentTourBlock = <Link to='/login' style={{textDecoration: 'none'}}>
            <Row style={{margin: '50px 0 10px'}}>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                            as="textarea" rows={4}
                            placeholder='Đăng nhập để tha hồ bình luận ^^'
                        />
                    </Form.Group>
                </Form>
            </Row>
        </Link>
    }

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

    const handleScroll = () => {
        setGoToTop(false)
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
        });
    }

    return (
        <Container style={{marginTop: '100px'}}>
            <Row style={{backgroundColor: '#ccc', padding: '12px 0', borderRadius: '6px'}}>
                <Col md={4} xs={12}>
                    <Image src={tour.hinh_anh} style={{width: '100%', maxHeight: '450px'}} fluid />
                </Col>
                <Col md={8} xs={12}>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th colSpan={2} className='text-center'><h4>{tour.ten_tour}</h4></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Giá</td>    
                                <td><span className="text-danger">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(tour.don_gia)}</span>/khách</td>               
                            </tr>
                            <tr>
                                <td>Ngày khởi hành</td>
                                <td>{new Date(tour.ngay_bat_dau).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                            </tr>
                            <tr>                       
                                <td>Thời gian</td>
                                <td>{tour.thoi_gian} ngày</td>
                            </tr>
                            <tr>                       
                                <td>Số chỗ còn nhận</td>
                                <td>{tour.so_cho}</td>
                            </tr>
                            <tr>                       
                                <td>Nơi khởi hành</td>
                                <td>{tour.noi_khoi_hanh}</td>
                            </tr>
                        </tbody>
                    </Table>

                    <Button onClick={() => datTourPage(tour.id)} className="btn-danger">Đặt ngay</Button>
                    
                    <Row style={{marginTop: '16px'}}>
                        <Col md={3} xs={6}>
                            <div>
                                <FontAwesomeIcon icon={faClock} style={{fontSize: '24px'}} />
                                <h6 style={{margin: '6px 0'}}>Thời gian lý tưởng</h6>
                                <p>Quanh năm</p>
                            </div>
                        </Col>
                        <Col md={3} xs={6}>
                            <div>
                                <FontAwesomeIcon icon={faCar} style={{fontSize: '24px'}} />
                                <h6 style={{margin: '6px 0'}}>Phương tiện di chuyển</h6>
                                <p>Máy bay, xe du lịch</p>
                            </div>
                        </Col>
                        <Col md={3} xs={6}>
                            <div>
                                <FontAwesomeIcon icon={faHotel} style={{fontSize: '24px'}} />
                                <h6 style={{margin: '6px 0'}}>Khách sạn</h6>
                                <p>Khách sạn 4 sao</p>
                            </div>
                        </Col>
                        <Col md={3} xs={6}>
                            <div>
                                <FontAwesomeIcon icon={faBowlFood} style={{fontSize: '24px'}} />
                                <h6 style={{margin: '6px 0'}}>Ẩm thực</h6>
                                <p>Theo thực đơn</p>
                            </div>
                        </Col>
                    </Row>

                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'right'}}>
                        <h5 style={{margin: '0 10px'}}>Đánh giá</h5>
                        <Rating
                            style={{color: '#ffd700', fontSize: '20px', borderColor: 'red'}}
                            fullSymbol={<FontAwesomeIcon icon={faStar} />}
                            emptySymbol={<FontAwesomeIcon icon={faStar} style={{color: '#333'}} />}
                            initialRating={rating}
                            activeColor="#ffd700"   
                            onChange={handleRating}   
                        />
                    </div>
                </Col>
            </Row>

            <LichTrinh />

            {commentTourBlock}

            {commentsTour.map(comment => {
                return <Row key={Math.random()} style={{margin: '20px 0'}}>
                    <Col md={1}>
                        <Image src={comment.khach_hang.avatar} style={{width: '70%'}} roundedCircle fluid />
                    </Col>
                    <Col md={11} style={{backgroundColor: '#ccc', borderRadius: '6px', padding: '10px 20px 0'}}>
                        <p style={{color: 'blue', marginBottom: '8px'}}>{comment.khach_hang.username}</p>
                        <p>{comment.noi_dung}</p>
                        <em><p><Moment fromNow>{comment.created_date}</Moment></p></em>
                    </Col>
                </Row>
            })}

            <Row>
                <h5 style={{margin: '0 0 30px 0'}}>Danh sách hình ảnh</h5>
                {imagesTour.map(image => {
                    return <Col key={image.id} md={2} xs={12} >
                        <Image src={image.hinh_anh} style={{width: '70%'}} />
                    </Col>
                })}
            </Row>

            {goToTop && (
                <div onClick={handleScroll} className='btn_go_to_top'>
                    <FontAwesomeIcon icon={faAngleUp} />
                </div>
            )}
        </Container>
    )
}

export default TourDetail