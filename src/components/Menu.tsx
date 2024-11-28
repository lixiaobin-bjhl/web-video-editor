"use client";
import React from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import {
    MdDownload,
    MdVideoLibrary,
    MdImage,
    MdTransform,
    MdTitle,
    MdAudiotrack,
    MdOutlineFormatColorFill,
    MdMovieFilter,
} from "react-icons/md";
import { Store } from "@/store/Store";

export const Menu = observer(() => {
    const store = React.useContext(StoreContext);

    return (
        <ul className="bg-white h-full">
            {MENU_OPTIONS.map((option) => {
                const isSelected = store.selectedMenuOption === option.name;
                return (
                    <li
                        key={option.name}
                        className={`h-[72px] w-[72px] flex flex-col items-center justify-center ${isSelected ? "bg-slate-200" : ""}`}
                    >
                        <button
                            onClick={() => option.action(store)}
                            className={`flex flex-col items-center`}
                        >
                            <option.icon
                                size="20"
                                color={
                                    isSelected ? "#000" : "#444"
                                }
                            />
                            <div
                                className={`text-[0.75rem] hover:text-black ${isSelected ? "text-black" : "text-slate-600"}`}
                            >
                                {option.name}
                            </div>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
});

const MENU_OPTIONS = [
    {
        name: "视频",
        icon: MdVideoLibrary,
        action: (store: Store) => {
            store.setSelectedMenuOption("Video");
        },
    },
    {
        name: "音频",
        icon: MdAudiotrack,
        action: (store: Store) => {
            store.setSelectedMenuOption("Audio");
        },
    },
    {
        name: "图片",
        icon: MdImage,
        action: (store: Store) => {
            store.setSelectedMenuOption("Image");
        },
    },
    {
        name: "文字",
        icon: MdTitle,
        action: (store: Store) => {
            store.setSelectedMenuOption("Text");
        },
    },
    {
        name: "动画",
        icon: MdTransform,
        action: (store: Store) => {
            store.setSelectedMenuOption("Animation");
        },
    },
    {
        name: "特效",
        icon: MdMovieFilter,
        action: (store: Store) => {
            store.setSelectedMenuOption("Effect");
        },
    },
    {
        name: "背景",
        icon: MdOutlineFormatColorFill,
        action: (store: Store) => {
            store.setSelectedMenuOption("Fill");
        },
    },
    {
        name: "导出",
        icon: MdDownload,
        action: (store: Store) => {
            store.setSelectedMenuOption("Export");
        },
    },
];
