import React from "react";
import styles from './movie-short-overview.module.css';
import RcTweenOne from "rc-tween-one";
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';
import { StarFilled, FireFilled, ClockCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import { Col, Row } from "antd";

interface IMovieShortOverview {
    title: string;
    runtime: number;
    release_date: string;
    vote_average: number;
    popularity: number;
    vote_count: number;
}

RcTweenOne.plugins.push(Children);

export default function MovieShortOverview({ title, runtime, release_date, vote_average, popularity, vote_count }: IMovieShortOverview) {
    const releaseYear = release_date.split('-')[0];
    return (
        <>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.divider}>
                <Row>
                    <Col span={8}>
                        <StarFilled />
                        <RcTweenOne className={styles.ratingIcon} animation={{Children: {value: vote_average, floatLength: 1}, duration: 1000}} />
                        <span className={styles.lessSignificant}> /10 ({vote_count})</span>
                    </Col>
                    <Col span={8}>
                        <FireFilled />
                        <RcTweenOne className={styles.ratingIcon} animation={{Children: {value: popularity, floatLength: 3}, duration: 1000}}/>
                    </Col>
                    <Col span={4} className={styles.year}>
                        <span>
                            <CalendarOutlined/>
                            <span className={styles.iconText}>
                                {releaseYear}
                            </span>
                        </span>
                    </Col>
                    <Col span={4} className={styles.runtime}>
                        <span>
                            <ClockCircleOutlined />
                            <span className={styles.iconText}>
                                {runtime}
                                <span className={styles.lessSignificant}> min</span>
                            </span>
                        </span>
                    </Col>
                </Row>
            </div>
        </>
    );
}