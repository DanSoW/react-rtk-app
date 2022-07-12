import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchUsers } from './store/reducers/ActionCreators';
import { userSlice } from './store/reducers/UserSlice';
import PostContainer from './components/PostContainer';

function App() {
  /*const {count} = useAppSelector(state => state.userReducer);
  const {increment} = userSlice.actions;
  const dispatch = useAppDispatch();*/

  const dispatch = useAppDispatch();
  const {users, isLoading, error} = useAppSelector(state => state.userReducer);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <PostContainer />
    /*<div className="App">
      {isLoading && <h1>Loading</h1>}
      {error && <h1>{error}</h1>}
      {JSON.stringify(users, null, 2)}
    </div>*/
  );
}

export default App;
