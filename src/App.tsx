import RouterComponent from '@/config/router';
import {BrowserRouter as Router} from 'react-router-dom';
import {AuthProvider} from '@/context/authContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <RouterComponent />
      </AuthProvider>
    </Router>
  );
}

export default App;
