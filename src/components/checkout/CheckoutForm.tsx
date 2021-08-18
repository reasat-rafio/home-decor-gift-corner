import React from 'react'
import { useForm } from 'react-hook-form'
import Button from '../common/Button'
import { CheckBox } from '../common/Checkbox'
import Input from '../common/Input'
import TextArea from '../common/Textarea'

interface CheckoutFormProps {}

interface CheckoutInputType {
    firstName: string
    lastName: string
    phone: string
    email: string
    address: string
    city: string
    zipCode: string
    save: boolean
    note: string
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CheckoutInputType>()

    function onSubmit(input: CheckoutInputType) {
        console.log(input)
    }

    return (
        <>
            <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
                Shipping Address
            </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full mx-auto flex flex-col justify-center "
                noValidate
            >
                <div className="flex flex-col space-y-4 lg:space-y-5">
                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
                        <Input
                            labelKey="First Name *"
                            {...register('firstName', {
                                required: 'name is required',
                            })}
                            errorKey={errors.firstName?.message}
                            variant="solid"
                            className="w-full lg:w-1/2 "
                        />
                        <Input
                            labelKey="Last Name *"
                            {...register('lastName', {
                                required: 'name is required',
                            })}
                            errorKey={errors.lastName?.message}
                            variant="solid"
                            className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
                        />
                    </div>
                    <Input
                        labelKey="Address *"
                        {...register('address', {
                            required: 'address is required',
                        })}
                        errorKey={errors.address?.message}
                        variant="solid"
                    />
                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
                        <Input
                            type="tel"
                            labelKey="Phone/Mobile *"
                            {...register('phone', {
                                required: 'phone number is required',
                            })}
                            errorKey={errors.phone?.message}
                            variant="solid"
                            className="w-full lg:w-1/2 "
                        />

                        <Input
                            type="email"
                            labelKey="Email *"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Email not valid',
                                },
                            })}
                            errorKey={errors.email?.message}
                            variant="solid"
                            className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
                        />
                    </div>
                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
                        <Input
                            labelKey="City/Town"
                            {...register('city')}
                            variant="solid"
                            className="w-full lg:w-1/2 "
                        />

                        <Input
                            labelKey="Postcode"
                            {...register('zipCode')}
                            variant="solid"
                            className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
                        />
                    </div>
                    <div className="relative flex items-center ">
                        <CheckBox labelKey="Save this information for next time" />
                    </div>
                    <TextArea
                        labelKey="Order Notes (Optional)"
                        {...register('note')}
                        placeholderKey="Notes about your order, e.g. speical notes for delivery"
                        className="relative pt-3 xl:pt-6"
                    />
                    <div className="flex w-full">
                        <Button className="w-full sm:w-auto">Place Order</Button>
                    </div>
                </div>
            </form>
        </>
    )
}
