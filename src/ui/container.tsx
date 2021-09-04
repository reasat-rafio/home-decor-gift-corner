import clsx from 'clsx'

interface Props {
    className?: string
    children?: any
    el?: HTMLElement
    clean?: boolean
}

const Container: React.FC<Props> = ({ children, className, el = 'div', clean }) => {
    const rootClassName = clsx(className, !clean && 'mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16')

    let Component: React.ComponentType<React.HTMLAttributes<HTMLDivElement>> = el as any

    return <Component className={rootClassName}>{children}</Component>
}

export default Container
