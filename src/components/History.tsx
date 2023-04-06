import type { ReactElement } from 'react'

interface IHistoryProps {
    history: string[]
}

const History = ({ history }: IHistoryProps): ReactElement => {
    return (
        <div className='flex flex-col w-full lg:w-fit lg:h-full aspect-square m-auto p-6 gap-y-4 text-center overflow-y-auto'>
            {
                history.length > 0
                    ? history.map((text, index) => <p key={index}>{text}</p>)
                    : <p>There is no history.</p>
            }
        </div>
    )
}

export default History
