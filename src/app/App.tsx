
"use client";

import { Layout, Model, TabNode, IJsonModel } from 'flexlayout-react';
import 'flexlayout-react/style/light.css';
import { JsonView } from './JsonView';
import { Toolbar } from "../components/Toolbar";
import { Resources } from '@/components/Resources';
import { TimeLine } from "@/components/TimeLine";
import { StoreContext } from "@/store";
import { ElementsPanel } from '@/components/panels/ElementsPanel';
import { Store } from "@/store/Store";
import React, { useEffect, useState } from "react";
import { MainCanvas } from '@/components/MainCanvas';
import { observer } from "mobx-react";

import "@/utils/fabric-utils";

var json: IJsonModel = {
    global: { "tabEnablePopout": false },
    borders: [
        {
            "type": "border",
            "location": "bottom",
            "size": 100,
            "children": [
                {
                    "type": "tab",
                    "name": "布局JSON",
                    "component": "json"
                },
                {
                    "type": "tab",
                    "name": "视频JSON",
                    "component": "json"
                }
            ]
        }
    ],
    layout: {
        type: "row",
        children: [
            {
                type: "row",
                weight: 100,
                children: [
                    {
                        type: "row",
                        weight: 70,
                        children: [
                            {
                                type: "tabset",
                                weight: 20,
                                children: [
                                    {
                                        type: "tab",
                                        name: "工具栏",
                                        component: "toolbar",
                                    }
                                ]
                            },
                            {
                                type: "tabset",
                                weight: 60,
                                children: [
                                    {
                                        type: "tab",
                                        name: "编辑区",
                                        component: "mainCanvas",
                                    }
                                ]
                            },
                            {
                                type: "tabset",
                                weight: 20,
                                children: [
                                    {
                                        type: "tab",
                                        name: "属性区",
                                        component: "button",
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        type: "row",
                        weight: 30,
                        children: [
                            {
                                type: "tabset",
                                weight: 20,
                                children: [
                                    {
                                        type: "tab",
                                        name: "层",
                                        component: "elementsPanel",
                                    }
                                ]
                            },
                            {
                                type: "tabset",
                                weight: 80,
                                children: [
                                    {
                                        type: "tab",
                                        name: "时间轴",
                                        component: "timeLine",
                                    }
                                ]
                            }
                        ]
                    },
                ]
            }
        ]
    }
};

const model = Model.fromJson(json);

export const App = () => {
    const [store] = useState(new Store());
    const factory = (node: TabNode) => {
        var component = node.getComponent();
        if (component === "button") {
            return <button>{node.getName()}haha1</button>;
        } else if (component === "json") {
            return (<JsonView model={model} />);
        } else if (component === "toolbar") {
            return (
                <div className='grid grid-flow-col'><Toolbar /><Resources /></div >
            );
        } else if (component === "mainCanvas") {
            return (<MainCanvas />);
        } else if (component === "timeLine") {
            return (<TimeLine />);
        } else if (component === "elementsPanel") {
            return (<ElementsPanel />);
        }
    }
    return (
        <StoreContext.Provider value={store}>
            <div id="container">
                <div className="app">
                    <div className="header secondary-text-color" dir="ltr">
                        head area  web video editor
                    </div>
                    <div className="contents">
                        <Layout
                            model={model}
                            factory={factory} />
                    </div>
                </div>
            </div>
        </StoreContext.Provider>
    )
}