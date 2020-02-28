import { Dispatch } from 'react';

export interface IActions {
    type: string;
    ids: IIDS;
    data: IData;
    isLoading: boolean;
    theme: string;
    newData: IData;
}

export interface IReducers {
    ids: IIDS | null;
    data: IData;
    isLoading: boolean;
    theme: string;
}

export interface IProsAndConsProps {
    dataArr: string[] | null;
    title: string;
    type: string
}

export interface IProsConsItem {
    elem: string;
    type: string;
    index: number;
}

export interface INewProsConsProps {
    title: string;
    type: string;
}

export interface IThemeSwitcherProps {
    theme: string;
}

export type ITitles = {
    [key: string]: string
}

export type IData =  {
    [key: string]: string[] | null
}

interface IIDS {
    groupId: number;
    userId: number;
}

export interface IUpdateData {
    data: IData,
    type: string,
    groupId: number | undefined,
    userId: number | undefined,
    dispatch: Dispatch<any>,
    actionType: string,
    index?: number,
    value?: string
}

export interface IPutData {
    userId: number | undefined;
    groupId: number | undefined;
    oldData: IData;
    newData: IData;
    dispatch: Dispatch<any>
}

export interface IStyledType {
    colorType: string;
}
