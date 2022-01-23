import React, {useEffect} from 'react';
import {makeStyles} from '@mui/styles';
import {AppBar, Toolbar, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../../../core/store/auth/auth.actions';
import {IsAuthenticated} from '../../../../core/store/auth/auth.selector';
import {Translations, TranslationSelected} from 'core/store/translation/translation.selector';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import {signOut} from '../../../../core/service/auth/auth.service';
import {getTranslations} from '../../../../core/service/translation/translation.service';
import {TranslationModel} from '../../../../core/models/translation/translation.model';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Link} from 'react-router-dom';
import {
    getTranslationsState,
    patchTranslationSelectedState,
} from '../../../../core/store/translation/translation.actions';
import {toast} from 'react-toastify';

const useStyles = makeStyles(() => ({
        appBar: {
            width: `calc(100% - 240px) !important`,
            marginLeft: 240,
        },
        flexAlign: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        boxAlign: {
            display: 'flex',
            flexDirection: 'row'
        },
        buttonIcon: {
            backgroundColor: '#2F2F2F !important',
            color: '#fff',
            '&:hover': {
                'opacity': '0.8'
            }
        }
    })
);

const TopMenu: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(IsAuthenticated);
    const translationSelected = useSelector(TranslationSelected);
    const translations = useSelector(Translations);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        const fetchTranslations = async () => {
            try {
                const {data, error} = await getTranslations();
                if (!error) {
                    dispatch(getTranslationsState({translations: data}))
                    dispatch(patchTranslationSelectedState({translationSelected: data.length !== 0 && !translationSelected ? data[0] : translationSelected}));
                } else {
                    toast.error('load of translations in menu has failed')
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchTranslations();
    }, [dispatch, translationSelected]);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = async () => {
        const {error} = await signOut();
        error ? console.log('error signout') : dispatch(logout());
    }

    return (
        <AppBar
            position="fixed"
            className={classes.appBar}
            elevation={0}
            color="primary"
        >
            <Toolbar className={classes.flexAlign}>
                <Typography>RealBoost</Typography>
                <Box className={classes.boxAlign}>
                    {isAuthenticated && (
                        <>
                            {translations && translations.length !== 0 && translationSelected &&
                            <>
                                <Button
                                    sx={{backgroundColor: '#fff', margin: '0.75rem'}}
                                    id="fade-button"
                                    aria-controls="fade-menu"
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    className={classes.buttonIcon}
                                >
                                    <span>{translationSelected?.code}</span>
                                </Button>
                                <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'fade-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    {translations.length !== 0 && translations.map((translation: TranslationModel) =>
                                        <MenuItem
                                            key={translation.code}
                                            onClick={(): void => {
                                                dispatch(patchTranslationSelectedState({translationSelected: translation}))
                                                setAnchorEl(null);
                                            }}
                                        >
                                            {translation.code}
                                        </MenuItem>
                                    )}
                                </Menu>
                            </>
                            }
                            <Button
                                variant="contained"
                                color="info"
                                onClick={() => logOut()}
                            >
                                <LogoutIcon/>
                            </Button>
                        </>
                    )}
                    {!isAuthenticated && (
                        <div>
                            <Button
                                sx={{backgroundColor: '#fff', margin: '0.75rem'}}
                                id="fade-button"
                                aria-controls="fade-menu"
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                className={classes.buttonIcon}
                            >
                                <AccountCircleIcon/>
                            </Button>
                            <Menu
                                id="fade-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'fade-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem><Link to='/login'>Login</Link></MenuItem>
                                <MenuItem><Link to='/request-password'>Forget password ?</Link></MenuItem>
                            </Menu>
                        </div>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default TopMenu;
