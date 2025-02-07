'use client'

import { StoreContext } from '@/store'
import { formatTimeToMinSecMili } from '@/utils'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { MdPlayArrow, MdPause } from 'react-icons/md'
import { ScaleRangeInput } from './ScaleRangeInput'

const MARKINGS = [
    {
        interval: 1000, // 10秒主刻度
        color: '#1a1a1a',
        size: 20,
        width: 2,
        showText: true
    },
    {
        interval: 500,  // 5秒中刻度
        color: '#4a4a4a',
        size: 15,
        width: 1.5,
        showText: true
    },
    {
        interval: 100,  // 1秒小刻度
        color: '#6a6a6a',
        size: 10,
        width: 1,
        showText: false
    },
    {
        interval: 50,   // 500ms最小刻度
        color: '#8a8a8a',
        size: 5,
        width: 0.5,
        showText: false
    }
]

export type SeekPlayerProps = {};


export const SeekPlayer = observer((_props: SeekPlayerProps) => {
    const store = useContext(StoreContext)
    const Icon = store.playing ? MdPause : MdPlayArrow
    const formattedTime = formatTimeToMinSecMili(store.currentTimeInMs)
    const formattedMaxTime = formatTimeToMinSecMili(store.maxTime)
    return (
        <div className="seek-player flex flex-col secondary-text-color">
            <div className="flex flex-row items-center px-2">
                <button
                    className="w-[80px] rounded  px-2 py-2"
                    onClick={() => {
                        store.setPlaying(!store.playing)
                    }}
                >
                    <Icon size="40"></Icon>
                </button>
                <span className="font-mono">{formattedTime}</span>
                <div className="w-[1px] h-[25px] bg-slate-300 mx-[10px]"></div>
                <span className="font-mono">{formattedMaxTime}</span>
            </div>
            <ScaleRangeInput
                max={store.maxTime}
                value={store.currentTimeInMs}
                onChange={(value) => {
                    store.handleSeek(value)
                }}
                height={80}
                markings={MARKINGS}
                backgroundColor="#ffffff"
            />
        </div>
    )
})
