import { Cast } from "../constants/types";
import { Avatar, Divider, List } from "antd";
import React from "react";
import { AppRoutes } from "../constants/AppRoutes";
import InfiniteScroll from 'react-infinite-scroller';
import { UserOutlined } from '@ant-design/icons';


const API_KEY = process.env.API_KEY;
const PHOTOS_BASE_URL = AppRoutes.PhotosBaseURL;
const AVATAR_SIZE = "w185";

interface IMovieCast {
    cast: Cast[]
}

export default function MovieCast({ cast }: IMovieCast) {
    return (
        <>
            <InfiniteScroll
                useWindow={ false }
                loadMore={() => false}>
                <List
                    grid={ {
                        gutter: 16,
                        column: 4,
                    } }
                    dataSource={ cast }
                    renderItem={ actor => (
                        <List.Item>
                            <List.Item.Meta
                                style={ { color: 'white' } }
                                avatar={
                                    <Avatar icon={ <UserOutlined/> } size={ 64 } src={ `${ PHOTOS_BASE_URL }/${ AVATAR_SIZE }${ actor.profile_path }?api_key=${ API_KEY }` }/>
                                }
                                title={ <span style={ { color: 'white' } }>{ actor.name }</span> }
                                description={ <span style={ { color: 'white' } }>{ actor.character }</span> }/>
                        </List.Item>
                    ) }
                />
            </InfiniteScroll>
        </>
    );
}