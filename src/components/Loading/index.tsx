import React, { useMemo, memo } from 'react';
import styled from 'styled-components';
import { loading_icon } from '../../styles/icons';

const Loading = () => {
    return useMemo(() => (
        <LoadingStyled>
            <img src={loading_icon} alt={'loading'} draggable={false}/>
        </LoadingStyled>
    ), []);
};

const LoadingStyled = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
    & img {
        width: 150px
    }
`;
export default memo(Loading);
