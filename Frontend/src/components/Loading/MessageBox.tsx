
import { Alert, Container } from 'react-bootstrap'

const MessageBox = ({ variant = "info ", children } : {
    variant ?: string ,children : React.ReactNode
}) => {
    return (
        <Container className='my-4'>
            <Alert variant={variant || "danger" }>{children}</Alert>
        </Container>
    )
}

export default MessageBox