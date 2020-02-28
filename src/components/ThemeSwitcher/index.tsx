import React, { memo, useCallback, useMemo } from 'react';
import { SET_THEME } from '../../store/actions';
import { dark, light } from '../../helpers/constants';
import { IThemeSwitcherProps } from '../../helpers/types';
import { useDispatch } from 'react-redux';
import ReactSwitch from 'react-switch';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import { light_icon, dark_icon } from '../../styles/icons';

const ThemeSwitcher = ({ theme }: IThemeSwitcherProps) => {
    const dispatch = useDispatch();

    const switchTheme = useCallback((value) => {
        dispatch({ type: SET_THEME, theme: value ? dark : light });
        Cookies.set('theme', value ? dark : light);
    }, [dispatch]);

    return useMemo(() => (
        <SwitchStyled>
            <ReactSwitch
                onChange={switchTheme}
                checked={theme === dark}
                checkedIcon={(<ThemeIcon src={light_icon} alt={dark}/>)}
                uncheckedIcon={(<ThemeIcon src={dark_icon} alt={light}/>)}
                onColor={theme === dark ? '#23743A' : '#303C44'}
                offColor={theme === dark ? '#23743A' : '#303C44'}
                onHandleColor={theme === dark ? '#dddddd' : '#dddddd'}
                offHandleColor={theme === dark ? '#dddddd' : '#dddddd'}
                activeBoxShadow={'none'}
            />
        </SwitchStyled>
    ), [switchTheme, theme]);
};

const SwitchStyled = styled.div`
    position: absolute;
    top: 2px;
    right: 2px
`;
const ThemeIcon = styled.img({
    width: 28
});

export default memo(ThemeSwitcher);
