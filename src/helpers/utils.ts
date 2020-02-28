import { add, apiDataUrl, remove } from './constants';
import { IPutData, IUpdateData } from './types';
import { cloneDeep } from 'lodash';
import { UPDATE_DATA } from '../store/actions';

const putData = async ({ userId, groupId, newData, dispatch, oldData }: IPutData) => {
    try {
        await fetch(`${apiDataUrl}/${groupId}/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(newData),
        });
    } catch (err) {
        // handle error
        console.log(err.message);

        dispatch({ type: UPDATE_DATA, newData: oldData });
    }
};

export const updateData = async ({ data, type, actionType, dispatch, groupId, index, userId, value }: IUpdateData) => {
    const dataArr = cloneDeep(data[type]) || [];

    if (actionType === remove && index) {
        dataArr?.splice(index, 1);
    }

    if (actionType === add && value) {
        dataArr?.push(value);
    }

    const currentObj = { [type]: dataArr };

    const newData = {
        pros: data.pros,
        cons: data.cons,
        ...currentObj,
    };


    dispatch({ type: UPDATE_DATA, newData });
    await putData({ userId, groupId, newData, dispatch, oldData: data });
};
