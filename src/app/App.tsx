import { Layout, Model, TabNode, IJsonModel } from 'flexlayout-react';
import 'flexlayout-react/style/light.css';
import { JsonView } from './JsonView';
import { MdHeight } from 'react-icons/md';

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
                                        component: "button",
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
                                        component: "button",
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
                                        component: "button",
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
                                        component: "button",
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

function App() {

    const factory = (node: TabNode) => {
        var component = node.getComponent();
        if (component === "button") {
            return <button>{node.getName()}haha1</button>;
        } else if (component === "json") {
            return (<JsonView model={model} />);
        }
    }

    return (
        <div id="container">
            <div className="app">
                <div className="toolbar secondary-text-color" dir="ltr">
                    head area  web video editor
                </div>
                <div className="contents">
                    <Layout
                        model={model}
                        factory={factory} />
                </div>
            </div>
        </div>
    )
}

export default App;