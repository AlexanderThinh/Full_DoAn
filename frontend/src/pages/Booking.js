import { useEffect, useRef, useState } from "react"
import { Button, Col, Container, Form, Image, Row, Table } from "react-bootstrap"
import cookie from "react-cookies"
import { useParams, useNavigate, Link } from "react-router-dom"
import Apis, { endpoints } from "../configs/Apis"
import '../App.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleUp } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"
import InfoCustomer from "../ActionCreators/InfoCustomerCreators"
import ContactUs from "./ContactUs"
import emailjs from "emailjs-com"

function Booking() {
    const [tour, setTour] = useState({})
    const [lichTrinh, setLichTrinh] = useState([])
    const [amountAdult, setAmountAdult] = useState(1)
    const [amountChild, setAmountChild] = useState(0)
    const [blockPayNH, setBlockPayNH] = useState(false)
    const [blockPayVP, setBlockPayVP] = useState(false)
    const [blockPayOnline, setBlockPayOnline] = useState(false)
    const [contactName, setContactName] = useState('')
    const [contactPhoneNumber, setContactPhoneNumber] = useState('')
    const [contactEmail, setContactEmail] = useState('')
    const [contactAddress, setContactAddress] = useState('')
    const [checked, setChecked] = useState(undefined)
    const [errorEmailInput, setErrorEmailInput] = useState(null)
    const [errorContactPhoneInput, setErrorContactPhoneInput] = useState(null)
    const [linkMomo, setLinkMomo] = useState('') 
    const [goToTop, setGoToTop] = useState(false)
    const contactNameInput = useRef()
    const linkMomoRef = useRef()
    const contactPhoneNumberInput = useRef()
    const contactEmailInput = useRef()
    const { tourID } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const loadTour = async () => {
            let res = await Apis.get(endpoints.tourDetail(tourID))
            setTour(res.data)
        }   
        loadTour()
    }, [])

    useEffect(() => {
        const loadLichTrinh = async () => {
            let res = await Apis.get(endpoints.lichTrinh(tourID))
            setLichTrinh(res.data);
        }
        loadLichTrinh()
    }, [])

    const priceTicketChild = tour.don_gia - tour.don_gia*0.3
    const totalTicketPrice = (tour.don_gia*amountAdult) + (priceTicketChild*amountChild)

    const handlePayOnline = () => {
        setChecked('online')

        setBlockPayOnline(true)
        setBlockPayNH(false)
        setBlockPayVP(false)
    }

    const handlePayNH = () => {
        setChecked('NH')

        setBlockPayNH(true)
        setBlockPayVP(false)
        setBlockPayOnline(false)
    }

    const handlePayVP = () => {
        setChecked('VP')

        setBlockPayVP(true)
        setBlockPayNH(false)
        setBlockPayOnline(false)
    }

    let displayPayNH = 'none'
    let displayPayVP = 'none'

    if (blockPayNH == true) {
        displayPayNH = 'block'
    } 
    if (blockPayVP == true) {
        displayPayVP = 'block'
    }

    const blockNH = <div style={{display: displayPayNH, backgroundColor: '#f5f5f5', padding: '2px 12px', fontSize: '17px', border: '1px solid #ccc'}}>
        <h6 style={{margin: '14px 0'}}>THÔNG TIN THANH TOÁN CHUYỂN KHOẢN</h6>
        <p>- Ngân hàng TMCP Ngoại Thương Việt Nam - CN TP.HCM (VCB)</p>
        <p>- Tên đơn vị hưởng: CÔNG TY CỔ PHẦN DỊCH VỤ DU LỊCH BẾN THÀNH</p>
        <p>- Số tài khoản VNĐ: 007.1001204617</p>
        <p>- Tại Ngân Hàng VCB - CN TP.HCM</p>
    </div>

    const blockVP = <div style={{display: displayPayVP, backgroundColor: '#f5f5f5', padding: '2px 12px', fontSize: '17px', border: '1px solid #ccc'}}>
        <h6 style={{margin: '14px 0'}}>CÔNG TY CỔ PHẦN DỊCH VỤ DU LỊCH BẾN THÀNH (BENTHANH TOURIST)</h6>
        <p>- Trụ sở: 82-84 Calmette, P.Nguyễn Thái Bình, Quận 1, Tp.Hồ Chí Minh</p>
        <p>- Điện thoại: 028.38227788</p>
        <p>- Tổng đài: 1900 6668</p>
        <p>- Fax: 028.3829 5060</p>
        <p>- Email: alexanderthinh@tourist.com</p>
    </div>

    // const handleTestClick = (e) => {
    //     e.preventDefault()

    //     alert('Hello World!')
    // }

    function handleSendEmail() {
  
        const message = 'Cảm ơn quý khách đã sử dụng dịch vụ. Thông tin đơn hàng của quý khách\n' + 
        'Họ và tên: ' + contactName + ' Số điện thoại: ' + contactPhoneNumber + ' Email: ' + 
        contactEmail + 'Địa chỉ: ' + contactAddress + ' Tổng số tiền quý khách đã thanh toán: ' + 
        totalTicketPrice + 'đ'
        const emailContent = {
          to_name: contactEmail,
          message: message
        }
  
        emailjs.send('service_zv05jnj', 'template_qlz5dpg', emailContent, 'xFO6TgrO2DaK4ACBm')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
    }

    const handleBooking = async () => {
        const crypto = require('crypto')

        var partnerCode = "MOMOQDZS20220509"
        var accessKey = "4C00AIXjcbbMDzT5"
        var secretkey = "eBhyeI2j0Fibmy8QKZqWF85Ylnjbk88Z"

        // let infoContactCustomer = {
        //     name: contactName,
        //     email: contactEmail,
        //     phone: contactPhoneNumber,
        //     address: contactAddress

        // }
        let infoContactCustomer = contactName + contactPhoneNumber + contactEmail + contactAddress

        var infoContactCustomerHex = crypto.createHmac('sha256', secretkey)
            .update(infoContactCustomer)
            .digest('hex')

        var requestId = partnerCode + new Date().getTime()
        var orderId = requestId
        var orderInfo = "Thanh toán MOMO QR Code"
        var redirectUrl = "http://localhost:3000/"
        var ipnUrl = "https://callback.url/notify"
        var amount = '10000'
        var requestType = "captureWallet"
        var extraData = infoContactCustomerHex

        var rawSignature = "accessKey="+accessKey+"&amount=" + amount+"&extraData=" + extraData+"&ipnUrl=" + ipnUrl+"&orderId=" + orderId+"&orderInfo=" + orderInfo+"&partnerCode=" + partnerCode +"&redirectUrl=" + redirectUrl+"&requestId=" + requestId+"&requestType=" + requestType
        //puts raw signature
        console.log("--------------------RAW SIGNATURE----------------")
        console.log(rawSignature)
        
        //signature
        var signature = crypto.createHmac('sha256', secretkey)
            .update(rawSignature)
            .digest('hex');
        console.log("--------------------SIGNATURE----------------")
        console.log(signature)
        
        if(contactName == '') {
            alert('Vui lòng nhập họ và tên người liên hệ')
            contactNameInput.current.focus()
        } else if (contactPhoneNumber == '') {
            alert('Vui lòng nhập số điện thoại người liên hệ')
            contactPhoneNumberInput.current.focus()
        } else if (contactEmail == '') {
            alert('Vui lòng nhập email người liên hệ')
            contactEmailInput.current.focus()
        } else {
            let loai_ve_2
            if(amountChild == 0) {
                loai_ve_2 = '0'
            } else {
                loai_ve_2 = '2'
            }

            try {
                let response = await Apis.post('https://test-payment.momo.vn/v2/gateway/api/create', {
                    'partnerCode': partnerCode,
                    'accessKey': accessKey,
                    'secretkey': secretkey,
                    'requestId': requestId,
                    'orderId': orderId,
                    'orderInfo': orderInfo,
                    'redirectUrl': redirectUrl,
                    'ipnUrl': ipnUrl,
                    'amount': amount,
                    'requestType': requestType,
                    'extraData': extraData, //pass empty value if your merchant does not have stores
                    'signature': signature
                }, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
                        'Access-Control-Allow-Credentials': true,
                    }
                })

                dispatch(InfoCustomer(infoContactCustomer))
                
                setLinkMomo(response.data.payUrl)
                if(linkMomo != '') {
                    let res = await Apis.post(endpoints.booking(tourID), {
                        'loai_ve_1': 1,
                        'so_luong_1': amountAdult,
                        'don_gia_1': tour.don_gia,
                        'loai_ve_2': loai_ve_2,
                        'so_luong_2': amountChild,
                        'don_gia_2': priceTicketChild,
                    }, {
                        headers: {
                            'Authorization': `Bearer ${cookie.load('access_token')}`
                        }
                    })
                    
                    linkMomoRef.current.click()
                }
            } catch (err) {
                console.error(err);
            }
        }   
    }

    const blockInfoCustomers = <Row>
        <Col md={4}>
            <InfoCustomerForm 
                id='name'
                label='Họ tên'
                type='text'
                placeholder='Nhập họ tên...'
            />
        </Col>
        <Col md={4}>
            <Form.Group className="mb-3">
                <Form.Label>Giới tính</Form.Label>
                <Form.Select>
                    <option value={1}>Nam</option>
                    <option value={0}>Nữ</option>
                    <option value={-1}>Khác</option>
                </Form.Select>
            </Form.Group>
        </Col>
        <Col md={4}>
            <InfoCustomerForm 
                id='name'
                label='Ngày sinh'
                type='date'
            />
        </Col>
    </Row>

    let blockInfoCustomersAdult = []
    let blockInfoCustomersChild = []

    for(let i = 0; i < amountAdult; i++) {
        blockInfoCustomersAdult.push(Math.random())
    }
    for(let i = 0; i < amountChild; i++) {
        blockInfoCustomersChild.push(Math.random())
    }

    const handleBlurEmailForm = (value) => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(value)) {
            setErrorEmailInput('Vui lòng nhập đúng định dạng email')
            contactEmailInput.current.focus()
        } else {
            setErrorEmailInput(null)
        }
    }

    const handleBlurPhoneInput = (value) => {
        
        if(value.length < 10) {
            setErrorContactPhoneInput('Vui lòng nhập số điện thoại hợp lệ!')
            contactPhoneNumberInput.current.focus()
        } else {
            setErrorContactPhoneInput(null)
        }
    }

    const handleScroll = () => {
        setGoToTop(false)
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
        });
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

    return (
        <>
            <Container style={{marginTop: '100px'}}>
                <Container fluid>
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

                            <h4 style={{margin: '20px 0'}}>Hotline tư vấn đặt tour</h4>
                            <h5 style={{color: 'red', fontWeight: 'bold'}}>0866681044</h5>
                            <h5 style={{color: 'red', fontWeight: 'bold'}}>0168360482</h5>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={8} xs={12}>
                            <h4 className="text-danger" style={{margin: '30px'}}>Thông tin liên hệ</h4>
                            <Row style={{backgroundColor: '#f9f9f9', padding: '20px 0'}}>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label>Họ và tên <span style={{color: 'red'}}>*</span></Form.Label>
                                        <Form.Control 
                                            ref={contactNameInput}
                                            type="text" 
                                            placeholder="Nhập họ tên..."
                                            value={contactName}
                                            onChange={e => setContactName(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label>Email <span style={{color: 'red'}}>*</span> <span style={{color: 'red', margin: '0 10px'}}>{errorEmailInput}</span></Form.Label>
                                        <Form.Control   
                                            ref={contactEmailInput}
                                            type="email" 
                                            placeholder="Nhập email..."
                                            value={contactEmail}
                                            onChange={e => setContactEmail(e.target.value)}
                                            onBlur={e => handleBlurEmailForm(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label>Số điện thoại <span style={{color: 'red'}}>*</span> <span style={{color: 'red', margin: '0 10px'}}>{errorContactPhoneInput}</span></Form.Label>
                                        <Form.Control 
                                            ref={contactPhoneNumberInput}
                                            type="number" 
                                            placeholder="Nhập số điện thoại..."
                                            value={contactPhoneNumber}
                                            onChange={e => setContactPhoneNumber(e.target.value)}
                                            onBlur={e => handleBlurPhoneInput(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label>Địa chỉ</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Nhập địa chỉ..."
                                            value={contactAddress}
                                            onChange={e => setContactAddress(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <h4 className="text-danger" style={{margin: '30px'}}>Hành khách</h4>
                            <Row style={{backgroundColor: '#f9f9f9', padding: '20px 0'}}>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label>Người lớn</Form.Label>
                                        <Form.Control 
                                            type="number" 
                                            value={amountAdult}
                                            onChange={(e) => {
                                                if(e.target.value >= 1) {
                                                    setAmountAdult(e.target.value)
                                                } else {
                                                    alert('Số lượng không hợp lệ')
                                                }
                                            }}
                                        />
                                    </Form.Group>
                                    <h6>Quy định độ tuổi</h6>
                                    <Form.Group className="mb-3" controlId="password">
                                        <p>Người lớn sinh trước ngày <span style={{fontWeight: 'bold'}}>05/05/2010</span></p>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label>Trẻ em</Form.Label>
                                        <Form.Control 
                                            type="number" 
                                            value={amountChild}
                                            onChange={(e) => {
                                                if(e.target.value >= 0) {
                                                    setAmountChild(e.target.value)
                                                } else {
                                                    alert('Số lượng không hợp lệ')
                                                }
                                            }}
                                        />
                                    </Form.Group>   
                                    <Form.Group className="mb-3" controlId="password" style={{marginTop: '40px'}}>
                                        <p>Trẻ em sinh từ <span style={{fontWeight: 'bold'}}>06/05/2010</span> đến <span style={{fontWeight: 'bold'}}>05/05/2017</span></p>
                                    </Form.Group>                          
                                </Col>
                            </Row>

                            <h4 className="text-danger" style={{margin: '30px'}}>Thông tin hành khách</h4>

                            <h5 className="text-danger" style={{margin: '30px'}}>Người lớn</h5>
                            {blockInfoCustomersAdult.map(a => {
                                return <div key={Math.random()}>
                                    {blockInfoCustomers}
                                </div>
                            })}
                            
                            <h5 className="text-danger" style={{margin: '30px'}}>Trẻ em</h5>
                            {blockInfoCustomersChild.map(a => {
                                return <div key={Math.random()}>
                                    {blockInfoCustomers}
                                </div>
                            })}

                        </Col>
                        <Col md={4} xs={12}>
                            <h4 className="text-danger" style={{margin: '30px'}}>Tóm tắt chuyến đi</h4>

                            <div style={{border: '1px solid #333', padding: '10px', borderRadius: '5px'}}>
                                <p>- Ngày khởi hành: <span style={{fontWeight: 'bold'}}>{new Date(tour.ngay_bat_dau).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span></p>
                                <p>- Ngày kết thúc: <span style={{fontWeight: 'bold'}}>{new Date(tour.ngay_ket_thuc).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span></p>

                                {lichTrinh.map(lt => {
                                    return <p key={lt.id}>- {lt.noi_dung}</p>
                                })}

                                <h5>Hành khách</h5>
                                
                                <p>Người lớn: {amountAdult} x <span style={{fontWeight: 'bold'}}>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(tour.don_gia)}</span></p>
                                <p>Trẻ em: {amountChild} x <span style={{fontWeight: 'bold'}}>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(priceTicketChild)}</span></p>
                                <p style={{padding: '14px 0', borderTop: '1px solid #333', borderBottom: '1px solid #333', fontSize: '20px'}}>Tổng cộng: <span style={{fontWeight: 'bold'}}>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(totalTicketPrice)}</span></p>

                                <h5>Hình thức thanh toán</h5>
                                <div style={{fontSize: '20px', marginBottom: '14px'}}>
                                    <input type="radio" onChange={handlePayOnline} value="online" checked={checked=='online'} style={{transform: 'scale(1.5)'}} /> Thanh toán online
                                    <br />
                                    <input type="radio" onChange={handlePayNH} value="NH" checked={checked=='NH'} style={{transform: 'scale(1.5)'}} /> Chuyển khoản ngân hàng
                                    <br />
                                    {blockNH}
                                    <input type="radio" onChange={handlePayVP} value="VP" checked={checked=='VP'} style={{transform: 'scale(1.5)'}} /> Thanh toán tại văn phòng
                                    {blockVP}
                                </div>

                                <Button onClick={handleSendEmail} style={{width: '100%', fontSize: '20px', borderRadius: '12px'}} variant="info" type="submit">
                                    Đặt ngay
                                </Button>

                                {/* <Link ref={linkMomoRef} to="route" target="_blank" onClick={(event) => {event.preventDefault(); window.open(linkMomo)}}>Go to Google</Link> */}
                                <a style={{opacity: '0'}} ref={linkMomoRef} href={linkMomo}>Go to Google</a>

                            </div>
                        </Col>
                    </Row>

                </Container>
            </Container>

            {goToTop && (
                <div onClick={handleScroll} className='btn_go_to_top'>
                    <FontAwesomeIcon icon={faAngleUp} />
                </div>
            )}
        </>
    )
}

function InfoCustomerForm(props) {
    return (
        <>
            <Form.Group className="mb-3" controlId={props.id}>
                <Form.Label>{props.label}</Form.Label>
                <Form.Control 
                    type={props.type}
                    placeholder={props.placeholder}
                    // value={props.value}
                    // onChange={props.change}
                />
            </Form.Group>
        </>
    )
}

export default Booking