import { createAction } from '@reduxjs/toolkit';
import { ApiCall } from '../../types/api-call.interface';

export const apiCall = createAction<ApiCall>('apiCall');