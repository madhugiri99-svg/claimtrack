import { HashRouter, Route, Routes } from 'react-router';
import { AppShell } from './layout/AppShell';
import { ClaimDetailPage } from './pages/ClaimDetailPage';
import { MyClaimsPage } from './pages/MyClaimsPage';
import { OverviewPage } from './pages/OverviewPage';
import { SimplePage } from './pages/SimplePage';
import { UploadPage } from './pages/UploadPage';

// Hash routing (/claimtrack/#/claims/CLM-20481) works on GitHub Pages
// without any server configuration.
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<OverviewPage />} />
          <Route path="claims" element={<MyClaimsPage />} />
          <Route path="claims/:id" element={<ClaimDetailPage />} />
          <Route path="claims/:id/upload/:docId" element={<UploadPage />} />
          <Route
            path="documents"
            element={
              <SimplePage
                title="Documents"
                message="All your claim documents in one place. This page is outside the scope of this concept project; documents are shown on each claim instead."
              />
            }
          />
          <Route
            path="help"
            element={
              <SimplePage
                title="Help"
                message="This page is outside the scope of this concept project. For questions about a claim, contact your adjuster from the claim page."
              />
            }
          />
          <Route
            path="*"
            element={<SimplePage title="Page not found" message="We couldn’t find that page." />}
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
