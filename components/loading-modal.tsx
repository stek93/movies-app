import { Col, Row, Spin } from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import styles from './loading-modal.module.css';

interface ILoadingModal {
    visible: boolean;
}

export default function LoadingModal({ visible }: ILoadingModal) {
    const modal = (
        <div className={styles.loadingModal}>
            <Row align="middle" justify="center" className={styles.loadingBarRow}>
                <Col>
                    <Spin indicator={
                        <LoadingOutlined className={styles.loadingBar} spin />}
                    />
                </Col>
            </Row>
        </div>
    );
    return (
        visible? modal : null
    );
}