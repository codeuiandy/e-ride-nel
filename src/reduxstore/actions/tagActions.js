import axios from 'axios';
import * as types from '../types';
import { config } from '../../config/keys';
import { returnErrors } from './errorActions';
import {userTokenConfig} from '../../helper';

export const getTags = () => (dispatch, getState) => {
	if (!navigator.onLine) {
		return;
	}
	dispatch(setTagsLoading());
	axios.get(`${config.stagingBaseUrl}/tags`, userTokenConfig(getState))
		.then(res => dispatch({
			type: types.GET_TAGS,
			payload: res.data.status === "success" ? res.data?.data : {}
		}))
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}


export const setTagsLoading = () => {
	return {
		type: types.TAGS_LOADING
	}
}