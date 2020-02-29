import React, { useMemo, memo, useEffect, useCallback } from 'react';
import ProsAndCons from './components/ProsAndCons';
import Loading from './components/Loading';
import ThemeSwitcher from './components/ThemeSwitcher';
import { apiDataUrl, apiGroup, apiUser, light, titles } from 'helpers/constants';
import { SET_DATA, SET_IDS, SET_IS_LOADING } from 'store/actions';
import { darkTheme, lightTheme } from './styles/themes';
import { useDispatch } from 'react-redux';
import { useSelector } from 'store/createReducer';
import styled, { ThemeProvider } from 'styled-components';
import { v4 as uuid } from 'uuid';
import { app_bg } from './styles/icons';

function App() {
    const dispatch = useDispatch();

    const { data, isLoading, theme } = useSelector((state) => ({
        data: state.data,
        isLoading: state.isLoading,
        theme: state.theme,
    }));

    const getProsAndCons = useCallback(async (groupId, userId) => {
        const fetchProsAndCons = await fetch(`${apiDataUrl}/${groupId}/user/${userId}`);
        const { pros, cons } = await fetchProsAndCons.json();

        dispatch({ type: SET_IDS, ids: { groupId, userId } });
        dispatch({ type: SET_DATA, data: { pros, cons } });
    }, [dispatch]);

    const getIds = useCallback(async () => {
        try {
            const fetchGroupId = await fetch(apiGroup);
            const { groupId } = await fetchGroupId.json();
            const fetchUserId = await fetch(apiUser);
            const { userId } = await fetchUserId.json();

            await getProsAndCons(groupId, userId);
        } catch (err) {
            // handle error
            console.log(err.message);

            dispatch({ type: SET_IS_LOADING, isLoading: false });
        }
    }, [dispatch, getProsAndCons]);

    useEffect(() => {
        getIds();
    }, [getIds]);

    return useMemo(() => (
        <ThemeProvider theme={theme === light ? lightTheme : darkTheme}>
            <AppStyled>
                <MainStyled>
                    {isLoading ? <Loading/> : (
                        <>
                            {Object.keys(data).map((elem) => <ProsAndCons key={uuid()} dataArr={data[elem]} title={titles[elem]} type={elem}/>)}
                            <ThemeSwitcher theme={theme}/>
                        </>
                    )}
                </MainStyled>
            </AppStyled>
        </ThemeProvider>
    ), [theme, isLoading, data]);
}

const AppStyled = styled.div`
    width: 100vw;
    height: 100vh;
    background: url(${app_bg});
    background-repeat: no-repeat;
    background-size: 100vw 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MainStyled = styled.div`
    width: calc(100vw / 1.5);
    height: calc(100vh / 1.2);
    background-color: ${({ theme }) => theme.mainBackgroundColor};
    border-radius: 12px;
    display: flex;
    justify-content: space-evenly;
    position: relative;
    transition: all 0.2s
`;

export default memo(App);
