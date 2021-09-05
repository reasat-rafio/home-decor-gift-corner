import clsx from 'clsx'
import * as successIcon from './1078-form-submitted.json'
import * as errorIcon from './67782-error.json'
import Lottie from 'react-lottie'
import { useAppSelector } from '../../../store/hooks'
import { selectDom } from '../../../store/dom'

const successAnimation: any = successIcon
const errorAnimation: any = errorIcon

const successOption = {
    loop: true,
    autoplay: true,
    animationData: successAnimation.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
}

const errorOption = {
    loop: true,
    autoplay: true,
    animationData: errorAnimation.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
}

export const Loading: React.FC<{}> = ({}) => {
    const { isLoading, error, success } = useAppSelector(selectDom)

    return (
        <div
            className={clsx(
                'fixed h-full w-full right-0 top-0 left-0 bottom-0  flex justify-center items-center  bg-gray-800 opacity-80',
                isLoading || error || success ? 'z-50 block' : 'z-0 hidden',
            )}
        >
            {isLoading && (
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div>
            )}

            {success && <Lottie options={successOption} height={150} width={150} />}

            {error && <Lottie options={errorOption} height={150} width={150} />}
        </div>
    )
}
