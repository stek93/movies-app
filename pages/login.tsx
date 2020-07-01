import { Formik, FormikHelpers } from "formik";
import { AppProps, ILogin, SessionToken } from "../constants/types";
import AuthService from "../services/AuthService";
import React from "react";
import { useRouter } from "next/router";
import { getFavouriteMovies } from "../services/api";
import { useUserState } from "../services/UserContext";
import { Form, Input, SubmitButton } from 'formik-antd'
import { Col, message, Row } from "antd";
import styles from "../styles/login.module.css";


const DEFAULT_VALUES: ILogin = {
    username: "",
    password: ""
}

export default function Login() {
    const router = useRouter();
    const [state, dispatch] = useUserState();

    return (
        <Formik
            initialValues={DEFAULT_VALUES}
            onSubmit={({ username, password }: ILogin, { setSubmitting, resetForm }: FormikHelpers<ILogin>) => {
                AuthService.login(username, password).then((response: SessionToken) => {
                    if (response.success) {
                        AuthService.saveSessionID(response.session_id);
                        getFavouriteMovies().then(({ moviesResponse }: AppProps) => {
                            dispatch({ type: 'setFavouriteMovies', payload: { favouriteMovies: moviesResponse.results } })
                            router.replace("/");
                        }).catch(error => {
                            resetForm({ values: DEFAULT_VALUES });
                            console.log(error)
                        })
                    } else {
                        resetForm({ values: DEFAULT_VALUES })
                        message.error('Login failed: wrong username or password');
                    }
                }).catch(_ => {
                    resetForm({ values: DEFAULT_VALUES })
                    message.error('Login failed: wrong username or password');
                })
            }}>
            <Row align="middle" className={styles.loginRow}>
                <Col span={4} offset={10}>
                    <Form>
                        <Input size="large" name="username" placeholder="Username" />
                        <Input.Password size="large" name="password" placeholder="Password" />
                        <SubmitButton size="large" className={styles.loginBtn}>Login</SubmitButton>
                    </Form>
                </Col>
            </Row>
        </Formik>
    );
}