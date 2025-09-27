import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { NavigationProvider, ToastProvider } from './contexts';
import { ToastContainer } from './components';
import {
  PersonalInformationPage,
  FamilyFinancialInfoPage,
  SituationDescriptionPage,
  PermitSubmissionSuccessPage,
} from './pages';

function App() {
  return (
    <ToastProvider>
      <NavigationProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/permit/personal" replace />}
            />
            <Route path="/permit">
              <Route
                index
                element={<Navigate to="/permit/personal" replace />}
              />
              <Route path="personal" element={<PersonalInformationPage />} />
              <Route
                path="family-financial"
                element={<FamilyFinancialInfoPage />}
              />
              <Route path="situation" element={<SituationDescriptionPage />} />
              <Route
                path="success/:applicationId"
                element={<PermitSubmissionSuccessPage />}
              />
            </Route>
          </Routes>
          <ToastContainer />
        </Router>
      </NavigationProvider>
    </ToastProvider>
  );
}

export default App;
