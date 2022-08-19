import { SaveOutlined } from '@ant-design/icons';
import { Button, InputNumber, Form, Input, Typography, Divider } from 'antd';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getUserStorage } from '../helpers/getUserStorage';
import { useHideMenu } from '../hooks/useHideMenu';
import { Navigate } from "react-router-dom";

const {Title, Text} = Typography;

export const IngresarPage = () => {

    useHideMenu(false);
    const [user, setUser] = useState(getUserStorage());

    let navigate = useNavigate();

    const onFinish = ({agente, escritorio}) => {

        localStorage.setItem('agente', agente);
        localStorage.setItem('escritorio', escritorio);

        navigate("/escritorio");
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    if(user.agente && user.escritorio){
        return <Navigate to="/escritorio" />
    }

  return (

    <>
        <Title level={2}>Ingresar</Title>
        <Text>Ingrese su nombre y numero de escritorio</Text>
        <Divider />
        <Form
        name="basic"
        labelCol={{
            span: 8,
        }}
        wrapperCol={{
            span: 12,
        }}
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        >
        <Form.Item
            label="Nombre del agente"
            name="agente"
            rules={[
            {
                required: true,
                message: 'Por favor ingrese su nombre',
            },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Escritorio"
            name="escritorio"
            rules={[
            {
                required: true,
                message: 'Ingrese el numero dele escritorio',
            },
            ]}
        >
            <InputNumber min={1} max={99} />
        </Form.Item>

        <Form.Item
            wrapperCol={{
            offset: 8,
            span: 12,
            }}
        >
            <Button type="primary" htmlType="submit" shape='round'>
            <SaveOutlined />
            Ingresar
            </Button>
        </Form.Item>
        </Form>
    </>
    
  )
}
