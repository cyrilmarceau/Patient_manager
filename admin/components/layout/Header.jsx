import React, { useState, useEffect } from 'react'

import { useRouter } from 'next/router'

import { Row, Col, Button } from 'antd'

import _ from 'lodash'

import { ArrowLeftOutlined, PlusCircleOutlined } from '@ant-design/icons'

const Header = ({ title, backPath, pathCreate, buttonText }) => {
    const router = useRouter()

    const [state, setState] = useState({
        displayActionBtn: true,
    })

    const pathNotDisplayBtn = ['/users/[id]', '/users/create']

    useEffect(() => {
        // Check if button is display
        if (_.indexOf(pathNotDisplayBtn, router.pathname) !== -1) {
            setState({ ...state, displayActionBtn: false })
        }
    }, [router.pathname])

    return (
        <Row>
            <Col span={24} className="title-page">
                <div className="title-page__container">
                    <Button
                        type="secondary"
                        icon={<ArrowLeftOutlined />}
                        shape="circle"
                        size="large"
                        onClick={() => {
                            router.push({ pathname: backPath })
                        }}
                        className="title-page__container__back-btn"
                    />
                    <h1>{title}</h1>
                </div>
                {state.displayActionBtn && (
                    <Button
                        type="secondary"
                        icon={<PlusCircleOutlined />}
                        shape="round"
                        size="large"
                        onClick={() => {
                            router.push({ pathname: pathCreate })
                        }}
                    >
                        {buttonText}
                    </Button>
                )}
            </Col>
        </Row>
    )
}

Header.defaultProps = {
    title: '',
    pathAll: '/',
    pathCreate: '/',
    buttonText: '',
}

export default Header
