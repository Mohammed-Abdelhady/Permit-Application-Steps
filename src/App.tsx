import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { PermitLayout } from './layouts';
import {
  PersonalInformationPage,
  FamilyFinancialInfoPage,
  SituationDescriptionPage,
} from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/permit/personal" replace />} />
        <Route path="/permit" element={<PermitLayout />}>
          <Route index element={<Navigate to="/permit/personal" replace />} />
          <Route path="personal" element={<PersonalInformationPage />} />
          <Route
            path="family-financial"
            element={<FamilyFinancialInfoPage />}
          />
          <Route path="situation" element={<SituationDescriptionPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
