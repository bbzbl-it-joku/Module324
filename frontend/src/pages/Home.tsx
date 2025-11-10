import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="page-container flex min-h-screen flex-col">
      <div className="page-content flex-1">
        <div className="w-full max-w-lg space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="page-header text-5xl sm:text-6xl lg:text-6xl">
              Hello
            </h1>
            <p className="page-text">Welcome to Module 324</p>
          </div>
          <a
            href="https://github.com/bbzbl-it-joku/Module324"
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary"
          >
            <span>GitHub Repository</span>
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
