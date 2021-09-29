import axios from 'axios';
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';
import {userTokenConfig} from '../../helper';
import store from '../store';
import {NotificationManager} from 'react-notifications';

const {getState} = store;


export const getCategories = () => (dispatch, getState) => {
	if (!navigator.onLine) {
		return;
	}
	dispatch(setCategoriesLoading());
	axios.get(`${config.stagingBaseUrl}/categories?per_page=50`, userTokenConfig(getState))
		.then(res => dispatch({
			type: types.GET_CATEGORIES,
			payload: res.data && res.data.status === "success" ? res.data.data : {}
		}))
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const addCategory = (newCategory) => (dispatch, getState) => {

	//Request body
	const body = JSON.stringify(newCategory);

	axios.post(`${config.stagingBaseUrl}/categories`, body, userTokenConfig(getState))
		.then(res => dispatch({
			type: types.ADD_CATEGORY,
			payload: res.data
		}))
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

}

// invalid redux action
export const getSubCategory = async (categoryId) => {

	try {
        const res = await axios.get(`${config.stagingBaseUrl}/sub-categories/${categoryId}`, userTokenConfig(getState));
        return res.data;
    } catch (err) {
        NotificationManager.error(err?.response?.data.message, 'Error');
        return err?.response?.data;
    }
}


export const setCategoriesLoading = () => {
	return {
		type: types.CATEGORIES_LOADING
	}
}