import { useEffect, useRef, useState } from "react"
import { Button, Col, Container, Form, FormControl, Image, Nav, Navbar, Row } from "react-bootstrap"
import cookie from "react-cookies"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { LogoutUser } from "../ActionCreators/UserCreator"
import Apis, { endpoints } from "../configs/Apis"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faL, faXmark } from '@fortawesome/free-solid-svg-icons'
import '../App.css'
import { CustomerLogin, StaffLogin } from "../ActionCreators/TypeUserLoginCreator"

function Header() {
    const [loaiTour, setLoaiTour] = useState([])
    const [tourName, setTourName] = useState('')
    const [tourPriceFrom, setTourPriceFrom] = useState(0)
    const [tourPriceTo, setTourPriceTo] = useState(0)
    const [lengthTour, setLengthTour] = useState(1)
    const [displaySearchBlock, setDisplaySearchBlock] = useState(false)
    const [isHover, setIsHover] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loginSwitchRef = useRef()

    const user = useSelector(state => state.user.user)

    useEffect(() => {
        const loadLoaiTour = async () => {
            let res = await Apis.get(endpoints.loaiTour)
            setLoaiTour(res.data)
        }
        loadLoaiTour()
    }, [])

    const handleSearchTourName = (e) => {
        e.preventDefault()

        //Truyen tourName len URL
        // navigate(`/?ten-tour=${tourName}&length=${lengthTour}&from-price=${tourPriceFrom}&to-price=${tourPriceTo}`)
        if (tourPriceFrom != 0 && tourPriceTo != 0) {
            navigate(`/?ten-tour=${tourName}&length=${lengthTour}&from-price=${tourPriceFrom}&to-price=${tourPriceTo}`)
        }
        else if (tourPriceFrom != 0 && tourPriceTo == 0) {
            navigate(`/?ten-tour=${tourName}&length=${lengthTour}&from-price=${tourPriceFrom}`)
        }
        else if (tourPriceTo != 0 && tourPriceFrom == 0) {
            navigate(`/?ten-tour=${tourName}&length=${lengthTour}&to-price=${tourPriceTo}`)
        }  
        else {
            navigate(`/?ten-tour=${tourName}&length=${lengthTour}`)
        }
        //Truyen tourName len URL
        
    }

    const handleReset = () => {
        setTourName('')
        setLengthTour(1)
        setTourPriceFrom(0)
        setTourPriceTo(0)
    }

    // console.log(lengthTour);
    // console.log(tourPriceTo);

    const handleLogout = (e) => {
        e.preventDefault()

        cookie.remove('access_token')
        cookie.remove('user')
        dispatch(LogoutUser())

        navigate('/')
    }

    const handleHover = () => {
        setIsHover(true)
    }

    let pathLogin = <>
        <Link className="nav-link text-danger" to='/login' onMouseOver={handleHover}>Đăng nhập</Link>
        <Link className="nav-link text-danger" to='/register'>Đăng ký</Link>
    </>

    if (user != null && user != undefined) {
        pathLogin = <>
            <Link className="nav-link text-danger" to='/'>
                <Image src={user.avatar} style={{width: '20px', margin: '0 6px 2px 0'}} roundedCircle fluid />
                {user.username}
            </Link>
            <Link className="nav-link text-danger" to='/' onClick={handleLogout}>Đăng xuất</Link>
        </>
    }

    let blockSearch = 'none'
    let iconSearchBlock = faChevronDown

    const changeDisplaySearchBlock = () => {
        setDisplaySearchBlock(!displaySearchBlock)
    }

    if(displaySearchBlock == false) {
        blockSearch = 'none'
        iconSearchBlock = faChevronDown
    } else {
        blockSearch = 'block'
        iconSearchBlock = faChevronUp
    }

    const searchBlock = <div style={{display: blockSearch, position: 'absolute', top: '100%', width: '100%'}}>
        <Row style={{backgroundColor: '#ccc', borderRadius: '0 0 5px 5px', padding: '20px'}}>
            <Col md={5} xs={12}>
                <Form.Label>Nhập giá bắt đầu</Form.Label>
                <FormControl
                    style={{maxWidth: '90%'}}
                    type="search"
                    placeholder="Giá bắt đầu..."
                    className="me-2"
                    aria-label="Search"
                    value={tourPriceFrom}
                    onChange={e => setTourPriceFrom(e.target.value)}
                />
                <Form.Label>Nhập giá kết thúc</Form.Label>
                <FormControl
                    style={{maxWidth: '90%'}}
                    type="search"
                    placeholder="Giá kết thúc..."
                    className="me-2"
                    aria-label="Search"
                    value={tourPriceTo}
                    onChange={e => setTourPriceTo(e.target.value)}
                />
            </Col>
            <Col md={5} xs={12}>
                <Form.Label>Nhập thời gian tour du lịch</Form.Label>
                <FormControl
                    style={{maxWidth: '90%'}}
                    type="number"
                    placeholder="Thời gian..."
                    className="me-2"
                    aria-label="Search"
                    value={lengthTour} 
                    onChange={(e) => {
                        if(e.target.value < 1) {
                            alert('Thời gian tour không hợp lệ')
                        } else {
                            setLengthTour(e.target.value)
                        }
                    }}
                />
                <Form.Label>Nhập tên tour du lịch</Form.Label>
                <FormControl
                    style={{maxWidth: '90%'}}
                    type="search"
                    placeholder="Tên tour..."
                    className="me-2"
                    aria-label="Search"
                    value={tourName}
                    onChange={e => setTourName(e.target.value)}
                />
            </Col>
            <Col md={2} xs={12}>
                <Button onClick={handleSearchTourName} variant="success" style={{minWidth: '100px', margin: '20px 0'}}>Tìm kiếm</Button>
            </Col>
        </Row>
   </div>

    const handleCloseLoginSwitch = () => {
        setIsHover(false)
    } 

    const handleClickCustomerBtn = (e) => {
        e.preventDefault()
        setIsHover(false)
        dispatch(CustomerLogin(3))
        navigate('/login')
    }

    const handleClickStaffBtn = (e) => {
        e.preventDefault()
        setIsHover(false)
        dispatch(StaffLogin(2))
        navigate('/login')
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
                <Navbar.Brand href="#" style={{margin: '0 20px'}}>AlexanderThinhTourist</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" onClick={handleReset} to='/'>Home</Link>
                        <Link className="nav-link" onClick={handleReset} to='/tin-tuc'>Tin tức</Link>
                        {loaiTour.map((lt) => {
                            let path = `/?loai-tour=${lt.id}`
                            return <Link key={lt.id} className="nav-link" to={path}>
                                        {lt.ten_loai_tour}
                                    </Link>
                        })}

                        {pathLogin}

                    </Nav>
                    <Form className="d-flex" style={{margin: '0 20px'}}>
                        <Button onClick={changeDisplaySearchBlock} variant="outline-danger">
                            Bắt đầu tìm kiếm
                            <FontAwesomeIcon icon={iconSearchBlock} style={{margin: '0 6px'}} />
                        </Button>
                    </Form>
                </Navbar.Collapse>
                
                {searchBlock}
            </Navbar>

            <div className={isHover ? 'modal_login' : 'modal_login_hidden'}>
                <div ref={loginSwitchRef} className='login_switch'>
                    <div className="login_switch_header">
                        <h4 style={{color: 'blue'}}>Đăng nhập</h4>
                        <FontAwesomeIcon icon={faXmark} className='login_switch_close_btn' onClick={handleCloseLoginSwitch} />
                    </div>
                    <div className="login_switch_body">
                        <h3>Chào mừng bạn trở lại với </h3>
                        <h3>AlexanderThinhTourist</h3>
                        <p>Vui lòng đăng nhập với tư cách</p>
                        <button onClick={e => handleClickCustomerBtn(e)} className="login_switch_btn_login">Khách hàng đăng nhập</button>
                        <button onClick={e => handleClickStaffBtn(e)} className="login_switch_btn_login">Nhân viên đăng nhập</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header