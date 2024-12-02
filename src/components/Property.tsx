"use client";
import React, { useRef, useEffect } from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { Input, Form } from "antd";

export const Property = observer((props: EffectResourceProps) => {
    const store = React.useContext(StoreContext);
    const formRef = useRef();
    useEffect(() => {
        if (formRef.current && store.selectedElement) {
            formRef.current.setFieldsValue({
                id: store.selectedElement.id,
                name: store.selectedElement.name,
                x: store.selectedElement.placement?.x || '',
                y: store.selectedElement.placement?.y || ''
            });
        }
    }, [store.selectedElement]);
    const handleInputChange = (store, key, subKey) => (e) => {
        if (!store.selectedElement) return;
        if (subKey) {
            // 如果存在子键，则更新嵌套对象的值
            store.selectedElement[key] = {
                ...store.selectedElement[key],
                [subKey]: e.target.value,
            };
        } else {
            // 否则直接更新对象的值
            store.selectedElement[key] = e.target.value;
        }
    };
    return (
        <Form
            ref={formRef}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            className="p-5"
            initialValues={{
                id: store.selectedElement?.id || '',
                name: store.selectedElement?.name || '',
                x: store.selectedElement?.placement?.x || '',
                y: store.selectedElement?.placement?.y || ''
            }}
        >
            <Form.Item
                label="ID"
                name="id"
            >
                <Input disabled />
            </Form.Item>
            <Form.Item
                label="名称"
                name="name"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="X"
                name="x"
            >
                <Input placeholder="请输入水平位置" onChange={handleInputChange(store, 'placement', 'x')} />
            </Form.Item>
            <Form.Item
                label="Y"
                name="y"
            >
                <Input placeholder="请输入垂直位置" />
            </Form.Item>
        </Form>
    );
});
