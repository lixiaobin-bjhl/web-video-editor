import React, { useRef, useEffect } from 'react'
import { observer } from 'mobx-react'
import { Form, Input, InputNumber, ColorPicker, Radio, Tooltip, Space } from 'antd'
import { formLayout } from './propertyFormLayout'
import { StoreContext } from '@/store'
import classNames from 'classnames'

// MainCanvas 组件用于渲染通用属性或当没有 selectedElement 时
const MainCanvasProperty = observer(({ formRef }) => {
    const store = React.useContext(StoreContext)
    // 定义20个常用颜色
    const quickColors = [
        '#ffffff', // 白色
        '#ff4d4f', '#fa8c16', '#fadb14', '#a0d911', '#52c41a',
        '#13c2c2', '#3ca9fa', '#2f54eb', '#722ed1', '#eb2f96',
        '#ffcc00', '#b7eb8f', '#87d068', '#1890ff', '#40a9ff',
        '#2db7f5', '#13c2c2', '#87d068', '#000000'  // 黑色
    ]

    useEffect(() => {
        if (formRef.current) {
            formRef.current.setFieldsValue({
                backgroundColor: store.backgroundColor
            })
        }
    }, [store.backgroundColor])
    return (
        <Form ref={formRef} {...formLayout} initialValues={{
            backgroundColor: store.backgroundColor || '',
            maxTime: store.maxTime,
            fps: store.fps,
            selectedVideoFormat: store.selectedVideoFormat,
            canvasHeight: store.canvasHeight,
            canvasWidth: store.canvasWidth
        }}>
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
                <div>
                    <ColorPicker
                        onChangeComplete={(color) => store.setBackgroundColor(color.toHexString())}
                        value={store.backgroundColor} showText />
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
                </div>
            </Form.Item>
            <Form.Item
                label="画布宽度"
                name="canvasWidth"
            >
                <Input placeholder="请输入画布宽度" onChange={(e) => store.setCanvasSize(
                    +formRef.current.getFieldsValue().canvasWidth,
                    +formRef.current.getFieldsValue().canvasHeight
                )} />
            </Form.Item>
            <Form.Item
                label="画布高度"
                name="canvasHeight"
            >
                <Input placeholder="请输入画布高度" onChange={(e) => store.setCanvasSize(
                    +formRef.current.getFieldsValue().canvasWidth,
                    +formRef.current.getFieldsValue().canvasHeight
                )} />
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
        </Form >
    )
})

export default MainCanvasProperty
