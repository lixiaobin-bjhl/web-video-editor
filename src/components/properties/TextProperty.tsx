import React, { useRef, useEffect } from "react";
import { observer } from "mobx-react";
import { StoreContext } from "@/store";
import { Form, Input, InputNumber, ColorPicker, Radio, Tooltip, Space } from "antd";
import { formLayout } from "./propertyFormLayout";


// TextProperty 组件用于渲染文本元素的属性
const TextProperty = observer(({ formRef }) => {
    const store = React.useContext(StoreContext);
    useEffect(() => {
        if (formRef.current) {
            formRef.current.setFieldsValue({
                id: store.selectedElement?.id,
                name: store.selectedElement?.name,
                x: store.selectedElement?.placement?.x || 0,
                y: store.selectedElement?.placement?.y || 0
            });
        }
    }, [store.selectedElement]);
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
        <Form ref={formRef} {...formLayout} initialValues={{
            id: store.selectedElement?.id || '',
            name: store.selectedElement?.name || '',
            x: store.selectedElement?.placement?.x || 0,
            y: store.selectedElement?.placement?.y || 0,
        }}>
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
        </Form >
    );
});

export default TextProperty;
