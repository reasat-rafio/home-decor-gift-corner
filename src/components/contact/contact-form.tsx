import { useForm } from 'react-hook-form'
import Button from '../common/Button'
import Input from '../common/Input'
import TextArea from '../common/Textarea'

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
        formState: { errors },
    } = useForm<ContactFormValues>()
    function onSubmit(values: ContactFormValues) {
        console.log(values, 'contact')
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
                    />
                    <Input
                        labelKey="Your Email"
                        type="email"
                        placeholderKey="Enter Your Email"
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
                    labelKey="Subject"
                    {...register('subject', { required: 'Your subject is required' })}
                    className="relative"
                    placeholderKey="Enter Your Subject"
                    errorKey={errors.subject?.message}
                    variant="solid"
                />
                <TextArea
                    labelKey="Message"
                    {...register('message')}
                    className="relative mb-4"
                    placeholderKey="Write your message here"
                />
                <div className="relative">
                    <Button
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
