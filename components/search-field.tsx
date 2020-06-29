import { Input } from "antd";
import React from "react";
import { UserOutlined } from '@ant-design/icons';

interface ISearch {
    doSearch: (searchTerm: string) => void
}

export default function SearchField({ doSearch }: ISearch) {

    return (
        <Input size="large"
               placeholder="Search something"
               onKeyUp={(event: any) => {
                    const searchTerm = event.target.value;
                    if (searchTerm.length >= 2) {
                        doSearch(searchTerm.toLowerCase());
                    }}}
               prefix={<UserOutlined />}
        />
    );
}