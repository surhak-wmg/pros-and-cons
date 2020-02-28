import React, { useMemo, memo } from 'react';
import { IProsAndConsProps, IStyledType } from '../../helpers/types';
import ProsConsItem from '../ProsConsItem';
import NewProsCons from '../NewProsCons';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

const ProsAndCons = ({ dataArr, title, type }: IProsAndConsProps) => useMemo(() => (
    <ProsAndConsStyled>
        <TitleAndList>
            <TitleStyled colorType={type}>{title}</TitleStyled>
            <List>
                {dataArr?.map((elem, index) => <ProsConsItem elem={elem} index={index} key={uuid()} type={type}/>)}
            </List>
        </TitleAndList>
        <NewProsCons title={title} type={type}/>
    </ProsAndConsStyled>
), [dataArr, title, type]);

const ProsAndConsStyled = styled.div`
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    :first-child {
        border-right: 1px solid ${({ theme }) => theme.sectionsBorderColor};
    }
`;

const TitleAndList = styled.div`
    height: 100%;
`;

const TitleStyled = styled.div<IStyledType>`
    border-bottom: 1px solid ${({ theme }) => theme.sectionsBorderColor};
    padding-bottom: 10px;
    margin: 10px 0px;
    font-size: 20px;
    font-weight: bold;
    color: ${(props) => props.theme[props.colorType].color || props.theme.pros.color};
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: calc(100% - 120px);
    overflow-y: scroll;
`;

export default memo(ProsAndCons);
