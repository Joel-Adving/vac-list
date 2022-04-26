import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { db } from '../firebase/config'

export default function Test() {
    // useEffect(() => {
    //     updateProfiles()
    // }, [])

    // const updateProfiles = async () => {
    //     const q = query(collection(db, 'steam-profiles'))
    //     const querySnapshot = await getDocs(q)
    //     querySnapshot.forEach(async doc => {
    //         await updateDoc(doc.ref, {
    //             added_by: {
    //                 email: '',
    //                 name: '',
    //                 photoURL: '',
    //                 uid: '',
    //             },
    //         })
    //     })
    // }

    return <div className="grid min-h-screen -mt-32 place-items-center"></div>
}
