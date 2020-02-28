import { ITitles } from './types';

// url's
const apiBaseUrl = 'https://avetiq-test.firebaseapp.com';
export const apiDataUrl = `${apiBaseUrl}/proscons/group`;
export const apiGroup = `${apiBaseUrl}/group/suren_hakobyan`;
export const apiUser = `${apiBaseUrl}/user/suren_hakobyan`;

// titles
export const titles: ITitles = {
    pros: "Pro's",
    cons: "Con's",
};

// theme
export const dark = 'dark';
export const light = 'light';

// action types
export const add = 'add';
export const remove = 'remove';
