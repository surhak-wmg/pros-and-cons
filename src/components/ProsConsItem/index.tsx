import React, { memo, useCallback, useMemo } from 'react';
import { IProsConsItem, IStyledType } from '../../helpers/types';
import { remove } from '../../helpers/constants';
import { useDispatch } from 'react-redux';
import { updateData } from '../../helpers/utils';
import { useSelector } from '../../store/createReducer';
import isEqual from 'react-fast-compare';
import styled from 'styled-components';
import { minus_icon } from '../../styles/icons';

const ProsConsItem = ({ elem, type, index }: IProsConsItem) => {
    const dispatch = useDispatch();

    const { data, ids } = useSelector(state => ({
        data: state.data,
        ids: state.ids,
    }), isEqual);

    const removeItem = useCallback(async () => {
        await updateData({ data, type, groupId: ids?.groupId, userId: ids?.userId, dispatch, index, actionType: remove });
    }, [dispatch, type, index, data, ids]);

    return useMemo(() => (
        <ProsAndConsItem colorType={type}>
            <div>{elem}</div>
            <img src={minus_icon} alt={'minus'} onClick={removeItem}/>
        </ProsAndConsItem>
    ), [elem, removeItem, type]);
};

const ProsAndConsItem = styled.div<IStyledType>`
    display: flex;
    justify-content: space-between;
    width: 70%;
    margin-top: 6px;
    height: 22px;
    background-color: ${(props) => props.theme[props.colorType].itemBGColor || props.theme.pros.itemBGColor};
    border-radius: 6px;
    padding: 6px;
    
    & div {
        color: ${({ theme }) => theme.itemColor};
    }
    
    & img {
        width: 20px;
        transform: scale(1);
        cursor: pointer;
        transition: all 0.2s;   
         
        :hover {
            transform: scale(1.2);
        }
    }
`;

export default memo(ProsConsItem);
