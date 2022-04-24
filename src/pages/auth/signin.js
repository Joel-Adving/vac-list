import { getProviders, signIn, getSession } from 'next-auth/react'
import Image from 'next/image'

export default function SignIn({ providers }) {
    return (
        <div className="grid min-h-screen -mt-32 place-items-center">
            <div className="grid w-full max-w-xs py-10 border-[1.5px] rounded border-background-light place-items-center">
                {Object.values(providers).map(provider => (
                    <div key={provider.name}>
                        <button
                            className="flex items-center p-3 px-5 bg-white rounded-sm shadow-sm hover:bg-gray-200"
                            onClick={() => signIn(provider.id)}
                        >
                            <div className="mr-2 w-7 h-7">
                                <Image src="/google.png" height="100%" width="100%" alt="" />
                            </div>
                            Sign in with {provider.name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { req, res } = context
    const providers = await getProviders()

    const session = await getSession({ req })

    if (session && res) {
        res.statusCode = 302
        res.setHeader('Location', '/')
        return {
            props: {
                session,
                providers,
            },
        }
    }
    return {
        props: { providers },
    }
}
