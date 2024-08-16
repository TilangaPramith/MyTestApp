import { useState } from 'react';
import './App.css';
import Index from './pages/Index';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  // const [successPage, setSuccessPage] = useState(false);
  // const [userEmail, setUserEmail] = useState('');

  return (
    <Provider store={store}>
      <Index/>
      {/* {
        successPage ? (
          <Success userEmail={userEmail}/>
        ) : (
          <Subscribe 
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          setSuccessPage={setSuccessPage} />
        )
      }       */}
    </Provider>
  )
}

export default App