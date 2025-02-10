'use client'
import React, { useState, useContext } from 'react'
import { StoreContext } from '@/store'
import { observer } from 'mobx-react'
import { Element } from '../entity/Element'

export const ElementsPanel = observer((_props: {}) => {
    const store = useContext(StoreContext)
    const [draggedIndex, setDraggedIndex] = useState(null)

    const handleDragStart = (index) => {
        setDraggedIndex(index)
    }

    const handleDragOver = (index) => {
        if (draggedIndex === index) {return}

        const items = Array.from(store.editorElements)
        const [removed] = items.splice(draggedIndex, 1)
        items.splice(index, 0, removed)

        store.updateEditorElements(items)
        setDraggedIndex(index)
    }

    const handleDragEnd = () => {
        setDraggedIndex(null)
    }

    return (
        <div className="bg-slate-200 h-full overflow-scroll">
            <div className="flex flex-col">
                {store.editorElements.map((element, index) => (
                    <div
                        key={element.id}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(e) => {
                            e.preventDefault() // Allow dropping
                            handleDragOver(index)
                        }}
                        onDragEnd={handleDragEnd}
                        className={`transition-colors duration-200 ${draggedIndex === index ? 'bg-blue-100' : ''} ${draggedIndex !== null ? 'cursor-move' : ''}`}
                        style={{
                            margin: '4px 0',
                            border: draggedIndex === index ? '2px dashed blue' : 'none',
                            backgroundColor: draggedIndex === index ? '#e2e8f0' : 'transparent',
                        }}
                    >
                        <Element element={element} />
                    </div>
                ))}
            </div>
        </div>
    )
})
