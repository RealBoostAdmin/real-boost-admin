import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Menu from '../../components/Menu/LeftMenu/Menu';
import TopMenu from '../../components/Menu/TopMenu/TopMenu';
import {Container, CssBaseline, Drawer} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Login from '../Auth/Login';
import CheckAuth from './CheckAuth';
import Logged from './Logged/Logged';
import Register from '../Auth/Register';
import ResetPassword from '../Auth/ResetPassword';
import RequestResetPassword from '../Auth/RequestResetPassword';
import NotLogged from './Logged/NotLogged';
import LanguagePage from '../Language/LanguagePage';
import TranslationPage from '../Translation/TranslationPage';
import CountryPage from '../Country/CountryPage';
import GamePage from '../Game/Pages/GamePage';
import GameTranslationPage from '../Game/Pages/GameTranslationPage';
import QuestionPage from '../Question/Pages/QuestionPage';
import QuestionTranslationPage from '../Question/Pages/QuestionTranslationPage';
import OptionPage from '../Option/Pages/OptionPage';
import OptionTranslationPage from '../Option/Pages/OptionTranslationPage';
import OptionItemTranslationPage from '../Option/Pages/OptionItemTranslationPage';
import ExtraPage from '../Extra/Pages/ExtraPage';
import ExtraTranslationPage from '../Extra/Pages/ExtraTranslationPage';
import ProductPage from '../Product/Pages/ProductPage';
import ProductTranslationPage from '../Product/Pages/ProductTranslationPage';
import UserPage from '../User/Pages/UserPage';
import UserDetailsPage from "../User/Pages/UserDetailsPage";
import ProfileTranslationPage from "../User/Pages/ProfileTranslationPage";
import MissionPage from "../Mission/Pages/MissionPage";
import MissionDetailsPage from "../Mission/Pages/MissionDetailsPage";
import DiscountPage from '../Discount/Page/DiscountPage';
import OrderPage from '../Order/Pages/OrderPage';
import OrderDetailsPage from '../Order/Pages/OrderDetailsPage';

const theme = createTheme({
    typography: {
        fontFamily: [
            'Roboto',
            'Arial',
            'sans-serif'
        ].join(','),
        fontSize: 16,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: '#000',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#2F2F2F',
                    },
                },
                contained: {
                    backgroundColor: '#2F2F2F',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#000',
                    },
                },
                containedPrimary: {
                    backgroundColor: '#A1E89B',
                    '&:hover': {
                        backgroundColor: '#70cc68',
                    },
                },
                containedSecondary: {
                    backgroundColor: '#f36666',
                    '&:hover': {
                        backgroundColor: '#f53737',
                    },
                },
            }
        },
    },
    palette: {
        primary: {
            main: '#2F2F2F',
        },
        secondary: {
            main: '#fff',
        },
        success: {
            light: '#A1E89B',
            main: '#70cc68'
        },
        warning: {
            light: '#f36666',
            main: '#f53737'
        },
        info: {
            main: '#f9f9f9'
        }
    },
});

const useStyles = makeStyles(() => ({
        root: {
            display: 'flex'
        },
        drawerPaper: {
            display: 'block',
            position: 'sticky',
            whiteSpace: 'nowrap',
            height: '100%',
            width: 240,
            /*            paddingTop: theme.spacing(4),
                        paddingBottom: theme.spacing(4),
                        background: theme.palette.primary.main,
                        color: theme.palette.secondary.light,*/
            paddingTop: '8px',
            paddingBottom: '8px',
            background: '#2F2F2F',
            color: '#fff',
        },
        content: {
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            paddingTop: '4rem',
            backgroundColor: '#f9f9f9',
            width: `calc(100% - 240px) !important`,
            marginLeft: 240,
            //backgroundColor: theme.palette.primary.main
        },
        container: {
            padding: '3rem 0',
            /*            paddingTop: theme.spacing(4),
                        paddingBottom: theme.spacing(4),*/
        },
    })
);


const App = () => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <TopMenu/>
            <div className={classes.root}>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <Menu/>
                </Drawer>
                <main className={classes.content}>
                    <Container maxWidth="lg" className={classes.container}>
                        <CheckAuth>
                            <Routes>
                                {/* Not logged or Logged routes */}
                                <Route path='request-password' element={<RequestResetPassword/>}/>
                                <Route path='reset-password' element={<ResetPassword/>}/>
                                {/* Not Logged routes */}
                                <Route path='' element={<NotLogged/>}>
                                    <Route path='login' element={<Login/>}/>
                                    <Route path='register' element={<Register/>}/>
                                </Route>
                                {/* Logged routes */}
                                <Route path='admin' element={<Logged/>}>

                                    <Route path="games" element={<GamePage/>}/>
                                    <Route path="game/:gameName" element={<GameTranslationPage/>}/>

                                    <Route path="products" element={<ProductPage/>}/>
                                    <Route path="product/:productName" element={<ProductTranslationPage/>}/>

                                    <Route path="questions" element={<QuestionPage/>}/>
                                    <Route path="question/:questionId" element={<QuestionTranslationPage/>}/>

                                    <Route path="options" element={<OptionPage/>}/>
                                    <Route path="option/:optionId" element={<OptionTranslationPage/>}/>
                                    <Route path="option/:optionId/item/:optionItemId"
                                           element={<OptionItemTranslationPage/>}/>

                                    <Route path="extras" element={<ExtraPage/>}/>
                                    <Route path="extra/:extraId" element={<ExtraTranslationPage/>}/>

                                    <Route path="discounts" element={<DiscountPage/>}/>

                                    <Route path="orders" element={<OrderPage/>}/>
                                    <Route path="order/:code" element={<OrderDetailsPage/>}/>

                                    <Route path="missions" element={<MissionPage/>}/>
                                    <Route path="mission/:code" element={<MissionDetailsPage/>}/>

                                    <Route path="languages" element={<LanguagePage/>}/>
                                    <Route path="translations" element={<TranslationPage/>}/>
                                    <Route path="countries" element={<CountryPage/>}/>

                                    <Route path="users" element={<UserPage/>}/>
                                    <Route path="user/:userId" element={<UserDetailsPage/>}/>
                                    <Route path="user/:userId/profile" element={<ProfileTranslationPage/>}/>

                                </Route>
                            </Routes>
                        </CheckAuth>
                    </Container>
                    <ToastContainer position={toast.POSITION.TOP_RIGHT}/>
                </main>
            </div>
        </ThemeProvider>
    );
}

export default App;


