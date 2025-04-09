import useAppStore from 'version-two/store';

const removeUserToken = () => {
  const invalidateUser = useAppStore.getState().removeUserNameAndToken;
  localStorage.removeItem('token');
  invalidateUser();
};

export default removeUserToken;
