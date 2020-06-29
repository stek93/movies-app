import { Input } from "antd";
import React from "react";
import { UserOutlined } from '@ant-design/icons';

interface ISearch {
    doSearch: (searchTerm: string) => void
    emptySearch: () => void
}

export default function SearchField({ doSearch, emptySearch }: ISearch) {

    return (
        <Input size="large"
               placeholder="Search something"
               onKeyUp={(event: any) => {
                    const searchTerm = event.target.value;
                    if (searchTerm.length >= 2) {
                        doSearch(searchTerm.toLowerCase());
                    } else if (searchTerm.length == 0) {
                        emptySearch();
                    }}}
               prefix={<UserOutlined />}
        />
    );
}