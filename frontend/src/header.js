import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';
import {NavLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    toolbarTitle: {
        flexGrow: 1,
    },
}));

function Header() {
    const classes = useStyles();
    let token = localStorage.getItem('access_token')
    if (token === '' || !token) {
        return (
            <React.Fragment>
                <CssBaseline/>
                <AppBar
                    position="static"
                    color="default"
                    elevation={0}
                    className={classes.appBar}
                >
                    <Toolbar className={classes.toolbar}>
                        <Typography
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={classes.toolbarTitle}
                        >
                            <Link
                                component={NavLink}
                                to="/"
                                underline="none"
                                color="textPrimary"
                            >
                                Web Studio
                            </Link>
                        </Typography>
                        <Button
                            href="#"
                            color="primary"
                            variant="outlined"
                            className={classes.link}
                            component={NavLink}
                            to="/create/anonym/order"
                        >
                            Создать заказ
                        </Button>

                        <nav>
                            <Link
                                color="textPrimary"
                                href="#"
                                className={classes.link}
                                component={NavLink}
                                to="/register"
                            >
                                 Регистрация
                            </Link>
                        </nav>
                        <Button
                            href="#"
                            color="primary"
                            variant="outlined"
                            className={classes.link}
                            component={NavLink}
                            to="/login"
                        >
                            Войти
                        </Button>
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        );
    }else{
        return (
    <React.Fragment>
        <CssBaseline/>
        <AppBar
            position="static"
            color="default"
            elevation={0}
            className={classes.appBar}
        >
            <Toolbar className={classes.toolbar}>
                <Typography
                    variant="h6"
                    color="inherit"
                    noWrap
                    className={classes.toolbarTitle}
                >
                    <Link
                        component={NavLink}
                        to="/"
                        underline="none"
                        color="textPrimary"
                    >
                        Web Studio
                    </Link>
                </Typography>
                <Button
                    href="#"
                    color="primary"
                    variant="outlined"
                    className={classes.link}
                    component={NavLink}
                    to="/create/order"
                >
                    Создать заказ
                </Button>
                <Button
                    href="#"
                    color="primary"
                    variant="outlined"
                    className={classes.link}
                    component={NavLink}
                    to="/orders/"
                >
                    Мои заказы
                </Button>


                <Button
                    href="#"
                    color="primary"
                    variant="outlined"
                    className={classes.link}
                    component={NavLink}
                    to="/logout"
                >
                    Выйти
                </Button>
            </Toolbar>
        </AppBar>
    </React.Fragment>
);

}}


export default Header;