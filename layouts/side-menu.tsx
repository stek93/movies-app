import React from "react";
import { Layout, Menu } from "antd";
import { AppstoreFilled, FireFilled, NotificationFilled, HeartFilled, TrophyFilled } from '@ant-design/icons';
import styles from './side-menu.module.css';
import { Genre } from "../constants/types";
import { AppRoutePaths } from "../constants/AppRoutes";

const { Sider } = Layout;
const { SubMenu } = Menu;

interface IMenu {
    genres: Genre[];
    changeCategory: (category: string, key:string) => void;
}

export default function SideMenu({ genres, changeCategory }: IMenu) {

    const genreMenuItems = genres.map(genre => {
        return (<Menu.Item key={genre.id} title={genre.name}>{genre.name}</Menu.Item>);
    });

    return (
        <Sider className={ styles.sider }>
            <Menu className={ styles.menu } theme="dark" defaultSelectedKeys={ [ '1' ] } mode="inline" onSelect={({ item: { props: { title, eventKey: key } }}) => changeCategory(title, key)}>
                <Menu.Item key="1" title={AppRoutePaths.TrendingMovies} icon={ <FireFilled/> }>
                    { AppRoutePaths.TrendingMovies }
                </Menu.Item>
                <Menu.Item key="2" title={AppRoutePaths.TopRatedMovies} icon={ <TrophyFilled/> }>
                    { AppRoutePaths.TopRatedMovies }
                </Menu.Item>
                <Menu.Item key="3" title={AppRoutePaths.UpcomingMovies} icon={ <NotificationFilled/> }>
                    { AppRoutePaths.UpcomingMovies }
                </Menu.Item>
                <Menu.Item key="4" title={AppRoutePaths.FavouriteMovies} icon={ <HeartFilled/> }>
                    { AppRoutePaths.FavouriteMovies }
                </Menu.Item>
                <SubMenu  title={AppRoutePaths.MovieGenres} key="5" className={styles.submenu} icon={ <AppstoreFilled/> }>
                    { genreMenuItems }
                </SubMenu>
            </Menu>
        </Sider>
    );
}