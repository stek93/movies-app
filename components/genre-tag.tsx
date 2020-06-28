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
            style={{padding: '.5em 2em', fontSize: '.85rem', fontWeight: "bold", borderRadius: '8px'}}>
            {genre.name.toUpperCase()}
        </Tag>
    );
}