
interface TitleProps {
    title: string,
    subtitle?: string,
    styles?: string
}

function Title({ title, subtitle, styles }: TitleProps) {
    return (
        <div className={`flex flex-col items-center justify-center ${styles}`}>
            <h1 className="text-4xl font-bold">{title}</h1>
            <h2 className="text-xl">{subtitle}</h2>
        </div>
    )
}

export default Title