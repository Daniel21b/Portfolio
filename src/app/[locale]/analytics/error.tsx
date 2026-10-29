'use client';

export default function AnalyticsError({ reset }: { reset: () => void }) {
  return (
    <section className="index-page" role="alert">
      <p className="eyebrow">Job Market Observatory</p>
      <h1>The snapshot could not be displayed.</h1>
      <p>Please reload the explorer or read the benchmark directly.</p>
      <button onClick={reset}>Try again</button>
      <p>
        <a href="https://github.com/Daniel21b/Job-Market-Analytics">
          Open project evidence →
        </a>
      </p>
    </section>
  );
}
