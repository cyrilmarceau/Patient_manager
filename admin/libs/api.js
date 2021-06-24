import axios from 'axios'

import { message } from 'antd'

import _ from 'lodash'

const PUBLIC_ROUTE_PRE = '/api'

const that = {
    getAxiosInstence() {
        let reqHeaders = {}

        return axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_FULL_URL,
            headers: reqHeaders,
            // timeout: 1000,
        })
    },

    listRoute(url, extraParams = {}) {
        let api = that.getAxiosInstence()

        return new Promise((resolve, reject) => {
            api.get(url, { params: extraParams })
                .then((apiResp) => {
                    let res = apiResp.data
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    showRoute(url, extraParams = {}) {
        let api = that.getAxiosInstence()

        return new Promise((resolve, reject) => {
            api.get(url, { params: extraParams })
                .then((apiResp) => {
                    let res = apiResp.data

                    resolve(res)
                })
                .catch((err) => {
                    if (
                        !_.isNil(err.response) &&
                        !_.isNil(err.response.status) &&
                        err.response.status != 404
                    ) {
                        message.error('Une erreur est survenue.')
                    }

                    reject(err)
                })
        })
    },
    createRoute(url, values) {
        let api = that.getAxiosInstence()

        return new Promise((resolve, reject) => {
            api.post(url, values)
                .then((apiResp) => {
                    let res = apiResp
                    resolve(res)
                })
                .catch((err) => {
                    message.error('Création impossible.')
                    reject(err)
                })
        })
    },
    updateRoute(url, values) {
        let api = that.getAxiosInstence()

        return new Promise((resolve, reject) => {
            api.patch(url, values)
                .then((apiResp) => {
                    let res = apiResp.data

                    resolve(res)
                })
                .catch((err) => {
                    message.error('Enregistrement impossible.')
                    reject(err)
                })
        })
    },
    deleteRoute(url, extraParams = {}, extraData = {}) {
        let api = that.getAxiosInstence()

        return new Promise((resolve, reject) => {
            api.delete(url, { params: extraParams, data: extraData })
                .then((apiResp) => {
                    resolve(apiResp)
                })
                .catch((err) => {
                    message.error('Suppression impossible.')
                    reject(err)
                })
        })
    },

    getUsers(params = {}) {
        return that.showRoute(`${PUBLIC_ROUTE_PRE}/users/`, params)
    },
    getUser(id) {
        return that.listRoute(`${PUBLIC_ROUTE_PRE}/users/${id}/`)
    },
    createUser(values = {}) {
        return that.createRoute(`${PUBLIC_ROUTE_PRE}/users/`, values)
    },
    editUser(id, values = {}) {
        return that.updateRoute(`${PUBLIC_ROUTE_PRE}/users/${id}/`, values)
    },
    deleteUser(id) {
        return that.deleteRoute(`${PUBLIC_ROUTE_PRE}/users/${id}`)
    },

    convertDate(date, splitVal = '' || null, totalDate = false) {
        let res = new Date(date).toLocaleString()
        totalDate === false && splitVal !== null
            ? (res = res.split(splitVal)[0])
            : (res = res.replace(',', ' -'))
        return res
    },

    query: {
        search(params, fieldName = '', value = '' || []) {
            if (!_.isEmpty(value)) {
                params[fieldName] = value
            }

            return params
        },
        ordering(params, sorter) {
            if (!_.isEmpty(sorter.order)) {
                let sortVal = sorter.field

                if (sorter.order == 'descend') {
                    sortVal = '-' + sortVal
                }

                params.ordering = sortVal
            }

            return params
        },
    },
}

export default that
