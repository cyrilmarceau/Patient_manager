import React, { useState } from 'react'

import Link from 'next/link'

import { Layout, Menu } from 'antd'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    AppstoreOutlined,
    MessageOutlined,
    DashboardOutlined,
    CalendarOutlined,
    PaperClipOutlined,
    HeartOutlined,
} from '@ant-design/icons'

const { Sider, Content } = Layout

const SiderMenu = ({ content }) => {
    const [collapsed, setCollapsed] = useState(false)

    const menu = [
        {
            key: 'home',
            icon: <DashboardOutlined />,
            link: '/',
            name: 'Tableau de bord',
        },
        {
            key: 'users',
            icon: <UserOutlined />,
            link: '/users',
            name: 'Patients',
        },
        {
            key: 'care',
            icon: <HeartOutlined />,
            link: '/cares',
            name: 'Soins',
        },
        {
            key: 'treatment',
            icon: <AppstoreOutlined />,
            link: '/treatment',
            name: 'Traitements',
        },
        {
            key: 'visits',
            icon: <CalendarOutlined />,
            link: '/visits',
            name: 'Visites',
        },

        {
            key: 'messages',
            icon: <MessageOutlined />,
            link: '/messages',
            name: 'Mes messages',
        },
        {
            key: 'billings',
            icon: <PaperClipOutlined />,
            link: '/bills',
            name: 'Facturations',
        },
    ]

    const toggle = () => {
        setCollapsed(!collapsed)
    }

    return (
        <>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                {/* <div className="logo" /> */}
                <div className="trigger__btn">
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: toggle,
                    })}
                </div>

                <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']}>
                    {menu.map((menu) => {
                        return (
                            <Menu.Item key={menu.key} icon={menu.icon}>
                                <Link href={menu.link}>
                                    <a>{menu.name}</a>
                                </Link>
                            </Menu.Item>
                        )
                    })}
                </Menu>
            </Sider>

            <Layout className="site-layout">
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: '450px',
                    }}
                >
                    {content}
                </Content>
            </Layout>
        </>
    )
}

export default SiderMenu
