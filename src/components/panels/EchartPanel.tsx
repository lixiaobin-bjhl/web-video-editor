'use client'
import React from 'react'
import { StoreContext } from '@/store'
import { observer } from 'mobx-react'
import { BlockPicker } from 'react-color'

export const EchartPanel = observer(() => {
    const store = React.useContext(StoreContext)
    return (
        <>
            <div className="text-sm px-[16px] pt-[16px] pb-[8px] font-semibold">
                echart
            </div>
            <div className="flex items-center justify-center">
            </div>
        </>
    )
})
