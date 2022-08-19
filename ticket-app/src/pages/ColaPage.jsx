import { Row, Col, Typography, Button, Divider, List, Card, Tag } from 'antd';
import { useContext, useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';
import { getUltimos } from '../helpers/getUltimos';
import { useHideMenu } from '../hooks/useHideMenu';

const {Title, Text} = Typography;

export const ColaPage = () => {

    useHideMenu(false);

    const {tickets, setTickets} = useContext(SocketContext);

    useEffect(() => {
      
        getUltimos().then(tickets => setTickets(tickets));
        
    }, [])
    

  return (
    <>
        <Title level={1}>Atendiendo al cliente</Title>
        <Row>
            <Col span={12}>
                <List
                    dataSource={tickets.slice(0,3)}
                    renderItem={item => (
                        <List.Item>
                            <Card style={{width: 300, marginTop: 16}} actions={[
                                <Tag color="volcano">{item.agente}</Tag>,
                                <Tag color="magenta">Escritorio: {item.escritorio}</Tag>,
                            ]}>
                                <Title>No. {item.number}</Title>
                            </Card>
                        </List.Item>
                    )} 
                />
            </Col>

            <Col span={12}>
                <Divider>Historial</Divider>
                <List 
                    dataSource={tickets.slice(3)}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta title={`Ticket No. ${item.number}`} description={
                                <>
                                    <Text type="secondary">En el escritorio: </Text>
                                    <Tag color="magenta">{item.number}</Tag>
                                    <Text type="secondary">Agente: </Text>
                                    <Tag color="volcano">{item.agente}</Tag>
                                </>
                            } />
                        </List.Item>
                    )}
                />
            </Col>
        </Row>
    </>
  )
}
