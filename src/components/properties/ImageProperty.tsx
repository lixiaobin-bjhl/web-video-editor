import React, { useRef, useEffect } from "react";
import { observer } from "mobx-react";
import { StoreContext } from "@/store";
import { Form, Input, InputNumber, ColorPicker, Radio, Tooltip, Space } from "antd";
import { formLayout } from "./propertyFormLayout";

const ImageProperty = observer(({ formRef }) => {
    const store = React.useContext(StoreContext);
    return (
        <Form ref={formRef} {...formLayout}>
            image property
        </Form>
    );
});

export default ImageProperty;
