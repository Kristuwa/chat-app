export const getActions = (extraActions, type) =>
  extraActions.map(action => action[type]);
