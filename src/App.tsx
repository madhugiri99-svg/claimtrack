import { useClaims, useSummary } from './api/queries';
import { Alert } from './components/Alert/Alert';
import { ClaimCard } from './components/ClaimCard/ClaimCard';

// Temporary page that proves the app is talking to the API.
// Replaced by the real screens in the next pull request.
function App() {
  const summary = useSummary();
  const claims = useClaims({ sort: 'newest' });

  return (
    <main style={{ maxWidth: 375, margin: '0 auto', padding: 16, display: 'grid', gap: 16 }}>
      <h1>{summary.data ? `Hi, ${summary.data.firstName}` : 'ClaimTrack'}</h1>
      {claims.isPending && <p>Loading your claims…</p>}
      {claims.isError && (
        <Alert type="error" title="We couldn’t load your claims" announce>
          {claims.error.message}
        </Alert>
      )}
      {claims.data?.map((c) => (
        <ClaimCard
          key={c.id}
          claimId={c.id}
          type={c.type === 'auto' ? 'Auto' : 'Home'}
          title={c.title}
          meta={`Adjuster: ${c.adjusterName}`}
          nextStep={c.nextStep}
          status={c.status}
          href="#"
        />
      ))}
    </main>
  );
}

export default App;
