export const DRAFTS_ROUTE = '/drafts';
export const LOADER_ROUTE = '/loader';

export const COMPUTATION_SIGNAL_ROUTE = '/computation-signals';
export const COMPUTATION_SIGNAL_ROUTE_WITH_ID = `${COMPUTATION_SIGNAL_ROUTE}/:id?`;

export const ENTER_ROUTE = '/enter';
export const REGISTRATION_ROUTE = '/registration';

export const DEFAULT_ROUTE = DRAFTS_ROUTE;
export const UNPROTECTED_ROUTES = [REGISTRATION_ROUTE, ENTER_ROUTE, LOADER_ROUTE];

export const CURRENT_PATH = 0;
export const PREVIOUS_PATH = -1;
