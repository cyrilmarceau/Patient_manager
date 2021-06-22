import DefaultLayout from '~/components/layout/DefaultLayout'

import '../styles/main.scss'

const MyApp = ({ Component, pageProps }) => {
    return (
        <DefaultLayout>
            <Component {...pageProps} />
        </DefaultLayout>
    )
}

export default MyApp
