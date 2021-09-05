import React from 'react'
import { useForm } from 'react-hook-form'
import { SanityImg } from 'sanity-react-extra'
import { NewsletterProps } from '../../../libs/types/landingTypes'
import { imageUrlBuilder } from '../../../utils/sanity'
import { LOADING_END, LOADING_START } from '../../store/dom'
import { useAppDispatch } from '../../store/hooks'

export const Newsletter: React.FC<NewsletterProps> = ({ headline, description, icon }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<{ email: string }>()

    const dispatch = useAppDispatch()

    const onSubmit = async ({ email }: { email: string }) => {
        try {
            dispatch(LOADING_START())
            const res = await fetch('/api/subscribe', {
                body: JSON.stringify({
                    email,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            })

            const result = await res.json()
            reset({})
            dispatch(LOADING_END())
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className="w-full bg-yellow mt-20">
            <div className="relative rounded-lg">
                <div className="ax-w-screen-xl mx-auto py-20 lg:py-24">
                    <div className="flex items-center justify-center flex-col lg:flex-row px-8">
                        <div className="flex items-center flex-col sm:flex-row">
                            <SanityImg
                                builder={imageUrlBuilder}
                                image={icon}
                                width={60}
                                alt="newslatter icon"
                            />
                            <div className="sm:ml-6 mt-6 sm:mt-0`">
                                <h2 className="text-gray-100 sm:text-left leading-none text-4xl sm:text-5xl font-black tracking-wide text-center">
                                    {headline}
                                </h2>
                                <p className="text-gray-500 font-medium text-sm max-w-sm mt-2 sm:mt-1 text-center sm:text-left">
                                    {description}
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 lg:mt-0 lg:ml-16 w-full sm:w-auto">
                            <form
                                className="text-sm max-w-sm sm:max-w-none mx-auto"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <input
                                    type="email"
                                    {...register('email', { required: 'email is required' })}
                                    className="w-full sm:w-auto block sm:inline-block px-6 py-4 rounded text-ac tracking-wider font-bold   focus:outline-none sm:rounded-r-none  transition duration-300 text-gray-700 bg-white  focus:ring-2"
                                />

                                <button
                                    type="submit"
                                    className="w-full sm:w-auto mt-6 sm:mt-0 sm:rounded-l-none py-4 bg-[#212122] hover px-8  font-bold rounded text-gray-300  transition duration-300 "
                                >
                                    Subscribe Now
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
