import { DownloadOutlined } from '@ant-design/icons';
import { Row, Col, Typography, Button } from 'antd';
import { useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import { useHideMenu } from '../hooks/useHideMenu';

const {Title, Text} = Typography;


export const CrearTicketPage = () => {

    useHideMenu(false);
    const {nuevoTicket} = useContext(SocketContext);
    const [ultimoTicket, setUltimoTicket] = useState(null);

    const crearTicket = () => {

        nuevoTicket().then((newTicket) =>{
            setUltimoTicket(newTicket);
            //console.log(newTicket);
        })
        
    }

  return (
    <>
        <Row>
            <Col span={14} offset={6} align="center">
                <Title level={3}>
                    Presione el boton para generar un nuevo ticket
                </Title>
                <Button type='primary' shape='round' icon={<DownloadOutlined />} size='large' onClick={crearTicket}>
                    Nuevo Ticket
                </Button>
            </Col>
        </Row>
        {
            ultimoTicket && (
                <Row style={{marginTop: 100}}>
                    <Col span={14} offset={6} align="center">
                        <Text level={2}>
                            Su numero
                        </Text>
                        <br />
                        <Text type='success' style={{fontSize: 55}}>
                            {ultimoTicket.number}
                        </Text>
                    </Col>
                </Row>
            )
        }
        
    </>
  )
}
