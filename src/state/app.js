import { StateUtils } from '../utils/state-utils';

const initialState = {
    app: {
        publicKey: '',
        privateKey: '',
        net: '',
        loading:false,
    },
};

export const { appStore, AppProvider } = StateUtils(initialState, 'app');
