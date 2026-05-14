import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

const Home = lazy(() => import('./pages/Home'));
const Students = lazy(() => import('./pages/Students'));
const Vendors = lazy(() => import('./pages/Vendors'));
const Universities = lazy(() => import('./pages/Universities'));
const About = lazy(() => import('./pages/About'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Help = lazy(() => import('./pages/Help'));
const Contact = lazy(() => import('./pages/Contact'));
const Press = lazy(() => import('./pages/Press'));
const Terms = lazy(() => import('./pages/legal/Terms'));
const Privacy = lazy(() => import('./pages/legal/Privacy'));
const Refunds = lazy(() => import('./pages/legal/Refunds'));
const BlogIndex = lazy(() => import('./pages/blog/BlogIndex'));
const BlogPost = lazy(() => import('./pages/blog/BlogPost'));
const NotFound = lazy(() => import('./pages/NotFound'));
const CompareEezipay = lazy(() => import('./pages/compare/Eezipay'));
const CompareMrD = lazy(() => import('./pages/compare/MrD'));
const CompareVarsityVibe = lazy(() => import('./pages/compare/VarsityVibe'));
const CampusCheatSheet = lazy(() => import('./pages/downloads/CampusCheatSheet'));
const VendorOnePager = lazy(() => import('./pages/downloads/VendorOnePager'));
const LaunchStrategy = lazy(() => import('./pages/internal/LaunchStrategy'));

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center" aria-live="polite">
      <div
        className="h-8 w-8 rounded-full border-2 border-brand-200 border-t-brand-600 animate-spin"
        aria-label="Loading page"
        role="status"
      />
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="students" element={<Students />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="universities" element={<Universities />} />
          <Route path="about" element={<About />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="help" element={<Help />} />
          <Route path="contact" element={<Contact />} />
          <Route path="press" element={<Press />} />
          <Route path="blog" element={<BlogIndex />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="legal">
            <Route path="terms" element={<Terms />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="refunds" element={<Refunds />} />
          </Route>
          <Route path="vs/eezipay" element={<CompareEezipay />} />
          <Route path="vs/mr-d" element={<CompareMrD />} />
          <Route path="vs/varsity-vibe" element={<CompareVarsityVibe />} />
          <Route path="downloads/campus-ordering" element={<CampusCheatSheet />} />
          <Route path="downloads/vendor-one-pager" element={<VendorOnePager />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* Internal pages — no nav/footer */}
        <Route path="internal/launch" element={<LaunchStrategy />} />
      </Routes>
    </Suspense>
  );
}

export default App;
