"use client";
import React from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { Element } from "../entity/Element";

export const ElementsPanel = observer((_props: {}) => {
    const store = React.useContext(StoreContext);
    return (
        <div className="bg-slate-200 h-full overflow-scroll">
            <div className="flex flex-col">
                {store.editorElements.map((element) => {
                    return <Element key={element.id} element={element} />;
                })}
            </div>
        </div>
    );
});
