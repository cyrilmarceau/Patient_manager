import React, {useState, useEffect} from 'react'

import { useRouter } from 'next/router'

import { Row, Col, Button, Form } from 'antd'

import _ from 'lodash'

import FormBuilder from '~/components/formBuilder/main'
import Header from '~/components/layout/Header'

import api from '~/libs/api'

import fields from '~/fields/users/edit.json'

const User = () => {

    const router = useRouter()
    const [form] = Form.useForm()
    const formRef = React.createRef()

    const [state, setState] = useState({
        user: null,
        initialValues: null
    })

    useEffect(() => {
        fetchUser()
    }, [router.query.id])

    useEffect(() => {
        // Set default value to input
        if(!_.isNil(state.user)) {
            form.setFieldsValue(state.initialValues)
        }
    }, [state.initialValues])


    const fetchUser = async () => {
        try {
            let user = await api.getUser(router.query.id)
            setState({
                ...state,
                user: user,
                initialValues: _.omit(user, ['id','created_at', 'updated_at'])
            })
        } catch (e) {
            console.log(e)
        }
    }

    const editUser = (changedValues, allValues) => {
        console.log(changedValues, allValues)
        api.editUser(state.user.id, changedValues)
    }

    return state.user && (
        <>
            <Header title={`${state.user.lastname} ${state.user.firstname}`} backPath={'/users'} />
            <div className="pm-container">
                <Form
                    form={form}
                    ref={formRef}
                    onFinish={editUser}
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
                        <div className="aside-col__created_at">
                                <span className="aside-col__created_at__content-title"> Crée le :</span>
                                <span className="aside-col__created_at__content-date"> {api.convertDate(state.user.created_at)} </span>
                            </div>
                            <div className="aside-col__updated_at">
                                <span className="aside-col__updated_at__content-title"> Modifié le :</span>
                                <span className="aside-col__updated_at__content-date"> {api.convertDate(state.user.updated_at)} </span>
                            </div>
                            <Form.Item>
                                <Button htmlType="submit" type="secondary">
                                    Editer cette utilisateur
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    )
}

export default User
