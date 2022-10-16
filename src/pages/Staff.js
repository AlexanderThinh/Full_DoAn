import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"


function Staff() {
    const user = useSelector(state => state.user.user)
    const nameStaff = user.last_name + ' ' + user.first_name

    return (
        <>
            <Container>
                <h2 style={{marginTop: '100px'}}>Xin chào nhân viên {nameStaff}</h2>
            </Container>
        </>
    )
}

export default Staff