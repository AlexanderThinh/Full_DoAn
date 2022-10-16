import { useEffect, useRef, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Apis, { endpoints } from "../configs/Apis"
import '../App.css'
import { faAngleUp, faL } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function Register() {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [birthday, setBirthday] = useState('')
    const [phone, setPhone] = useState('')
    const [errorEmailInput, setErrorEmailInput] = useState(null)
    const [goToTop, setGoToTop] = useState(false)
    const avatar = useRef()
    const emailInputRef = useRef()
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()
        
        let registerUser = async () => {
            const formData = new FormData()
            formData.append('first_name', firstname)
            formData.append('last_name', lastname)
            formData.append('email', email)
            formData.append('username', username)
            formData.append('password', password)
            formData.append('avatar', avatar.current.files[0])
            formData.append('so_dien_thoai', phone)
            formData.append('ngay_sinh', birthday)

            try {
                let res = await Apis.post(endpoints.register, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                alert('Đăng ký thành công!')
                navigate('/login')
            } catch (err) {
                console.error(err);
            }
        }
        if(password != null && password === confirmPassword) {
            registerUser()
        }
    }

    const handleBlurEmailForm = (value) => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(value)) {
            setErrorEmailInput('Vui lòng nhập đúng định dạng email')
            emailInputRef.current.focus()
        } else {
            setErrorEmailInput(null)
        }
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
        <div className="container__login">
            <div className="body__register">
                <h4 className="text-center text-primary">Chào Mừng Quý Khách Đến Với </h4>
                <h4 className="text-center text-primary">AlexanderThinhTourist</h4>

                <Form onSubmit={handleRegister}>
                    <RegisterForm 
                        id='firstname' 
                        label='Firstname' 
                        type='text'
                        value={firstname}
                        change={e => setFirstname(e.target.value)}
                    />
                    <RegisterForm 
                        id='lastname' 
                        label='Lastname' 
                        type='text'
                        value={lastname}
                        change={e => setLastname(e.target.value)}
                    />
                    <Form.Group className="mb-3" controlId='email' >
                        <Form.Label>Email</Form.Label>
                        <span style={{color: 'red', margin: '0 10px'}}>{errorEmailInput}</span>
                        <Form.Control 
                            ref={emailInputRef}
                            type='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onBlur={(e) => handleBlurEmailForm(e.target.value)}
                        />
                    </Form.Group>

                    <RegisterForm 
                        id='username' 
                        label='Username' 
                        type='text'
                        value={username}
                        change={e => setUsername(e.target.value)}
                    />
                    <RegisterForm 
                        id='password' 
                        label='Password' 
                        type='password'
                        value={password}
                        change={e => setPassword(e.target.value)}
                    />
                    <RegisterForm 
                        id='confirm' 
                        label='Confirm Password' 
                        type='password'
                        value={confirmPassword}
                        change={e => setConfirmPassword(e.target.value)}
                    />
                    <RegisterForm 
                        id='birthday' 
                        label='Ngày sinh' 
                        type='date'
                        value={birthday}
                        change={e => setBirthday(e.target.value)}
                    />
                    <Form.Group className="mb-3" controlId="avatar">
                        <Form.Label>Avatar</Form.Label>
                        <Form.Control 
                            type="file" 
                            ref={avatar}
                            className='form-control'
                        />
                    </Form.Group>
                    <RegisterForm 
                        id='phone' 
                        label='Số điện thoại' 
                        type='text'
                        value={phone}
                        change={e => setPhone(e.target.value)}
                    />

                    <div style={{margin: '30px 0 18px 0'}}>
                        <input 
                            type="checkbox"
                            style={{transform: 'scale(1.5)', margin: '0 10px'}}
                            // checked={checked}
                            // onChange={handleChange}
                        />
                        <span>Tôi đã đọc và đồng ý các điều khoản</span>
                    </div>
                    
                    <Button variant="danger" type="submit" style={{fontSize: '20px', marginTop: '16px', width: '100%'}}>
                        Đăng ký
                    </Button>
                </Form>

            </div>
            <Container style={{padding: '0 40px'}}>
                <h4 className="text-center text-primary" style={{margin: '30px 0'}}>ĐIỀU KHOẢN ĐĂNG KÝ HỘI VIÊN </h4>
                <p>- Hội viên đăng ký chương trình cung cấp đúng các thông tin về số điện thoại, địa chỉ liên hệ, địa chỉ email của Hội viên. Khi có thay đổi, Hội viên có thể tự cập nhật vào tài khoản tại AlexanderThinhTourist.com hoặc liên hệ thông báo trực tiếp với nhân viên</p>
                <p>- Hội viên tham gia chương trình được cộng điểm Vàng và điểm Thưởng sau khi sử dụng dịch vụ tại AlexanderThinhTourist theo hệ số cộng điểm và theo các quy định về điểm thưởng khác được công bố tại từng thời điểm.</p>
                <p>- AlexanderThinhTourist có quyền thay đổi các điều kiện và điều khoản của chương trình Khách hàng thân thiết bất kỳ thời điểm nào có (hoặc không) báo trước và sẽ công bố chính thức trên AlexanderThinhTourist.com.</p>
                <p>- AlexanderThinhTourist có quyền sửa đổi cách thức của chương trình hoặc những quyền lợi có được từ chương trình tại bất kỳ thời điểm nào, có (hoặc không) báo trước và sẽ công bố chính thức trên AlexanderThinhTourist.com.</p>
                <p>- AlexanderThinhTourist được miễn trừ chịu trách nhiệm nếu Hội viên không nhận được các ưu đãi và lợi ích từ chương trình do số điện thoại, email Hội viên có thay đổi mà không cập nhật vào hồ sơ hội viên hoặc do gửi ấn phẩm, thư tín qua đường bưu điện đến Hội viên bị thất lạc.</p>
                <p>- Mọi khiếu nại, yêu cầu bồi thường của Hội viên liên quan đến chương trình sẽ do AlexanderThinhTourist giải quyết. Sự giải quyết của AlexanderThinhTourist có giá trị áp dụng sau cùng.</p>
            </Container>

            {goToTop && (
                <div onClick={handleScroll} className='btn_go_to_top'>
                    <FontAwesomeIcon icon={faAngleUp} />
                </div>
            )}
        </div>
    )
}

function RegisterForm(props) {
    return (
        <Form.Group className="mb-3" controlId={props.id}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control 
                type={props.type}
                value={props.value}
                onChange={props.change}
                onBlur={props.blur}
            />
        </Form.Group>
    )
}

export default Register