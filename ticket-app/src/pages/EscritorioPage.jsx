import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons';
import { Row, Col, Typography, Button, Divider } from 'antd';
import { useContext, useState } from 'react';
import { getUserStorage } from '../helpers/getUserStorage';
import { useHideMenu } from '../hooks/useHideMenu';
import { Navigate, useNavigate } from "react-router-dom";
import { SocketContext } from '../context/SocketContext';

const {Title, Text} = Typography;

export const EscritorioPage = () => {

    useHideMenu(false);
    const [user, setUser] = useState(getUserStorage());
    const [myTicket, setMyTicket] = useState(null);
    const {nextTicket} = useContext(SocketContext);
    let navigate = useNavigate();

    const siguienteTicket = () => {
        nextTicket(user).then((newTicket) =>{
            setMyTicket(newTicket);
            //console.log(newTicket);
        })
    }

    const salir = () => {
        localStorage.removeItem('agente');
        localStorage.removeItem('escritorio');

        navigate("/ingresar", { replace: true });
    }

    if(!user.agente || !user.escritorio){
        return <Navigate to="/ingresar" />
    }

  return (
    <>
        <Row>
            <Col span={20}>
                <Title level={2}>{user.agente}</Title>
                <Text>Usted esta trabajando en el escritorio: </Text>
                <Text type='success'>{user.escritorio}</Text>
            </Col>
            <Col span={4} align='right'>
                <Button shape="round" type='danger' onClick={salir}>
                    <CloseCircleOutlined />
                    Salir
                </Button>
            </Col>
        </Row>
        <Divider />
        <Row>
            <Col offset={18} span={6} align="right">
                <Button onClick={siguienteTicket} shape="round" type="primary">
                    <RightOutlined />
                    Siguiente
                </Button>
            </Col>
        </Row>
        {
            myTicket ? (
                <Row>
                    <Col>
                        <Text>Esta atendiendo el ticket numero: </Text>
                        <Text style={{fontSize: 30}} type='danger'>{myTicket.number}</Text>
                    </Col>
                </Row>
            ) : (
                <Row>
                    <Col>
                        <Text>No hay tickets pendientes</Text>
                    </Col>
                </Row>
            )
        }
        
        
    </>
  )
}
