import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { CONFIRM_ORDER, selectProduct } from '../../store/product'
import Button from '../common/Button'
import { CheckBox } from '../common/Checkbox'
import Input from '../common/Input'
import TextArea from '../common/Textarea'
import axios from 'axios'
import router from 'next/router'
import { LOADING_END, LOADING_START } from '../../store/dom'

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
        reset,
        formState: { errors },
    } = useForm<CheckoutInputType>()

    const { inCartProducts } = useAppSelector(selectProduct)
    const dispatch = useAppDispatch()
    // items subtotal
    const [subTotal, setSubTotal] = useState<number>(0)
    //  doing the sum of the items price
    useEffect(() => {
        if (inCartProducts?.length) {
            const _subtotal = inCartProducts.reduce(
                (result: number, { price, quantity }) => result + price * quantity,
                0,
            )
            setSubTotal(_subtotal)
        } else {
            setSubTotal(0)
        }
    }, [inCartProducts])

    async function onSubmit({
        firstName,
        lastName,
        address,
        city,
        email,
        note,
        phone,
        zipCode,
    }: CheckoutInputType) {
        try {
            dispatch(LOADING_START())
            const res = await fetch('/api/place-order', {
                method: 'POST',
                body: JSON.stringify({
                    name: `${firstName} ${lastName}`,
                    email: email,
                    phone: phone,
                    tracking: 'Recived',
                    address: address,
                    note: note,
                    zipcode: zipCode,
                    total: subTotal + 60,
                    orderPlacedAt: `Order Placed At: ${new Date().toLocaleString()} `,
                    orderedProducts: inCartProducts.map((item) => {
                        const _product = { id: item._id, qty: item.quantity }
                        return _product
                    }),
                }),
            })
            const data = await res.json()
            dispatch(LOADING_END())
            dispatch(CONFIRM_ORDER())
            reset()
            router.push(`/order?id=${data.result._id}`)
        } catch (err) {
            console.log(err)
        }
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
                        <Button
                            disabled={inCartProducts.length === 0 ? true : false}
                            className="w-full sm:w-auto"
                        >
                            Place Order
                        </Button>
                    </div>
                </div>
            </form>
        </>
    )
}
