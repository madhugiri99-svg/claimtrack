import { useEffect, useId, useRef, useState, type DragEvent } from 'react';
import { Link, useParams } from 'react-router';
import { useClaim, useUploadDocument } from '../api/queries';
import { Alert } from '../components/Alert/Alert';
import { Button } from '../components/Button/Button';
import { buttonClassName } from '../components/Button/buttonClassName';
import { DocumentRow } from '../components/DocumentRow/DocumentRow';
import { Icon } from '../components/Icon/Icon';
import { Skeleton } from '../components/Skeleton/Skeleton';
import { usePageTitle } from '../layout/usePageTitle';
import { formatDate } from '../utils/format';
import page from './Page.module.css';
import styles from './UploadPage.module.css';

const ACCEPT = ['application/pdf', 'image/jpeg', 'image/png'];
const MAX_BYTES = 10 * 1024 * 1024;

function validate(file: File): string | null {
  if (!ACCEPT.includes(file.type)) return 'Files must be PDF, JPG or PNG.';
  if (file.size > MAX_BYTES) return 'Files must be 10 MB or smaller.';
  return null;
}

const formatSize = (bytes: number) =>
  bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.ceil(bytes / 1024)} KB`;

export function UploadPage() {
  const { id = '', docId = '' } = useParams();
  const claim = useClaim(id);
  const upload = useUploadDocument(id);
  const doc = claim.data?.documents.find((d) => d.id === docId);
  const docName = doc?.name.toLowerCase() ?? 'document';

  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputId = useId();
  const hintId = useId();
  const errorId = useId();
  const successHeading = useRef<HTMLHeadingElement>(null);

  const headingRef = usePageTitle(`Upload ${docName}`, claim.isSuccess);

  // After a successful upload, move focus to the confirmation heading.
  useEffect(() => {
    if (upload.isSuccess) successHeading.current?.focus();
  }, [upload.isSuccess]);

  const pick = (picked: File | undefined) => {
    upload.reset();
    if (!picked) return;
    const error = validate(picked);
    setFileError(error);
    setFile(error ? null : picked);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    pick(e.dataTransfer.files[0]);
  };

  const backTo = `/claims/${id}`;
  const back = (
    <Link to={backTo} className={page.backLink}>
      <Icon name="chevron-left" size={20} />
      Claim {id}
    </Link>
  );

  if (claim.isPending) {
    return (
      <div className={`${page.page} ${styles.column}`} aria-busy="true">
        <p className="visually-hidden" role="status">
          Loading…
        </p>
        <Skeleton width={140} height={20} />
        <Skeleton width="70%" height={32} />
        <Skeleton height={240} radius="var(--radius-lg)" />
      </div>
    );
  }

  if (claim.isError || !doc) {
    return (
      <div className={`${page.page} ${styles.column}`}>
        {back}
        <Alert type="error" title="We couldn’t find this document request">
          {claim.isError ? claim.error.message : 'It may have been completed already.'}
        </Alert>
      </div>
    );
  }

  // ---------- Confirmation ----------
  if (upload.isSuccess) {
    const saved = upload.data.document;
    return (
      <div className={`${page.page} ${styles.column}`}>
        {back}
        <h1 ref={successHeading} tabIndex={-1} className={page.title}>
          {doc.name} received
        </h1>
        <Alert type="success" title="Upload complete" announce>
          We’ll review it within 2 business days and update your payout.
        </Alert>
        <section className={styles.next} aria-labelledby="next-heading">
          <h2 id="next-heading" className={styles.subheading}>
            What happens next
          </h2>
          <ol className={styles.steps}>
            <li>
              {claim.data.adjuster.name} reviews your {docName}.
            </li>
            <li>You’ll get an email when your payout is confirmed.</li>
            <li>
              Payment arrives by direct deposit
              {claim.data.payout.expectedDate
                ? `, expected by ${formatDate(claim.data.payout.expectedDate)}`
                : ''}
              .
            </li>
          </ol>
        </section>
        <DocumentRow
          name={doc.name}
          detail={`${saved.fileName} · Uploaded ${saved.receivedDate ? formatDate(saved.receivedDate) : 'today'}`}
          status="approved"
          statusLabel="Received"
        />
        <Link to={backTo} className={buttonClassName('primary', true)}>
          Back to claim
        </Link>
      </div>
    );
  }

  // ---------- Pick and submit ----------
  return (
    <div className={`${page.page} ${styles.column}`}>
      {back}
      <div className={page.intro}>
        <h1 ref={headingRef} tabIndex={-1} className={page.title}>
          Upload {docName}
        </h1>
        <p className={page.subtitle}>
          {doc.id === 'doc-estimate'
            ? 'Ask your repair shop for a written estimate. We’ll use it to calculate your payout.'
            : 'Upload a clear photo or scan. Make sure every page is readable.'}
        </p>
      </div>

      <form
        className={styles.panel}
        onSubmit={(e) => {
          e.preventDefault();
          if (!file) {
            setFileError('Choose a file to upload.');
            return;
          }
          upload.mutate({ documentId: doc.id, file });
        }}
        noValidate
      >
        <div
          className={[styles.dropzone, dragging && styles.dragging].filter(Boolean).join(' ')}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          <span className={styles.dropIcon}>
            <Icon name="upload" />
          </span>
          <p className={styles.dragText}>Drag a file here, or</p>
          {/* The real file input is visually hidden; the label is styled as a button. */}
          <input
            id={inputId}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
            className={`visually-hidden ${styles.fileInput}`}
            aria-describedby={fileError ? `${hintId} ${errorId}` : hintId}
            aria-invalid={fileError ? true : undefined}
            onChange={(e) => pick(e.target.files?.[0])}
          />
          <label
            htmlFor={inputId}
            className={`${buttonClassName('secondary')} ${styles.chooseLabel}`}
          >
            Choose a file
          </label>
          <p id={hintId} className={styles.hint}>
            PDF, JPG or PNG, up to 10 MB
          </p>
        </div>

        {fileError && (
          <div id={errorId}>
            <Alert type="error" title="That file can’t be used" announce>
              {fileError}
            </Alert>
          </div>
        )}

        {upload.isError && (
          <Alert type="error" title="Upload failed" announce>
            {upload.error.message}
          </Alert>
        )}

        {file && (
          <div className={styles.selected}>
            <p className={styles.selectedLabel}>Selected file</p>
            <DocumentRow
              name={file.name}
              detail={`${formatSize(file.size)} · Ready to submit`}
              status="review"
              statusLabel="Ready"
            />
          </div>
        )}

        <div className={styles.actions}>
          <Link to={backTo} className={buttonClassName('ghost')}>
            Cancel
          </Link>
          <Button type="submit" loading={upload.isPending}>
            Submit document
          </Button>
        </div>
      </form>
    </div>
  );
}
