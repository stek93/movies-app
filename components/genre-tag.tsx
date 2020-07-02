import { Tag } from "antd";
import React from "react";
import { Genre } from "../constants/types";

interface IGenreTag {
    genre: Genre;
}

export default function GenreTag({ genre }: IGenreTag) {
    return (
        <Tag
            color="#696969"
            style={{padding: '.3vh .9vw', fontSize: '.85rem', fontWeight: "bold", borderRadius: '8vw'}}>
            {genre.name.toUpperCase()}
        </Tag>
    );
}