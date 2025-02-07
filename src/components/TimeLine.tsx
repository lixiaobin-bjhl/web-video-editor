'use client'
import React from 'react'
import { SeekPlayer } from './timeline-related/SeekPlayer'
import { StoreContext } from '@/store'
import { observer } from 'mobx-react'
import { TimeFrameView } from './timeline-related/TimeFrameView'
import { Timeline, TimelineEffect, TimelineRow } from '@xzdarcy/react-timeline-editor'

export const TimeLine = observer(() => {
    const store = React.useContext(StoreContext)
    const percentOfCurrentTime = (store.currentTimeInMs / store.maxTime) * 100
    // const mockData: TimelineRow[] = [{
    //     id: "0",
    //     actions: [
    //         {
    //             id: "action00",
    //             start: 0,
    //             end: 2,
    //             effectId: "effect0",
    //         },
    //     ],
    // },
    // {
    //     id: "1",
    //     actions: [
    //         {
    //             id: "action10",
    //             start: 1.5,
    //             end: 5,
    //             effectId: "effect1",
    //         }
    //     ],
    // }]

    // const mockEffect: Record<string, TimelineEffect> = {
    //     effect0: {
    //         id: "effect0",
    //         name: "效果0",
    //     },
    //     effect1: {
    //         id: "effect1",
    //         name: "效果1",
    //     },
    // };
    // return (
    //     <Timeline
    //         editorData={mockData}
    //         effects={mockEffect}
    //     />
    // );
    return (
        <div className="flex flex-col">
            <SeekPlayer />
            <div className="flex-1 relative">
                {store.editorElements.map((element) => {
                    return <TimeFrameView key={element.id} element={element} />
                })}
                <div
                    className="w-[1px] bg-red-400 absolute top-0 bottom-0 z-20"
                    style={{
                        left: `${percentOfCurrentTime}%`,
                    }}
                ></div>
            </div>
        </div>
    )
})
