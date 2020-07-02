import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import React from "react";
import styles from './favourite-btn.module.css';

interface IFavourite {
    isFavourite: boolean;
    movieId: number;
    addMovieToFavourites: (movieId: number, favourite: boolean) => void;
}

export default function FavouriteButton({ isFavourite, addMovieToFavourites, movieId }: IFavourite) {
    let icon = <HeartOutlined className={styles.favBtnIcon} />;

    if(isFavourite) {
        icon = <HeartFilled className={styles.favBtnIcon} />
    }

    return (
        <Tooltip title="Add movie to favourite list" style={{width: '2vh'}}>
            <Button size="large" shape="circle" icon={icon} onClick={() => addMovieToFavourites(movieId, !isFavourite)} />
        </Tooltip>
    );
}