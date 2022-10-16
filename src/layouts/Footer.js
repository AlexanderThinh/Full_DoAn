import { Col, Container, Image, Row } from 'react-bootstrap'
import '../App.css'
import QR_Code from '../image/QR_Code_1.jpg'
import Certificate from '../image/Certificate.png'
import GGPlay from '../image/Google_Play.png'
import AppStore from '../image/App_Store.png'
import DMCA from '../image/DMCA.png'
import Pay from '../image/Pay.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faServicestack, faElementor, faFacebook, faInstagram, faViber, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faUserCheck, faDollar, faMoneyCheck, faCartArrowDown } from '@fortawesome/free-solid-svg-icons'

function Footer() {
    return (
        <div>
            <Container>
                <Row>
                    <h4 style={{margin: '30px 0'}}>Vì sao chọn AlexanderThinhTourist</h4>
                    <Col md={4}>
                        <div className='why_choose__footer'>
                            <FontAwesomeIcon icon={faServicestack} style={{fontSize: '60px'}} />
                            <h5 className='title_why_choose__footer'>Sản phẩm & Dịch vụ</h5>
                            <p>Đa dạng - Chất lượng - An toàn</p>
                        </div>
                        <div className='why_choose__footer'>
                        <FontAwesomeIcon icon={faUserCheck} style={{fontSize: '60px'}} />
                            <h5 className='title_why_choose__footer'>Hỗ trợ</h5>
                            <p>Hotline & trực tuyến (08h00 - 22h00)</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className='why_choose__footer'>
                            <FontAwesomeIcon icon={faDollar} style={{fontSize: '60px'}} />
                            <h5 className='title_why_choose__footer'>Giá cả</h5>
                            <p>Luôn có mức giá tốt nhất</p>
                        </div>
                        <div className='why_choose__footer'>
                        <FontAwesomeIcon icon={faMoneyCheck} style={{fontSize: '60px'}} />
                            <h5 className='title_why_choose__footer'>Thanh toán</h5>
                            <p>An toàn & linh hoạt</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className='why_choose__footer'>
                            <FontAwesomeIcon icon={faElementor} style={{fontSize: '60px'}} />
                            <h5 className='title_why_choose__footer'>Mạng bán tour</h5>
                            <p>Đầu tiên tại Việt Nam ứng dụng công nghệ mới nhất</p>
                        </div>
                        <div className='why_choose__footer'>
                        <FontAwesomeIcon icon={faCartArrowDown} style={{fontSize: '60px'}} />
                            <h5 className='title_why_choose__footer'>Đặt tour</h5>
                            <p>Dễ dàng & nhanh chóng chỉ với 3 bước</p>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div style={{backgroundColor: '#ccc'}}>
                <Container>
                    <Row style={{padding: '50px 0', }}>
                        <Col md={8}>
                            <Row>
                                <Col md={4}>
                                    <h5 className='title__footer'>Du lịch trong nước</h5>
                                    <p className='destination__footer'>Hà Nội</p>
                                    <p className='destination__footer'>Hải Phòng</p>
                                    <p className='destination__footer'>Hạ Long</p>
                                    <p className='destination__footer'>Huế</p>
                                    <p className='destination__footer'>Đà Nẵng</p>
                                    <p className='destination__footer'>Đà Lạt</p>
                                </Col>
                                <Col md={4}>
                                    <h5 className='title__footer'>Du lịch nước ngoài</h5>
                                    <p className='destination__footer'>Trung Quốc</p>
                                    <p className='destination__footer'>Thái Lan</p>
                                    <p className='destination__footer'>Hàn Quốc</p>
                                    <p className='destination__footer'>Nhật Bản</p>
                                    <p className='destination__footer'>Maldives</p>
                                    <p className='destination__footer'>Hà Lan</p>
                                </Col>
                                <Col md={4}>
                                    <h5 className='title__footer'>Dòng tour</h5>
                                    <p className='destination__footer'>Cao cấp</p>
                                    <p className='destination__footer'>Tiêu chuẩn</p>
                                    <p className='destination__footer'>Tiết kiệm</p>
                                    <p className='destination__footer'>Giá tốt</p>
                                </Col>
                                
                            </Row>
                        </Col>
                        <Col md={4}>
                            <Row>
                                <Col md={6}>
                                    <h5 className='title__footer'>Ứng dụng di động</h5>
                                    <Image src={GGPlay} style={{width: '70%'}} />
                                    <p style={{marginTop: '10px'}}>Android</p>
                                    <Image src={QR_Code} style={{width: '70%', border: '1px solid #ccc'}} />
                                </Col>
                                <Col md={6}>
                                    <h5 className='title__footer' style={{opacity: '0'}}>Ứng dụng di động</h5>
                                    <Image src={AppStore} style={{width: '70%'}} />
                                    <p style={{marginTop: '10px'}}>iOS</p>
                                    <Image src={QR_Code} style={{width: '70%', border: '1px solid #ccc'}} />
                                </Col>
                                
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <h5 className='title__footer'>Liên hệ</h5>
                            <p className='destination__footer'>190 Pasteur, Phường Võ Thị Sáu, Quận 3, TP.HCM</p>
                            <p className='destination__footer'>(+84 28) 3822 8898</p>
                            <p className='destination__footer'>(+84 28) 3829 9142</p>
                            <p className='destination__footer'>info@vietravel.com</p>
                        </Col>
                        <Col md={3}>
                            <h5 className='title__footer'>Thông tin</h5>
                            <p className='destination__footer'>Tạp chí du lịch</p>
                            <p className='destination__footer'>Cẩm nang du lịch</p>
                            <p className='destination__footer'>Tin tức</p>
                            <p className='destination__footer'>Sitemap</p>
                            <p className='destination__footer'>Chính sách riêng tư</p>
                            <p className='destination__footer'>Thỏa thuận sử dụng</p>
                        </Col>
                        <Col md={3}>
                            <h5 className='title__footer'>Mạng xã hội</h5>
                            <FontAwesomeIcon className='social_media__footer' icon={faFacebook} />
                            <FontAwesomeIcon className='social_media__footer' icon={faInstagram} />
                            <FontAwesomeIcon className='social_media__footer' icon={faYoutube} />
                            <FontAwesomeIcon className='social_media__footer' icon={faViber} />
                            <FontAwesomeIcon className='social_media__footer' icon={faTwitter} />
                            
                            <h5 className='title__footer'>Chấp nhận thanh toán</h5>
                            <Image src={Pay} style={{width: '70%'}} />
                        </Col>
                        <Col md={3}>
                            <h5 className='title__footer'>Chứng nhận</h5>
                            <Image src={DMCA} style={{width: '50%'}} />       
                            <Image src={Certificate} style={{width: '70%', marginTop: '10px'}} />       
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Footer