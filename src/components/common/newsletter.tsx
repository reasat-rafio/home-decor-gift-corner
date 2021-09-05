import React from 'react'
import { useForm } from 'react-hook-form'
import { LOADING_END, LOADING_START } from '../../store/dom'
import { useAppDispatch } from '../../store/hooks'
import Button from '../../ui/Button'
import Input from '../../ui/Input'
import Text from '../../ui/text'

export interface NewsletterProps {
    newsletter: {
        ctaButton: string
        description: string
        headline: string
    }
}

export const Newsletter: React.FC<NewsletterProps> = ({ newsletter }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<{ email: string }>()
    const dispatch = useAppDispatch()

    async function onSubmit({ email }: { email: string }) {
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
        <div
            className={`px-5 sm:px-8 md:px-16 2xl:px-24 flex flex-col xl:flex-row justify-center xl:justify-between items-center rounded-lg bg-gray-200 py-10 md:py-14 lg:py-16`}
        >
            <div className="-mt-1.5 lg:-mt-2 xl:-mt-0.5 text-center xl:text-left mb-7 md:mb-8 lg:mb-9 xl:mb-0">
                <Text variant="mediumHeading" className="mb-2 md:mb-2.5 lg:mb-3 xl:mb-3.5">
                    {newsletter.headline}
                </Text>
                <p className="text-body text-xs md:text-sm leading-6 md:leading-7">
                    {newsletter.description}
                </p>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex-shrink-0 w-full sm:w-96 md:w-[545px]"
                noValidate
            >
                <div className="flex flex-col sm:flex-row items-left justify-end">
                    <Input
                        placeholderKey="Enter Your Email"
                        type="email"
                        variant="solid"
                        className="w-full"
                        inputClassName="px-4 lg:px-7 h-12 lg:h-14 text-center sm:text-left bg-white"
                        {...register('email', {
                            required: 'forms:email-required',
                            pattern: {
                                value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'forms:email-error',
                            },
                        })}
                        errorKey={errors.email?.message}
                    />
                    <Button className="mt-3 sm:mt-0 w-full sm:w-auto sm:ms-2 md:h-full flex-shrink-0 !bg-yellow">
                        <span className="lg:py-0.5"> {newsletter.ctaButton}</span>
                    </Button>
                </div>
            </form>
        </div>
    )
}
