"use client";
import React, { useRef, useEffect } from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { Input, Form, InputNumber, ColorPicker, Radio, Tooltip, Space } from "antd";
import classNames from 'classnames';

export const Property = observer((props: EffectResourceProps) => {
    const store = React.useContext(StoreContext);
    const formRef = useRef();
    // 定义20个常用颜色
    const quickColors = [
        '#ffffff', // 白色
        '#ff4d4f', '#fa8c16', '#fadb14', '#a0d911', '#52c41a',
        '#13c2c2', '#3ca9fa', '#2f54eb', '#722ed1', '#eb2f96',
        '#ffcc00', '#b7eb8f', '#87d068', '#1890ff', '#40a9ff',
        '#2db7f5', '#13c2c2', '#87d068', '#000000'  // 黑色
    ];
    useEffect(() => {
        if (formRef.current) {
            formRef.current.setFieldsValue({
                id: store.selectedElement?.id,
                name: store.selectedElement?.name,
                x: store.selectedElement?.placement?.x || '',
                y: store.selectedElement?.placement?.y || '',
                backgroundColor: store.backgroundColor
            });
        }
    }, [store.selectedElement, store.backgroundColor]);
    const handleElementPropertyInputChange = (store, key, subKey) => (e) => {
        let value = e.target.value;
        if (!store.selectedElement) return;
        if (subKey) {
            // 如果存在子键，则更新嵌套对象的值
            store.selectedElement[key] = {
                ...store.selectedElement[key],
                [subKey]: +e.target.value,
            };
        } else {
            // 否则直接更新对象的值
            store.selectedElement[key] = e.target.value;
        }
        store.updateEditorElement(store.selectedElement);
    };
    return (
        <Form
            ref={formRef}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            className="p-5"
            initialValues={{
                id: store.selectedElement?.id || '',
                name: store.selectedElement?.name || '',
                x: store.selectedElement?.placement?.x || '',
                y: store.selectedElement?.placement?.y || '',
                backgroundColor: store.backgroundColor || '',
                maxTime: store.maxTime,
                fps: store.fps,
                selectedVideoFormat: store.selectedVideoFormat,
                canvasHeight: store.canvasHeight,
                canvasWidth: store.canvasWidth
            }}
        >
            {store.selectedElement ? (
                <>
                    <Form.Item
                        label="控件ID"
                        name="id"
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="图层名称"
                        name="name"
                    >
                        <Input placeholder="请输入图层名称" onChange={handleElementPropertyInputChange(store, 'name', null)} />
                    </Form.Item>
                    <Form.Item
                        label="X坐标"
                        name="x"
                    >
                        <Input placeholder="请输入水平位置" onChange={handleElementPropertyInputChange(store, 'placement', 'x')} />
                    </Form.Item>
                    <Form.Item
                        label="Y坐标"
                        name="y"
                    >
                        <Input placeholder="请输入垂直位置" onChange={handleElementPropertyInputChange(store, 'placement', 'y')} />
                    </Form.Item>
                </>
            ) : (
                <>
                    <Form.Item
                        label="最大时长"
                        name="maxTime"
                    >
                        <Input placeholder="请输入最大时长" onChange={(e) => store.setMaxTime(+e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="帧率"
                        name="fps"
                    >
                        <Input placeholder="请输入最大时长" onChange={(e) => store.setFps(+e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="背景颜色"
                        name="backgroundColor"
                    >
                        <ColorPicker
                            onChangeComplete={color => store.setBackgroundColor(color.toHexString())}
                            defaultValue={store.backgroundColor} showText />
                        <Space size={[8, 16]} wrap style={{ marginTop: 16 }}>
                            {quickColors.map((qc, index) => (
                                <Tooltip title={`Click to select ${qc}`} key={index}>
                                    <span
                                        className={classNames('color-block', { selected: qc === store.backgroundColor })}
                                        onClick={() => store.setBackgroundColor(qc)}
                                        style={{ backgroundColor: qc, cursor: 'pointer', width: 24, height: 24, display: 'inline-block' }}
                                    />
                                </Tooltip>
                            ))}
                        </Space>
                    </Form.Item>
                    <Form.Item
                        label="画布宽度"
                        name="canvasWidth"
                    >
                        <Input placeholder="请输入画布宽度" onChange={(e) => store.setCanvasSize(+formRef.current.getFieldsValue().canvasWidth,
                            +formRef.current.getFieldsValue().canvasHeight)} />
                    </Form.Item>
                    <Form.Item
                        label="画布高度"
                        name="canvasHeight"
                    >
                        <Input placeholder="请输入画布高度" onChange={(e) => store.setCanvasSize(+formRef.current.getFieldsValue().canvasWidth,
                            +formRef.current.getFieldsValue().canvasHeight)} />
                    </Form.Item>
                    <Form.Item
                        label="视频格式"
                        name="selectedVideoFormat"
                    >
                        <Radio.Group onChange={(e) => store.setVideoFormat(e.target.value)}>
                            <Radio value="mp4">mp4</Radio>
                            <Radio value="webm">webm</Radio>
                        </Radio.Group>
                    </Form.Item>
                </>
            )
            }
        </Form>
    );
});
