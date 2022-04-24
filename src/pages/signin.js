import Image from 'next/image'
import { useAuth } from '../hooks/useAuth'

export default function SignIn() {
    const { signin } = useAuth()
    return (
        <div className="grid min-h-screen -mt-32 place-items-center">
            <div className="grid w-full max-w-xs py-10 border-[1.5px] rounded border-background-light place-items-center">
                <button
                    onClick={() => signin()}
                    className="flex items-center p-3 px-5 bg-white rounded-sm shadow-sm hover:bg-gray-200"
                >
                    <div className="mr-2 w-7 h-7">
                        <Image src="/google.png" height="100%" width="100%" alt="" />
                    </div>
                </button>
            </div>
        </div>
    )
}
