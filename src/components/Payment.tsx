import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';


interface CreditButtonProps {
    apiKey?: string;
    apiSecret?: string;
    userId?: string;
    token?: string;
    entityId?: string;
    description?: string [];

}



const Payment: FC<CreditButtonProps> = ({apiKey, apiSecret, userId, token, entityId, description }) => {
    const [tiers, setTears] = useState<any[]>([])
    const [desc, setDesc] = useState <string[]> (description || [])


    useEffect(() => {
        if (entityId) {
            const headers = {
                apiKey: apiKey,
                apisecret: apiSecret,
                userId: userId,
                token: token, // Replace with your actual token
            };
            const request = `https://staging.questprotocol.xyz/api/entities/${entityId}/credits-tiers?userId=${userId}`;
            axios.get(request, { headers: headers }).then((res) => {
                let response = res.data;
                if (response.success) {
                    setTears([...response.data])
                }
            });
        }
    }, []);


    return (
        <div className='w-screen flex justify-between px-14 py-10 gap-12'>
            {
                tiers.map((tier, index) => (
                    <div className='w-full shadow-lg p-12 shadow-gray-400 rounded-md'>
                        <p className='text-4xl text-center font-bold'>{tier.creditsTierName.toLowerCase().includes(" plan") ? tier.creditsTierName : tier.creditsTierName + " Plan"}</p>
                        <p className='text-center text-2xl'>{desc[index]}</p>
                        <div className='flex items-end gap-2'>
                            <p className='text-5xl font-bold'>${tier.creditsAmount}</p>
                            <p className='text-xl text-gray-600'>
                                {
                                    tier.recurringTimePeriod == "ONETIME" ?
                                    "/one-time"
                                    :
                                    tier.recurringTimePeriod == "MONTHLY" ?
                                    "/months"
                                    :
                                    "/years"
                                }
                            </p>
                        </div>
                        <button className='text-black border-2 border-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg w-full py-2 mt-7'>Continue</button>
                        <div className='border-b-2 my-6 border-dashed border-black'></div>
                        <p className='text-center text-base text-gray-500'>FEATURES</p>

                    </div>
                ))
            }
        </div>
    )
}


export default Payment;