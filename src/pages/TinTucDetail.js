import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleUp, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import Apis, { endpoints } from "../configs/Apis"
import '../App.css'
import { useSelector } from "react-redux"
import cookie from "react-cookies"
import Moment from "react-moment"

function TinTucDetail() {
    const [tinTuc, setTinTuc] = useState([])
    const [tinTucDetail, setTinTucDetail] = useState({})
    const [liked, setLiked] = useState(false)
    const [commentsTinTuc, setCommentsTinTuc] = useState([])
    const [commentTinTucContent, setCommentTinTucContent] = useState('')
    const [goToTop, setGoToTop] = useState(false)
    const user = useSelector(state => state.user.user)
    const {tinTucID} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const loadTinTucDetail = async () => {
            let res = await Apis.get(endpoints.tinTucDetail(tinTucID), {
                headers: {
                    'Authorization' : `Bearer ${cookie.load('access_token')}`
                }
            })
            setTinTucDetail(res.data)
            setLiked(res.data.like)
        }
        loadTinTucDetail()
    }, [tinTucID])

    useEffect(() => {
        const loadTinTuc = async () => {
            let res = await Apis.get(endpoints.tinTuc)
            setTinTuc(res.data)
        }
        loadTinTuc()
    }, [])

    useEffect(() => {
        const loadCommentsTinTuc = async () => {
            let res = await Apis.get(endpoints.getCommentsTinTuc(tinTucID))
            setCommentsTinTuc(res.data)
            // console.log(res.data);
        }
        loadCommentsTinTuc()
    }, [])

    let styleLikeBtn = 'btn_common'

    const handleLike = async () => {
        if(user != null && user != undefined) {
            let res = await Apis.post(endpoints.likeTinTuc(tinTucID), {}, {
                headers: {
                    'Authorization' : `Bearer ${cookie.load('access_token')}`
                }
            })
            setLiked(!liked)
        } else {
            alert('Bạn chưa đăng nhập! Vui lòng đăng nhập để like bài viết')
        }
    }

    if(liked) {
        styleLikeBtn = 'btn_common_active'
    } else {
        styleLikeBtn = 'btn_common'
    }

    const handleComment = async () => {
        if(commentTinTucContent != '') {
            try {
                let res = await Apis.post(endpoints.commentsTinTuc(tinTucID), {
                    'noi_dung': commentTinTucContent
                }, {
                    headers: {
                        'Authorization': `Bearer ${cookie.load('access_token')}`
                    }
                })
                setCommentTinTucContent('')
                setCommentsTinTuc([res.data, ...commentsTinTuc])
            } catch (err) {
                console.error(err);
            }
        }
    }

    let commentTinTucBlock
    if(user != null && user != undefined) {
        commentTinTucBlock = <Row style={{margin: '50px 0 10px'}}>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                        as="textarea" rows={4}
                        placeholder='Nhập bình luận...'
                        value={commentTinTucContent}
                        onChange={e => setCommentTinTucContent(e.target.value)}
                    />
                    <Button onClick={handleComment} style={{margin: '20px 0'}} variant="success">Bình luận</Button>
                </Form.Group>
            </Form>
        </Row>
    } else {
        commentTinTucBlock = <Link to='/login' style={{textDecoration: 'none'}}>
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
            <Row>
                <Col md={8}>
                    <h4 style={{margin: '20px 0'}}>{tinTucDetail.chu_de}</h4>
                    <p style={{margin: '20px 0'}}>
                        <span style={{fontWeight: 'bold'}}>Ngày đăng: </span>
                    {new Date(tinTucDetail.ngay_dang).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                    <p className="noi-dung__tin-tuc-detail">{tinTucDetail.noi_dung}</p>
                    <Image src={tinTucDetail.hinh_anh} style={{width: '100%'}} />
                </Col>
                <Col md={4}>
                    <div style={{display: 'flex'}}>
                        <p className="btn_common" >
                            <span>Twitter</span>
                            <FontAwesomeIcon style={{margin: '0 10px', fontSize: '20px'}} icon={faTwitter} />
                        </p>
                        <p className="btn_common" >
                            <span>Youtube</span>
                            <FontAwesomeIcon style={{margin: '0 10px', fontSize: '20px'}} icon={faYoutube} />
                        </p>
                    </div>
                    <div style={{display: 'flex'}}>
                        <p onClick={handleLike} className={styleLikeBtn} >
                            <span>Like</span>
                            <FontAwesomeIcon style={{margin: '0 10px', fontSize: '20px'}} icon={faThumbsUp} />
                        </p>
                        <p className="btn_common" >
                            <span>Facebook</span>
                            <FontAwesomeIcon style={{margin: '0 10px', fontSize: '20px'}} icon={faFacebook} />
                        </p>
                    </div>

                    <h4 style={{margin: '20px 0'}}>Tin tức liên quan</h4>
                    <ul>
                        {tinTuc.map(tt => {
                            let pathTinTucDetail = `/tin-tuc/${tt.id}/`
                            return <li key={tt.id}>
                                <Link className="tin-moi__tin-tuc-detail" to={pathTinTucDetail}>{tt.chu_de}</Link>
                            </li>
                        })}
                    </ul>

                    <h4 style={{margin: '20px 0'}}>Tin mới</h4>
                    <ul>
                        <li><Link className="tin-moi__tin-tuc-detail" to='/'>Vinpearl Phú Quốc, tất tần tật chỉ trong 1 cú click</Link></li>
                        <li><Link className="tin-moi__tin-tuc-detail" to='/'>Cuồng nhiệt cùng đội tuyển U23 Việt Nam tại Sea Games 31</Link></li>
                        <li><Link className="tin-moi__tin-tuc-detail" to='/'>Vietravel tặng vé xem bóng đá tại vòng loại Seagames 31</Link></li>
                        <li><Link className="tin-moi__tin-tuc-detail" to='/'>Kinh nghiệm du lịch Phú Quốc 3 ngày 2 đêm từ a – z</Link></li>
                        <li><Link className="tin-moi__tin-tuc-detail" to='/'>30-4 nên du lịch ở đâu? Top điểm đến không thể bỏ lỡ năm 2022</Link></li>
                        <li><Link className="tin-moi__tin-tuc-detail" to='/'>Có một TP.HCM mới lạ đến thế, bạn đã thử chưa?</Link></li>
                    </ul>
                </Col>
            </Row>

            {commentTinTucBlock}

            {commentsTinTuc.map(comment => {
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

            {goToTop && (
                <div onClick={handleScroll} className='btn_go_to_top'>
                    <FontAwesomeIcon icon={faAngleUp} />
                </div>
            )}
        </Container>
    )
}

export default TinTucDetail