import { ToastContainer } from '@/components';
import { NavigationProvider, ToastProvider } from '@/contexts';
import {
  FamilyFinancialInfoPage,
  PermitSubmissionSuccessPage,
  PersonalInformationPage,
  SituationDescriptionPage,
} from '@/pages';
import { SEO_KEYS, useSEO } from '@/utils/seo';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

function App() {
  // Set default SEO for the app
  useSEO(SEO_KEYS.app);

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
