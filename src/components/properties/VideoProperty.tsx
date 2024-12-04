import React, { useRef, useEffect } from "react";
import { observer } from "mobx-react";
import { StoreContext } from "@/store";
import { Form, Input, InputNumber, ColorPicker, Radio, Tooltip, Space } from "antd";

const VideoProperty = observer(({ formRef }) => {
    const store = React.useContext(StoreContext);
    return (
        <div>video property</div>
    );
});

export default VideoProperty;
