import React from 'react'

import SiderMenu from '~/components/layout/SiderMenu'

import { Layout } from 'antd'

const DefaultLayout = ({ children }) => {
    return (
        <>
            <Layout>
                <SiderMenu content={children} />
            </Layout>
        </>
    )
}

export default DefaultLayout
