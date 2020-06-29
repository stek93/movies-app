import { Formik, FormikHelpers } from "formik";
import { AppProps, ILogin, SessionToken } from "../constants/types";
import AuthService from "../services/AuthService";
import React from "react";
import { useRouter } from "next/router";
import { getFavouriteMovies } from "../services/api";
import { useUserState } from "../services/UserContext";
import { Form, Input, SubmitButton } from 'formik-antd'


const DEFAULT_VALUES: ILogin = {
    username: "",
    password: ""
}

export default function Login() {
    const router = useRouter();
    const [state, dispatch] = useUserState()

    return (
        <Formik
            initialValues={DEFAULT_VALUES}
            onSubmit={({ username, password }: ILogin, { setSubmitting }: FormikHelpers<ILogin>) => {
                AuthService.login(username, password).then((response: SessionToken) => {
                    if (response.success) {
                        AuthService.saveSessionID(response.session_id);
                        getFavouriteMovies(response.session_id).then(({ movies }: AppProps) => {
                            dispatch({ type: 'setFavouriteMovies', payload: { favouriteMovies: movies } })
                            router.push("/");
                        }).catch(error => console.log('ss'))
                    }
                }).catch(error => {
                    console.log(error);
                })
            }}>
            <Form>
                <Input name="username" placeholder="Username" />
                <Input.Password name="password" placeholder="Password" />
                <SubmitButton>LogIn</SubmitButton>
            </Form>
        </Formik>
    );
}