import Logo from "../components/logo";
import React from "react";
import { Col, Layout, Row } from "antd";
import SearchField from "../components/search-field";
import styles from './header-menu.module.css';

const { Header } = Layout;

interface IHeaderMenu {
    searchMovies?: (searchTerm: string) => void;
    restartMoviesList?: () => void;
    showSearchBar?: boolean;
}

export default function HeaderMenu({ searchMovies, restartMoviesList, showSearchBar }: IHeaderMenu) {
    return (
        <Header className={styles.header}>
            <Row align="middle">
                <Col span={2}>
                    <Logo />
                </Col>
                <Col span={6} offset={8}>
                    {
                        showSearchBar ? <SearchField doSearch={searchMovies} emptySearch={restartMoviesList}/> : null
                    }
                </Col>
            </Row>
        </Header>
    );
}