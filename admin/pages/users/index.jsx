import React, { useState, useEffect, useContext } from 'react'

import { useRouter } from 'next/router'

import { Row, Col, Modal, Table, Form, Button, message } from 'antd'

import { EyeOutlined, DeleteOutlined } from '@ant-design/icons'

import _ from 'lodash'

import fields from '~/fields/users/filter.json'

import FormBuilder from '~/components/formBuilder/main'

import Header from '~/components/layout/Header'

import api from '~/libs/api'
import Message from '~/components/utils/Message'

const Users = () => {
    const [state, setState] = useState({
        table: {
            dataSource: null,
            filters: {
                firstname: '',
                lastname: '',
                email: '',
                city: '',
                zipcode: '',
            },
            sorter: {},
            pagination: {
                position: ['none', 'bottomRight'],
                current: 1,
                pageSize: 20,
                total: 0,
            },
        },
        success: null,
    })

    const router = useRouter()

    const [form] = Form.useForm()

    const formRef = React.createRef()

    // Table
    const columns = [
        {
            title: 'Nom',
            dataIndex: 'lastname',
            sorter: true,
        },
        {
            title: 'Prénom',
            dataIndex: 'firstname',
            sorter: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Ville',
            dataIndex: 'city',
        },
        {
            title: 'Adresse',
            dataIndex: 'address',
        },
        {
            title: 'Code postal',
            dataIndex: 'zipcode',
        },
        {
            title: 'Téléphone',
            dataIndex: 'phone',
        },
        {
            title: 'Crée le',
            dataIndex: 'created_at',
            render: (text, record) => (
                <>
                    <div className="bill_date">
                        <span>{api.convertDate(record.created_at, ',')}</span>
                    </div>
                </>
            ),
        },
        {
            title: '',
            dataIndex: '',
            className: 'actions',
            key: 'edit',
            render: (user) => (
                <div className="lists-user__icon">
                    <Button
                        type="primary"
                        className="ant-icon-edit"
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => router.push({
                            pathname: '/users/[id]',
                            query: {id: user.id}
                        })}
                    />
                    <Button
                        type="secondary"
                        className="ant-icon-delete"
                        icon={<DeleteOutlined />}
                        size="small"
                        onClick={() => confirmDelete(user)}
                    />
                </div>
            ),
        },
    ]

    useEffect(() => {
        fetchUsers()
        return () => {}
    }, [state.table.pagination, state.table.sorter, state.table.filters])

    const fetchUsers = async () => {
        try {
            let params = {}
            params = api.query.search(params, 'lastname', state.table.filters.lastname)
            params = api.query.search(params, 'firstname', state.table.filters.firstname)
            params = api.query.search(params, 'email', state.table.filters.email)
            params = api.query.search(params, 'city', state.table.filters.city)
            params = api.query.search(params, 'zipcode', state.table.filters.zipcode)
            params = api.query.ordering(params, state.table.sorter)
            // params = api.query.pagination(params, state.table.pagination)

            let users = await api.getUsers(params)
            setState({
                ...state,
                table: {
                    ...state.table,
                    dataSource: users,
                    // pagination: {
                    //     ...state.table.pagination,
                    //     total: users.count,
                    // },
                },
            })
        } catch (e) {
            console.log(e)
        }
    }

    const handleChange = (pagination, filters, sorter, extra) => {
        setState({
            ...state,
            table: {
                ...state.table,
                sorter: sorter,
                pagination: pagination,
            },
        })
    }

    const filtersUsers = (changedValues, allValues) => {
        setState({
            ...state,
            table: {
                ...state.table,
                filters: {
                    ...state.table.filters,
                    ...allValues,
                },
            },
        })
    }

    const confirmDelete = (user) => {
        Modal.confirm({
            content: `Vous vous appreter à supprimer ${user.lastname} ${user.firstname}. Confirmer la suppression ?`,
            onOk() {
                api.deleteUser(user.id).then((res) => {
                    if (res.status === 204) {
                        setState({ ...state, success: true })
                    }
                    fetchUsers()
                })
            },
            cancelText: 'Retour',
            okText: 'Oui',
            okType: 'secondary',
        })
    }

    return (
        <>
            {state.success === true ? <Message type="success" msg={"L'utilisateur a bien été supprimé"} timing={2} /> : null}
            <Header
                title={'Liste des patients'}
                backPath={'/users'}
                pathCreate={'/users/create'}
                buttonText={'Ajouter un utilisateur'}
            />
            <div className="pm-container">
                <Row>
                    <Col span={24}>
                        <Form
                            form={form}
                            ref={formRef}
                            onValuesChange={filtersUsers}
                            className="pm-form-list-user"
                        >
                            <FormBuilder fieldsList={fields} className="lists-user__fields" />
                        </Form>
                    </Col>
                    <Col span={24} className="pm-table-list-users">
                        <Table
                            rowKey="id"
                            pagination={state.table.pagination}
                            onChange={handleChange}
                            dataSource={state.table.dataSource}
                            columns={columns}
                        />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Users
