import { Input } from "antd";
import React from "react";
import {
    UserOutlined
} from '@ant-design/icons';

const KEYWORDS = ["after", "older", "star", "stars", "at least", "older than"];

export default function SearchField() {
    const handleMovieSearch = (e) => {
        if (e.target.value.length >= 2) {
            console.log(e.target.value);
        }
    }

    return (
        <Input size="large" placeholder="large size" onKeyUp={handleMovieSearch} prefix={<UserOutlined />} />
    );
}