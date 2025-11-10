import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page-container flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-300 dark:text-gray-700">
          404
        </h1>
        <h2 className="page-header mt-6 text-3xl">Page not found</h2>
        <p className="page-text mb-8">
          Sorry, the requested page does not exist.
        </p>
        <Link to="/" className="button-primary">
          Back to home
        </Link>
      </div>
    </div>
  );
}
