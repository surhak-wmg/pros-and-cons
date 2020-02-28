import React, { memo, useCallback, useMemo, useState } from 'react';
import { add } from '../../helpers/constants';
import { INewProsConsProps, IStyledType } from '../../helpers/types';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { plus_icon } from '../../styles/icons';
import { updateData } from '../../helpers/utils';
import { useSelector } from '../../store/createReducer';
import isEqual from 'react-fast-compare';

const NewProsCons = ({ title, type }: INewProsConsProps) => {
    const dispatch = useDispatch();
    const { data, ids } = useSelector(state => ({
        data: state.data,
        ids: state.ids,
    }), isEqual);

    const [inputValue, setInputValue] = useState<string>('');

    const addItem = useCallback(async () => {
        if (!inputValue.replace(/\s/g, '').length) {
            return;
        }

        await updateData({ data, actionType: add, userId: ids?.userId, groupId: ids?.groupId, value: inputValue, dispatch, type });
    }, [dispatch, inputValue, type, data, ids]);

    const onKeyDownAddInput = useCallback((e) => {
        if (e.keyCode === 13) {
            addItem();
        }
    }, [addItem]);

    return useMemo(() => (
        <NewStyledProsCons>
            <InputStyled
                colorType={type}
                type={'text'}
                placeholder={`New ${title}`}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={onKeyDownAddInput}
            />
            <img src={plus_icon} alt={'plus'} onClick={addItem}/>
        </NewStyledProsCons>
    ), [title, addItem, onKeyDownAddInput, type]);
};

const NewStyledProsCons = styled.div`
    margin-bottom: 20px;
    height: 80px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-top: 1px solid ${({ theme }) => theme.sectionsBorderColor};
    border-bottom: 1px solid ${({ theme }) => theme.sectionsBorderColor};
    
    
    & img {
        width: 24px;
        transform: scale(1);
        cursor: pointer;
        transition: all 0.2s;   
         
        :hover {
            transform: scale(1.2);
        }
    }
`;

const InputStyled = styled.input<IStyledType>`
    height: 30px;
    border-radius: 6px;
    border: none;
    width: 170px;
    padding-left: 10px;
    font-size: 14px;
    background-color: ${(props) => props.theme[props.colorType].itemBGColor || props.theme.pros.itemBGColor};
    color: ${({ theme }) => theme.itemColor};
    
    ::placeholder {
        color: ${({ theme }) => theme.itemColor}
    }
`;

export default memo(NewProsCons);
