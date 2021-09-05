import { useForm } from 'react-hook-form'
import Button from '../../ui/Button'
import Input from '../../ui/Input'
import TextArea from '../../ui/Textarea'
import { useFormspark } from '@formspark/use-formspark'
import { useAppDispatch } from '../../store/hooks'
import { LOADING_END, LOADING_START } from '../../store/dom'
import { showError, showSuccess } from '../../../libs/helpers'

interface ContactFormValues {
    name: string
    email: string
    subject: string
    message: string
}

const ContactForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormValues>()

    const dispatch = useAppDispatch()

    const [submit, submitting] = useFormspark({
        formId: process.env.NEXT_PUBLIC_FORMID as string,
    })

    async function onSubmit({ email, message, name, subject }: ContactFormValues) {
        try {
            dispatch(LOADING_START())
            await submit({ email, name, subject, message })
            dispatch(LOADING_END())
            showSuccess(dispatch)
            reset({})
        } catch (error) {
            dispatch(LOADING_END())
            showError(dispatch)
            console.log(error)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full mx-auto flex flex-col justify-center "
            noValidate
        >
            <div className="flex flex-col space-y-5">
                <div className="flex flex-col md:flex-row space-y-5 md:space-y-0">
                    <Input
                        labelKey="Your Name (required)"
                        placeholderKey="Enter Your Name"
                        {...register('name', { required: 'Name is required' })}
                        className="w-full md:w-1/2 "
                        errorKey={errors.name?.message}
                        variant="solid"
                        disabled={submitting}
                    />
                    <Input
                        labelKey="Your Email"
                        type="email"
                        placeholderKey="Enter Your Email"
                        disabled={submitting}
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Please provide valid email address',
                            },
                        })}
                        className="w-full md:w-1/2 md:ms-2.5 lg:ms-5 mt-2 md:mt-0"
                        errorKey={errors.email?.message}
                        variant="solid"
                    />
                </div>
                <Input
                    disabled={submitting}
                    labelKey="Subject"
                    {...register('subject', { required: 'Your subject is required' })}
                    className="relative"
                    placeholderKey="Enter Your Subject"
                    errorKey={errors.subject?.message}
                    variant="solid"
                />
                <TextArea
                    disabled={submitting}
                    labelKey="Message"
                    {...register('message')}
                    className="relative mb-4"
                    placeholderKey="Write your message here"
                />
                <div className="relative">
                    <Button
                        disabled={submitting}
                        type="submit"
                        className="h-12 lg:h-14 mt-1 text-sm lg:text-base w-full sm:w-auto !bg-yellow"
                    >
                        Send Message
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default ContactForm
