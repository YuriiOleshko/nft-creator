// eslint-disable-next-line import/no-unresolved
import { StateUtils } from '../utils/state-utils';

const initialState = {
    app: {
        publicKey: '',
        privateKey: '',
    },
};

export const { appStore, AppProvider } = StateUtils(initialState, 'app');

// export const onAppMount = () => async ({ dispatch }) => {
//     document.documentElement.classList.add(`theme-${initialState.app.theme}`);
//     dispatch(initNear());
// };
