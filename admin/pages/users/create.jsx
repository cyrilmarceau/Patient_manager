import React, { useState, useEffect } from 'react'

import { useRouter } from 'next/router'

import { Row, Col, Form, Button } from 'antd'

import { ArrowLeftOutlined } from '@ant-design/icons'

import fields from '~/fields/users/create.json'

import FormBuilder from '~/components/formBuilder/main'

import api from '~/libs/api'

const create = () => {
    const [form] = Form.useForm()
    const formRef = React.createRef()

    const router = useRouter()

    const [state, setState] = useState({})

    const createUser = (values) => {
        console.log(values)
        api.createUser(values)
    }

    const createUserChange = (changedValues, allValues) => {
        console.log(changedValues, allValues)
        setState({ ...state, allValues })
    }

    return (
        <Form
            form={form}
            ref={formRef}
            onFinish={createUser}
            onValuesChange={createUserChange}
            className="pm-form-create-user"
        >
            <Row>
                <Col span={24} className="title-page">
                    <Button
                        type="secondary"
                        icon={<ArrowLeftOutlined />}
                        shape="circle"
                        size="large"
                        onClick={() => {
                            router.push({ pathname: '/users' })
                        }}
                        className="title-page__back-btn"
                    />
                    <h1>Crée un patient</h1>
                </Col>

                <div className="pm-container">
                    <Col xs={24} md={20} lg={16}>
                        <FormBuilder fieldsList={fields} className="create-user padding-right" />
                    </Col>
                    <Col lg={8} className="aside-col">
                        <Form.Item>
                            <Button htmlType="submit" type="secondary">
                                Crée un utilisateur
                            </Button>
                        </Form.Item>
                    </Col>
                </div>
            </Row>
        </Form>
    )
}

export default create
