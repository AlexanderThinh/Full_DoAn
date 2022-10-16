import { useEffect, useRef, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import Apis, { endpoints } from "../configs/Apis"
import cookie from "react-cookies"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { LoginUser } from "../ActionCreators/UserCreator"
import '../App.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleUp, faRightToBracket } from '@fortawesome/free-solid-svg-icons'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [goToTop, setGoToTop] = useState(false)
    const [errorLoginBlock, setErrorLoginBlock] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const passwordInput = useRef()
    const typeUserLogin = useSelector(state => state.typeUserLogin.type)

    const handleLogin = async (e) => {
        e.preventDefault()

        // if(typeUserLogin == 2) {
        //     console.log('Nhan vien dang nhap');
        // } else if (typeUserLogin == 3) {
        //     console.log('Khach hang dang nhap');
        // } else {
        //     console.log(None);
        // }

        try {
            let infoUser = await Apis.get(endpoints.oauth2Info)

            let res = await Apis.post(endpoints.login, {
                'username': username,
                'password': password,
                'client_id': infoUser.data.client_id,
                'client_secret': infoUser.data.client_secret,
                'grant_type': 'password'
            })

            cookie.save('access_token', res.data.access_token)

            let currentUser = await Apis.get(endpoints.currentUser, {
                headers: {
                    'Authorization': `Bearer ${cookie.load('access_token')}`
                }
            })
            console.log(currentUser.data);

            if(typeUserLogin == 3) {
                if(currentUser.data.role == 1) { //User is admin
                    setErrorLoginBlock(true)
                    setPassword('')
                    passwordInput.current.focus()
    
                    cookie.remove('access_token')
                } else if (currentUser.data.role == 2) { //User is staff
                    setErrorLoginBlock(true)
                    setPassword('')
                    passwordInput.current.focus()
    
                    cookie.remove('access_token')
                } else { //User is customer
                    setErrorLoginBlock(false)
                    cookie.save('user', currentUser.data)
                    dispatch(LoginUser(currentUser.data))
                    navigate('/')
                }
            } else if (typeUserLogin == 2) {
                if(currentUser.data.role == 1) { //User is admin
                    setErrorLoginBlock(true)
                    setPassword('')
                    passwordInput.current.focus()
    
                    cookie.remove('access_token')
                } else if (currentUser.data.role == 2) { //User is staff
                    setErrorLoginBlock(false)
                    cookie.save('user', currentUser.data)
                    dispatch(LoginUser(currentUser.data))
                    navigate('/staff')
                } else { //User is customer
                    setErrorLoginBlock(true)
                    setPassword('')
                    passwordInput.current.focus()
    
                    cookie.remove('access_token')
                }
            }
        } catch (err) {
            setErrorLoginBlock(true)
            setPassword('')
            passwordInput.current.focus()
        }
    }

    let welcomeUser = ''

    if(typeUserLogin == 2) {
        welcomeUser = ' Nhân Viên '
    } else if (typeUserLogin == 3) {
        welcomeUser = ' Khách Hàng '
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
        <div className="container__login">
            <div className="body__login">
                <h4 className="text-center text-primary">Chào Mừng {welcomeUser} Trở Lại Với </h4>
                <h4 className="text-center text-primary">AlexanderThinhTourist</h4>
                <p className={errorLoginBlock ? 'error_login' : 'error_login_hidden'}>Sai thông tin đăng nhập</p>
                <Form onSubmit={handleLogin} className='form__login'>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Nhập username..." 
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            ref={passwordInput}
                            type="password" 
                            placeholder="Nhập mật khẩu..."
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="danger" type="submit" style={{fontSize: '20px', marginTop: '16px'}}>
                        Đăng nhập
                        <FontAwesomeIcon icon={faRightToBracket} style={{margin: '0 10px'}}/>
                    </Button>
                </Form>
            </div>

            {goToTop && (
                <div onClick={handleScroll} className='btn_go_to_top'>
                    <FontAwesomeIcon icon={faAngleUp} />
                </div>
            )}
        </div>
    )
}

export default Login