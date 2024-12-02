import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";

export const MainCanvas = observer(() => {

    const store = React.useContext(StoreContext);

    useEffect(() => {
        const canvas = new fabric.Canvas("canvas", {
            height: 500,
            width: 800,
            backgroundColor: "#ededed",
        });
        fabric.Object.prototype.transparentCorners = false;
        fabric.Object.prototype.cornerColor = "#00a0f5";
        fabric.Object.prototype.cornerStyle = "circle";
        fabric.Object.prototype.cornerStrokeColor = "#0063d8";
        fabric.Object.prototype.cornerSize = 10;
        // canvas mouse down without target should deselect active object
        canvas.on("mouse:down", function (e) {
            if (!e.target) {
                store.setSelectedElement(null);
            }
        });

        store.setCanvas(canvas);
        fabric.util.requestAnimFrame(function render() {
            canvas.renderAll();
            fabric.util.requestAnimFrame(render);
        });
    }, []);
    return (
        <div id="grid-canvas-container" className="col-start-3 bg-slate-100 flex justify-center items-center">
            <canvas id="canvas" className="h-[500px] w-[800px] row" />
        </div>
    );
});