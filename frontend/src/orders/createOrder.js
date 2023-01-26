import React, {useState} from 'react';
import axiosInstance from '../axios';
import {useNavigate} from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import apiOrderSettings from "./axiosForOrder";

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
const CreateOrder = () => {

    const [data, setData] = useState({
        name: "",
        technical_task: "",
        files: "",
        slug: "",
    });
    const [errors, setErrors] = useState({
        name: "",
        technical_task: "",
        files: "",
        slug: "",
    });


    const handleChange = ({currentTarget: input}) => {
        let newData = {...data};
        newData[input.name] = input.value;
        setData(newData);
    };


    const handleImageChange = (e) => {
        let newData = {...data};
        newData["files"] = e.target.files[0];
        setData(newData);
    };

    const doSubmit = async (e) => {
        e.preventDefault();
        const response = await apiOrderSettings.createListing(data);
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
                <Typography component="h1" variant="h5">
                    Создать заказ
                </Typography>
                <Form>
                    <Row>
                        <Form.Group className="mb-3" controlId="technical_taskInput">
                            <Form.Label>Техническое задание</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="technical_task"
                                value={data.technical_task}
                                isInvalid={errors.technical_task}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                                maxLength={80}
                            />
                            {errors.technical_task && (
                                <Form.Text className="alert-danger" tooltip>
                                    {errors.technical_task}
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group controlId="filesFile" className="mb-3">
                            <Form.Label>Файлы</Form.Label>
                            <Form.Control
                                type="file"
                                name="files"
                                onChange={(e) => {
                                    handleImageChange(e);
                                }}
                            />
                            {errors.files && (
                                <Form.Text className="alert-danger" tooltip>
                                    {errors.files}
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Row>
                    <button className="btn btn-primary"
                            type="submit"
                            onClick={(e) => doSubmit(e)}>Отправить
                    </button>

                </Form>
            </div>
        </Container>
    );
};

export default CreateOrder;

