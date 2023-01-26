import React, {useState} from 'react';
import axiosInstance from '../axios';
import {useNavigate} from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import apiSettings from "../api/api";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
const CreateMyModel = () => {

    const [data, setData] = useState({
        email: "",
        first_name: "",
        last_name: "",
        birth_date: "",
        avatar: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        first_name: "",
        last_name: "",
        birth_date: "",
        avatar: "",
        password: "",
    });


    const handleChange = ({currentTarget: input}) => {
        let newData = {...data};
        newData[input.name] = input.value;
        setData(newData);
    };

    const onChangeAge = (e) => {
        const currentYear = new Date().getFullYear();
        const year = e.target.value.split('-')[0];
        const age = currentYear - year;
        if (age < 18) setErrors({
            'birth_date': 'Лицам младше 18 лет запрещено использовать портал'
        });
    }

    const handleImageChange = (e) => {
        let newData = {...data};
        newData["avatar"] = e.target.files[0];
        setData(newData);
    };

    const doSubmit = async (e) => {
        e.preventDefault();
        const response = await apiSettings.createListing(data);
        if (response.status === 400) {
            setErrors(response.data);
        }
    };

    const classes = useStyles();

    return (
        // password: "",
        <Container component="main" className="mt-5" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}></Avatar>
                <Typography component="h1" variant="h5">
                    Зарегистрироваться
                </Typography>
                <Form>
                    <Row>
                        <Form.Group className="mb-3" controlId="emailInput">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                value={data.email}
                                isInvalid={errors.email}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                                maxLength={80}
                            />
                            {errors.email && (
                                <Form.Text className="alert-danger" tooltip>
                                    {errors.email}
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-3" controlId="first_nameInput">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                type="text"
                                name="first_name"
                                value={data.first_name}
                                isInvalid={errors.first_name}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                                maxLength={80}
                            />
                            {errors.first_name && (
                                <Form.Text className="alert-danger" tooltip>
                                    {errors.first_name}
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-3" controlId="last_nameInput">
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control
                                type="text"
                                name="last_name"
                                value={data.last_name}
                                isInvalid={errors.last_name}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                                maxLength={80}
                            />
                            {errors.last_name && (
                                <Form.Text className="alert-danger" tooltip>
                                    {errors.last_name}
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-3" controlId="birth_dateInput">
                            <Form.Label>Дата рождения</Form.Label>
                            <Form.Control
                                type="date"
                                name="birth_date"
                                value={data.birth_date}
                                isInvalid={errors.birth_date}
                                onChange={(e) => {
                                    onChangeAge(e);
                                    handleChange(e);
                                }}
                                maxLength={80}
                            />
                            {errors.birth_date && (
                                <Form.Text className="alert-danger" tooltip>
                                    {errors.birth_date}
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Аватар</Form.Label>
                            <Form.Control
                                type="file"
                                name="avatar"
                                accept="image/jpeg,image/png,image/gif"
                                onChange={(e) => {
                                    handleImageChange(e);
                                }}
                            />
                            {errors.avatar && (
                                <Form.Text className="alert-danger" tooltip>
                                    {errors.avatar}
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3" controlId="passwordInput">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={data.password}
                            isInvalid={errors.password}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                        />
                        {errors.password && (
                            <Form.Text className="alert-danger" tooltip>
                                {errors.password}
                            </Form.Text>
                        )}
                    </Form.Group>
                    <button className="btn btn-primary"
                            type="submit"
                            onClick={(e) => doSubmit(e)}>Отправить
                    </button>

                </Form>
            </div>
        </Container>
    );
};

export default CreateMyModel;