import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
  import { Layout, Menu } from 'antd';
import { ColaPage } from './ColaPage';
import { CrearTicketPage } from './CrearTicketPage';
import { EscritorioPage } from './EscritorioPage';
import { IngresarPage } from './IngresarPage';
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { UIContext } from '../context/UIContext';
import { useLocation } from 'react-router-dom';

const { Sider, Content } = Layout;

export const RouterPage = () => {

    const {ocultarMenu} = useContext(UIContext);

    const location = useLocation();
    const [locat, setLocat] = useState('');

    useEffect(() => {
      if(location.pathname === '/ingresar' || location.pathname === '/escritorio'){
        setLocat('1');
      }else if(location.pathname === '/cola'){
        setLocat('2');
      }else if(location.pathname === '/crear'){
        setLocat('3');
      }
    }, [location])
    

    return (
        <>
            <Layout style={{height: '100vh'}}>
                <Sider hidden={ocultarMenu} collapsedWidth="0" breakpoint='md'>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    selectedKeys={[locat]}
                    items={[
                    {
                        key: '1',
                        icon: <UserOutlined />,
                        label: (<Link to="/ingresar">Escritorio</Link>),
                    },
                    {
                        key: '2',
                        icon: <VideoCameraOutlined />,
                        label: (<Link to="/cola">Cola de tickets</Link>),
                    },
                    {
                        key: '3',
                        icon: <UploadOutlined />,
                        label: (<Link to="/crear">Crear tickets</Link>),
                    },
                    ]}
                />
                </Sider>
                <Layout className="site-layout">
                <Content
                    className="site-layout-background"
                    style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    }}
                >
                    <div className="">
                        <Routes>

                            <Route path="ingresar" element={<IngresarPage />} />

                            <Route path="cola" element={<ColaPage />} />

                            <Route path="crear" element={<CrearTicketPage />} />

                            <Route path="escritorio" element={<EscritorioPage />} />

                            <Route path="/*" element={<Navigate to="/ingresar" />} />
                        </Routes>
                    </div>
                </Content>
                </Layout>
            </Layout>
        </>
    );

}
