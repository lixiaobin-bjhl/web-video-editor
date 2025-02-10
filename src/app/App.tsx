
'use client'

import { Layout, Model, TabNode, IJsonModel, BorderNode } from 'flexlayout-react'
import 'flexlayout-react/style/light.css'
import { LayoutJsonView, VideoJsonView } from './JsonView'
import { Toolbar } from '../components/Toolbar'
import { Resources } from '@/components/Resources'
import { Property } from '@/components/Property'
import { TimeLine } from '@/components/TimeLine'
import { StoreContext } from '@/store'
import { ElementsPanel } from '@/components/panels/ElementsPanel'
import { Store } from '@/store/Store'
import React, { useEffect, useState } from 'react'
import { MainCanvas } from '@/components/MainCanvas'
import { observer } from 'mobx-react'
import { DownloadOutlined } from '@ant-design/icons'
import { Button } from 'antd'

import {
    MdDownload,
} from 'react-icons/md'

import '@/utils/fabric-utils'

var json: IJsonModel = {
    global: { 'tabEnablePopout': false },
    borders: [
        {
            'type': 'border',
            'location': 'bottom',
            'size': 100,
            'children': [
                {
                    'type': 'tab',
                    'name': '布局JSON',
                    'component': 'layoutJson',
                    'enableClose': false
                },
                {
                    'type': 'tab',
                    'name': '视频JSON',
                    'component': 'videoJson',
                    'enableClose': false
                }
            ]
        }
    ],
    layout: {
        type: 'row',
        children: [
            {
                type: 'row',
                weight: 100,
                children: [
                    {
                        type: 'row',
                        weight: 70,
                        children: [
                            {
                                type: 'tabset',
                                weight: 20,
                                children: [
                                    {
                                        type: 'tab',
                                        name: '工具栏',
                                        component: 'toolbar',
                                    }
                                ]
                            },
                            {
                                type: 'tabset',
                                weight: 60,
                                children: [
                                    {
                                        type: 'tab',
                                        name: '主控台',
                                        component: 'mainCanvas',
                                    }
                                ]
                            },
                            {
                                type: 'tabset',
                                weight: 20,
                                children: [
                                    {
                                        type: 'tab',
                                        name: '属性',
                                        component: 'property',
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        type: 'row',
                        weight: 30,
                        children: [
                            {
                                type: 'tabset',
                                weight: 20,
                                children: [
                                    {
                                        type: 'tab',
                                        name: '图层',
                                        component: 'elementsPanel',
                                    }
                                ]
                            },
                            {
                                type: 'tabset',
                                weight: 80,
                                children: [
                                    {
                                        type: 'tab',
                                        name: '时间轴',
                                        component: 'timeLine',
                                    }
                                ]
                            }
                        ]
                    },
                ]
            }
        ]
    }
}

const model = Model.fromJson(json)

export const App = () => {
    const [store] = useState(new Store())
    const factory = (node: TabNode) => {
        var component = node.getComponent()
        if (component === 'button') {
            return <button>{node.getName()}haha1</button>
        } else if (component === 'layoutJson') {
            return (<LayoutJsonView model={model} />)
        } else if (component === 'videoJson') {
            return (<VideoJsonView />)
        } else if (component === 'toolbar') {
            return (
                <div className='grid grid-flow-col'><Toolbar /><Resources /></div >
            )
        } else if (component === 'mainCanvas') {
            return (<MainCanvas />)
        } else if (component === 'timeLine') {
            return (<TimeLine />)
        } else if (component === 'elementsPanel') {
            return (<ElementsPanel />)
        } else if (component === 'property') {
            return (<Property />)
        }
    }
    return (
        <StoreContext.Provider value={store}>
            <div id="container">
                <div className="app">
                    <div className="header secondary-text-color flex justify-between items-center p-1" dir="ltr">
                        <div >
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="app-logo__icon"><path d="M22.478 10.0505C20.2848 8.07316 17.8588 6.30302 15.2075 4.77508C12.5561 3.24628 9.81069 2.02013 7.00436 1.1139C5.66596 0.665316 4.31029 0.301788 2.95418 0C2.53194 1.32977 2.17748 2.68544 1.89253 4.06702C1.27945 6.95106 0.959961 9.93009 0.959961 12.9955C0.959961 16.0608 1.27945 19.0485 1.89253 21.933C2.17748 23.3141 2.53151 24.6702 2.95418 26C4.31029 25.6973 5.66596 25.3347 7.00436 24.8861C9.81069 23.9794 12.5561 22.7619 15.2075 21.2249C17.8588 19.6961 20.2848 17.926 22.478 15.9486C23.5311 15.016 24.5245 14.0321 25.4657 13.0041C24.5245 11.9679 23.5311 10.9831 22.478 10.0505ZM7.00436 18.9799V7.01971L17.3662 13.0032L7.00436 18.9799Z" fill="url(#paint0_linear_13855_22510)"></path><defs><linearGradient id="paint0_linear_13855_22510" x1="0.959961" y1="0" x2="0.959961" y2="26" gradientUnits="userSpaceOnUse"><stop stopColor="#3291FF"></stop><stop offset="1" stopColor="#00D48E"></stop></linearGradient></defs></svg>
                        </div>
                        <div className='flex cursor-pointer' onClick={() => {
                            store.handleSeek(0)
                            store.setSelectedElement(null)
                            setTimeout(() => {
                                store.setPlaying(true)
                                store.saveCanvasToVideoWithAudio()
                            }, 1000)
                        }}>
                            <Button type="primary" icon={<DownloadOutlined />} shape="round">导出视频</Button>
                        </div>
                    </div>
                    <div className="contents">
                        <Layout
                            model={model}
                            factory={factory} />
                    </div>
                </div>
            </div>
        </StoreContext.Provider >
    )
}
