import { ConfigProvider } from 'antd'

import locale from 'antd/lib/locale/fr_FR'

import DefaultLayout from '~/components/layout/DefaultLayout'

import '../styles/main.scss'

const MyApp = ({ Component, pageProps }) => {
    return (
        <ConfigProvider locale={locale}>
            <DefaultLayout>
                <Component {...pageProps} />
            </DefaultLayout>
        </ConfigProvider>
    )
}

export default MyApp
