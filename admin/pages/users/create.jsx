import React, { useState } from 'react'

import { useRouter } from 'next/router'

import { Row, Col, Form, Button, message } from 'antd'

import fields from '~/fields/users/create.json'

import FormBuilder from '~/components/formBuilder/main'

import Header from '~/components/layout/Header'

import api from '~/libs/api'

const create = () => {
    const [form] = Form.useForm()
    const formRef = React.createRef()

    const router = useRouter()

    const [state, setState] = useState({
        success: null,
    })

    const createUser = (values) => {
        api.createUser(values).then((res) => {
            console.log(res)
            if (res.statusText === 'Created') {
                form.resetFields()
                setState({ ...state, success: true })
            } else {
                setState({ ...state, success: false })
            }
        })
    }

    const createUserChange = (changedValues, allValues) => {
        console.log(changedValues, allValues)
        setState({ ...state, allValues })
    }

    const success = () => {
        message
            .success("L'utilisateur a bien été crée", 2)
            .then(() => {
                setState({ ...state, success: null })
            })
            .then(() => {
                router.push('/users')
            })
    }

    return (
        <>
            {state.success && success()}
            <Header title={'Crée un patient'} backPath={'/users'} />
            <div className="pm-container">
                <Form
                    form={form}
                    ref={formRef}
                    onFinish={createUser}
                    onValuesChange={createUserChange}
                    className="pm-form-create-user"
                >
                    <Row style={{ height: '100%' }}>
                        <Col xs={24} md={20} lg={16} style={{ height: '100%' }}>
                            <FormBuilder
                                fieldsList={fields}
                                className="create-user padding-right"
                            />
                        </Col>
                        <Col lg={8} className="aside-col">
                            <Form.Item>
                                <Button htmlType="submit" type="secondary">
                                    Crée un utilisateur
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    )
}

export default create
