import TopNav from '../components/layout/TopNav'
import { getSession } from 'next-auth/react'

export default function Home() {
    return (
        <div>
            <TopNav />
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)

    return {
        props: {
            session,
        },
    }
}
