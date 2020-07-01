import { Input } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import styles from './search-field.module.css';
import React from "react";

interface ISearch {
    doSearch: (searchTerm: string) => void
    emptySearch: () => void
}

export default function SearchField({ doSearch, emptySearch }: ISearch) {
    return (
        <Input
            size="large"
            className={styles.searchField}
            placeholder="Search"
            onKeyUp={ (event: any) => {
                const searchTerm = event.target.value;
                if (searchTerm.length >= 2) {
                    doSearch(searchTerm.toLowerCase());
                } else if (searchTerm.length == 0) {
                    emptySearch();
                }
            } }
            prefix={ <SearchOutlined className={styles.searchIcon} /> }
        />
    );
}