import { FC } from 'react'
import { SanityImg } from 'sanity-react-extra'
import { ContactUsProps } from '../../../libs/types/contactUsTypes'
import { imageUrlBuilder, PortableText } from '../../../utils/sanity'
// import { IoLocationSharp, IoMail, IoCallSharp } from 'react-icons/io5'
// import Link from "@components/ui/link";

// const mapImage = '/assets/images/map-image.jpg'
// const data = [
//     {
//         id: 1,
//         slug: '/',
//         icon: <IoLocationSharp />,
//         name: 'text-address',
//         description: 'text-address-details',
//     },
//     {
//         id: 2,
//         slug: '/',
//         icon: <IoMail />,
//         name: 'text-email',
//         description: 'text-email-details',
//     },
//     {
//         id: 3,
//         slug: '/',
//         icon: <IoCallSharp />,
//         name: 'text-phone',
//         description: 'text-phone-details',
//     },
// ]
// interface ContactUsProps {
//     image?: HTMLImageElement
// }
const ContactInfoBlock: FC<{ contact: ContactUsProps }> = ({ contact }) => {
    return (
        <div className="mb-6 lg:border lg:rounded-md border-gray-300 lg:p-7">
            <h4 className="text-2xl md:text-lg font-bold text-heading pb-7 md:pb-10 lg:pb-6 -mt-1">
                {contact.contactUs.titile}
            </h4>

            {contact.contactUs.info.map((item, index) => (
                <div key={`contact--key${index}`} className="flex pb-7">
                    <div className="flex flex-shrink-0 justify-center items-center p-1.5 border rounded-md border-gray-300 w-10 h-10">
                        <SanityImg
                            className=""
                            builder={imageUrlBuilder}
                            image={item.icon}
                            width={50}
                        />
                    </div>
                    <div className="flex flex-col ps-3 2xl:ps-4">
                        <h5 className="text-sm font-bold text-heading">{item.title}</h5>
                        <PortableText blocks={item.description} />
                    </div>
                </div>
            ))}

            <SanityImg
                className="rounded-md"
                builder={imageUrlBuilder}
                image={contact.contactUs.locationImage}
                width={500}
            />
        </div>
    )
}

export default ContactInfoBlock
