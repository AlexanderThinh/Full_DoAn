import { queryAllByPlaceholderText } from "@testing-library/react"
import { useEffect, useState } from "react"
import { Button, ButtonGroup, Card, Col, Container, Image, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import Apis, { endpoints } from "../configs/Apis"
import '../App.css'
import Slider1 from '../image/Slider_1.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleUp } from "@fortawesome/free-solid-svg-icons"

function Home() {
    const [tours, setTours] = useState([])
    const [goToTop, setGoToTop] = useState(false)
    const [prev, setPrev] = useState(false)
    const [next, setNext] = useState(false)
    const [page, setPage] = useState(1)
    const [q] = useSearchParams()
    const navigate = useNavigate()
    const user = useSelector(state => state.user.user)
    const infoCustomer = useSelector(state => state.infoCustomer.infoCustomer)

    // const [num, setNum] = useState(0)
    const dispatch = useDispatch()
    const num = useSelector(state => state.num.num)

    //Lay tham so 'loai-tour', 'ten-tour' tren URL
    let loaiTourID = q.get('loai-tour')
    let tourName = q.get('ten-tour')
    let lengthTour = q.get('length')
    let fromPrice = q.get('from-price')
    let toPrice = q.get('to-price')
    //Lay tham so 'loai' tren URL

    useEffect(() => {
        const loadTours = async () => {
            let queryLoaiTour = ""
            let queryOthers = ""

            if (loaiTourID != "" && loaiTourID != null) {
                queryLoaiTour = `?loai-tour=${loaiTourID}`
            } else {
                queryLoaiTour = "?loai-tour="
            }

            if(tourName != "" && tourName != null) {
                queryOthers += `&ten-tour=${tourName}`
            }

            if(lengthTour != "" && lengthTour != null) {
                queryOthers += `&length=${lengthTour}`
            }

            if(fromPrice != "" && fromPrice != null) {
                queryOthers += `&from-price=${fromPrice}`
            }

            if(toPrice != "" && toPrice != null) {
                queryOthers += `&to-price=${toPrice}`
            }

            if(page != 1) {
                queryOthers += `&page=${page}`
            }

            try {
                let res = await Apis.get(`${endpoints.tours}${queryLoaiTour}${queryOthers}`)
                setTours(res.data.results)

                setNext(res.data.next != null)
                setPrev(res.data.previous != null)
            } catch (err) {
                console.error(err)
            }  
        }

        loadTours()
    }, [q, page])

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

    const paging = (inc) => {
        setPage(page + inc)
    }

    const handleScroll = () => {
        setGoToTop(false)
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
        });
    }

    const detailTour = (tourID) => {
        navigate(`/tours/${tourID}/`)
    }

    const datTourPage = (tourID) => {
        if(user != null && user != undefined) {
            navigate(`/tours/${tourID}/booking/`)
        } else {
            alert('Bạn chưa đăng nhập! Vui lòng đăng nhập để đặt vé')
        }
    }

    const handleIncreaseNum = () => {
        // setNum(prev => prev + 1)

        dispatch({
            'type': 'INCREASE',
            'num': num
        })
    }

    const handleDecreaseNum = () => {
        // setNum(prev => prev - 1)

        dispatch({
            'type': 'DECREASE',
            'num': num
        })
    }

    return (
        <>
            <Image src={Slider1} className='slider_1__home' />

            <Container>
                <Button onClick={handleIncreaseNum}>Cong</Button>
                    <h3>{num}</h3>
                <Button onClick={handleDecreaseNum}>Tru</Button>

                <h3 style={{margin: '40px 0'}}>Khám Phá Các Tour Du Lịch</h3>
                <Row>
                    {tours.map((tour) => {
                        return <Col key={tour.id} md={3} xs={12}>
                            <Card className='card_wrap__home'> 
                                <Link to={`/tours/${tour.id}/`} style={{overflow: 'hidden'}}>
                                    <Card.Img variant="top" src={tour.hinh_anh} className='img_card__home' />
                                </Link>
                                <Card.Body>
                                    <Card.Title>{tour.ten_tour}</Card.Title>
                                    <Card.Text>
                                        Ngày khởi hành: {new Date(tour.ngay_bat_dau).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                    </Card.Text>
                                    <Card.Text>
                                        Thời gian: {tour.thoi_gian} ngày
                                    </Card.Text>
                                    <Button onClick={() => detailTour(tour.id)}>Xem chi tiết</Button>
                                    <Button style={{marginLeft: '60px'}} onClick={() => datTourPage(tour.id)} className="btn-danger">Đặt ngay</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    })}
                </Row> 

                <ButtonGroup>
                    <Button onClick={() => paging(-1)} variant="info" disabled={!prev}>&lt;&lt;</Button>
                    <Button onClick={() => paging(1)} variant="info" disabled={!next}>&gt;&gt;</Button>
                </ButtonGroup>
            </Container>

            {goToTop && (
                <div onClick={handleScroll} className='btn_go_to_top'>
                    <FontAwesomeIcon icon={faAngleUp} />
                </div>
            )}
        </>
    )
}

export default Home