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
            alert('B???n ch??a ????ng nh???p! Vui l??ng ????ng nh???p ????? ?????t v??')
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
            alert('B???n ch??a ????ng nh???p! Vui l??ng ????ng nh???p ????? ????nh gi?? s???n ph???m')
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
            alert('B???n ch??a ????ng nh???p! Vui l??ng ????ng nh???p ????? b??nh lu???n')
        }
    }

    let commentTourBlock
    if(user != null && user != undefined) {
        commentTourBlock = <Row style={{margin: '50px 0 10px'}}>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                        as="textarea" rows={4}
                        placeholder='Nh???p b??nh lu???n...'
                        value={commentTourContent}
                        onChange={e => setCommentTourContent(e.target.value)}
                    />
                    <Button onClick={handleComment} style={{margin: '20px 0'}} variant="success">B??nh lu???n</Button>
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
                            placeholder='????ng nh???p ????? tha h??? b??nh lu???n ^^'
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
                                <td>Gi??</td>    
                                <td><span className="text-danger">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(tour.don_gia)}</span>/kh??ch</td>               
                            </tr>
                            <tr>
                                <td>Ng??y kh???i h??nh</td>
                                <td>{new Date(tour.ngay_bat_dau).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                            </tr>
                            <tr>                       
                                <td>Th???i gian</td>
                                <td>{tour.thoi_gian} ng??y</td>
                            </tr>
                            <tr>                       
                                <td>S??? ch??? c??n nh???n</td>
                                <td>{tour.so_cho}</td>
                            </tr>
                            <tr>                       
                                <td>N??i kh???i h??nh</td>
                                <td>{tour.noi_khoi_hanh}</td>
                            </tr>
                        </tbody>
                    </Table>

                    <Button onClick={() => datTourPage(tour.id)} className="btn-danger">?????t ngay</Button>
                    
                    <Row style={{marginTop: '16px'}}>
                        <Col md={3} xs={6}>
                            <div>
                                <FontAwesomeIcon icon={faClock} style={{fontSize: '24px'}} />
                                <h6 style={{margin: '6px 0'}}>Th???i gian l?? t?????ng</h6>
                                <p>Quanh n??m</p>
                            </div>
                        </Col>
                        <Col md={3} xs={6}>
                            <div>
                                <FontAwesomeIcon icon={faCar} style={{fontSize: '24px'}} />
                                <h6 style={{margin: '6px 0'}}>Ph????ng ti???n di chuy???n</h6>
                                <p>M??y bay, xe du l???ch</p>
                            </div>
                        </Col>
                        <Col md={3} xs={6}>
                            <div>
                                <FontAwesomeIcon icon={faHotel} style={{fontSize: '24px'}} />
                                <h6 style={{margin: '6px 0'}}>Kh??ch s???n</h6>
                                <p>Kh??ch s???n 4 sao</p>
                            </div>
                        </Col>
                        <Col md={3} xs={6}>
                            <div>
                                <FontAwesomeIcon icon={faBowlFood} style={{fontSize: '24px'}} />
                                <h6 style={{margin: '6px 0'}}>???m th???c</h6>
                                <p>Theo th???c ????n</p>
                            </div>
                        </Col>
                    </Row>

                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'right'}}>
                        <h5 style={{margin: '0 10px'}}>????nh gi??</h5>
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
                <h5 style={{margin: '0 0 30px 0'}}>Danh s??ch h??nh ???nh</h5>
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