import Logo from "../components/logo";
import React from "react";
import { Col, Layout, Row } from "antd";
import SearchField from "../components/search-field";

const { Header } = Layout;

interface IHeaderMenu {
    searchMovies: (searchTerm: string) => void
}

export default function HeaderMenu({ searchMovies }: IHeaderMenu) {
    return (
        <Header style={ { backgroundColor: '#222222', padding: 0, lineHeight: 0 } }>
            <Row>
                <Col span={2}>
                    <Logo />
                </Col>
                <Col>
                    <SearchField doSearch={searchMovies}/>
                </Col>
            </Row>
        </Header>
    );
}