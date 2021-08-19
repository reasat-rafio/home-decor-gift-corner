import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

export const FilterSideMenu: React.FC<{
    category: category[]
    setSelectAvailability: Dispatch<SetStateAction<string>>
    selectedAvailability: string
}> = ({ category, setSelectAvailability, selectedAvailability }) => {
    const availability = ['In Stock', 'Pre Order', 'Up Coming']
    const [queryName, setQueryName] = useState<string | string[] | undefined>('')

    const router = useRouter()

    useEffect(() => {
        if (Object.keys(router.query).length !== 0) {
            const queryParams = router.query.category
            setQueryName(queryParams)
        }
    }, [queryName, router.query.category])

    return (
        <>
            <div>
                <h6 className="text-center font-semibold lg:text-[24px] text-lg mb-5">
                    CATEGORIES
                </h6>
                <ul className="p-3 bg-white rounded-xl flex flex-col justify-center items-center space-y-1">
                    {category?.map((cat: category, index: number) => (
                        <li
                            key={index}
                            className={clsx(
                                'hover:text-yellow transition-colors duration-150',
                                cat.slug.current == queryName ? 'text-yellow' : 'text-black',
                            )}
                        >
                            <Link href={`/category/${cat.slug.current}`}>
                                <a>{cat.title}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h6 className="text-center font-semibold lg:text-[24px] text-lg my-5">
                    Availability
                </h6>
                <ul className="p-3 bg-white rounded-xl flex flex-col justify-center items-center space-y-1">
                    {availability.map((avg, index) => (
                        <li key={index} className=" w-1/2 xl:w-[60%] 2xl:w-1/2">
                            <label className="inline-flex items-center">
                                <input
                                    onClick={() => setSelectAvailability(avg)}
                                    type="radio"
                                    className="form-radio h-4 w-4 text-yellow"
                                    name="accountType"
                                    value="personal"
                                    checked={selectedAvailability === avg ? true : false}
                                />
                                <span className="ml-2 text-gray-700 text-sm">{avg}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
