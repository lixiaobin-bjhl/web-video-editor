'use client'
import { useEffect, useRef, useState } from 'react'

export const ScaleRangeInput: React.FC<ScaleRangeInputProps> = (props) => {
    const { max, value, onChange } = props
    const ref = useRef<HTMLCanvasElement>(null)
    const refIsMouseDown = useRef(false)
    const [canvasSize, setCanvasSize] = useState({ width: 50, height: props.height })

    const formatTime = (ms) => {
        const seconds = (ms / 1000).toFixed(1)
        return `${seconds}s`
    }

    useEffect(() => {
        // update canvas size based on container size
        const handleResize = () => {
            if (ref.current) {
                setCanvasSize({
                    width: ref.current.parentElement?.clientWidth ?? 50,
                    height: ref.current.parentElement?.clientHeight ?? props.height
                })
            }
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    useEffect(() => {
        if (ref.current) {
            const canvas = ref.current
            canvas.width = canvasSize.width
            canvas.height = canvasSize.height
            const ctx = canvas.getContext('2d')
            const width = canvas.width
            const height = canvas.height
            if (ctx) {
                // 清除画布
                // ctx.fillStyle = backgroundColor;
                // ctx.fillRect(0, 0, canvas.width, canvas.height);

                // 绘制顶部主轴线
                ctx.strokeStyle = '#1a1a1a'
                ctx.lineWidth = 2
                ctx.beginPath()
                ctx.moveTo(0, 25)
                ctx.lineTo(width, 25)
                ctx.stroke()

                // 绘制刻度
                props.markings.forEach((marking) => {
                    ctx.strokeStyle = marking.color
                    ctx.lineWidth = marking.width
                    ctx.beginPath()
                    for (let i = 0; i <= max; i += marking.interval) {
                        const x = (i / max) * canvas.width
                        const startY = 10 // 从顶部主轴线开始
                        const endY = startY + marking.size // 向下延伸

                        ctx.moveTo(x, startY)
                        ctx.lineTo(x, endY)
                    }
                    ctx.stroke()
                    // 绘制时间文本
                    if (marking.showText) {
                        ctx.fillStyle = marking.color
                        ctx.font = `${marking.interval >= 10000 ? '14px' : '12px'} Arial`
                        ctx.textAlign = 'center'
                        for (let i = 0; i <= max; i += marking.interval) {
                            const x = (i / max) * canvas.width
                            const timeText = formatTime(i)
                            // 文字位置调整到刻度下方
                            ctx.fillText(timeText, x, 45)
                        }
                    }
                })

                // 添加渐变效果
                const gradient = ctx.createLinearGradient(0, height, 0, 0)
                gradient.addColorStop(0, 'rgba(255,255,255,0.1)')
                gradient.addColorStop(1, 'rgba(255,255,255,0)')
                ctx.fillStyle = gradient
                ctx.fillRect(0, 0, width, height)
            }
        }
    }, [props.markings, props.backgroundColor, max, canvasSize])
    const updateFromMouseEvent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = ref.current?.getBoundingClientRect()
        if (rect) {
            const x = e.clientX - rect.left
            const value = x / canvasSize.width * max
            const normalizedValue = Math.min(max, Math.max(0, value))
            onChange(normalizedValue)
        }
    }
    return <div
        className="relative w-full"
        onMouseDown={(e) => {
            refIsMouseDown.current = true
            updateFromMouseEvent(e)
        }}
        onMouseUp={(e) => {
            refIsMouseDown.current = false
        }}
        onMouseMove={(e) => {
            if (refIsMouseDown.current) {
                updateFromMouseEvent(e)
            }
        }}
        onMouseLeave={(e) => {
            refIsMouseDown.current = false
        }}
    >
        <canvas
            height={props.height}
            ref={ref}></canvas>
        <div
            className="rounded-full bg-black w-[1px] absolute top-0 left-0"
            style={{
                height: `${props.height}px`,
                transform: `translateX(${value / max * canvasSize.width}px) translateX(-0px)`
            }}
        >

        </div>

    </div>
}; export type ScaleRangeInputProps = {
    max: number;
    value: number;
    markings: Marking[];
    onChange: (value: number) => void;
    height: number;
    backgroundColor: string;
};
export type Marking = {
    interval: number;
    color: string;
    size: number;
    width: number;
    showText: boolean;
};

