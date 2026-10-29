'use client';

import styles from './analytics-dashboard.module.css';

import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronDown,
  Database,
  Search,
  Table2,
  X,
} from 'lucide-react';
import { useMemo, useState } from 'react';

import type { AnalyticsSnapshot } from './types';

const number = new Intl.NumberFormat('en-US');
const format = (value: number) => number.format(value);
const percent = (value: number, total: number) =>
  total ? `${((100 * value) / total).toFixed(1)}%` : '0.0%';
const monthLabel = (value: string, short = false) =>
  new Date(`${value}-01T12:00:00Z`).toLocaleDateString('en-US', {
    month: short ? 'short' : 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
const categoryLabel = (value: string) => value.replaceAll('_', ' ');
const download = (content: string, type: string, filename: string) => {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

export function AnalyticsDashboard({
  snapshot,
  locale,
}: {
  snapshot: AnalyticsSnapshot;
  locale: string;
}) {
  const months = snapshot.monthly.map((row) => row.month).sort();
  const [start, setStart] = useState(months[0] ?? '');
  const [end, setEnd] = useState(months.at(-1) ?? '');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('demand');
  const [view, setView] = useState<'chart' | 'table'>('chart');
  const [selected, setSelected] = useState('python');
  const [expanded, setExpanded] = useState(false);
  const [notice, setNotice] = useState('');
  const invalidRange = Boolean(start && end && start > end);
  const included = (month: string) =>
    !invalidRange && (!start || month >= start) && (!end || month <= end);
  const monthly = snapshot.monthly.filter((row) => included(row.month));
  const retained = monthly.reduce((total, row) => total + row.postings, 0);
  const withSkills = monthly.reduce((total, row) => total + row.withSkills, 0);
  const categories = [
    ...new Set(snapshot.skills.map((skill) => skill.category)),
  ].sort();
  const filtered = useMemo(
    () =>
      snapshot.skills
        .map((skill) => ({
          ...skill,
          count: skill.monthly
            .filter(
              (row) =>
                (!start || row.month >= start) &&
                (!end || row.month <= end) &&
                start <= end,
            )
            .reduce((total, row) => total + row.postings, 0),
        }))
        .filter(
          (skill) =>
            skill.count > 0 &&
            (category === 'all' || skill.category === category) &&
            skill.name.toLowerCase().includes(query.trim().toLowerCase()),
        )
        .sort((a, b) =>
          sort === 'name'
            ? a.name.localeCompare(b.name)
            : b.count - a.count || a.name.localeCompare(b.name),
        ),
    [snapshot.skills, start, end, category, query, sort],
  );
  const selectedSkill =
    filtered.find((skill) => skill.name === selected) ?? filtered[0];
  const rows = expanded ? filtered : filtered.slice(0, 12);
  const highest = Math.max(...filtered.map((skill) => skill.count), 1);
  const monthHighest = Math.max(...monthly.map((row) => row.postings), 1);
  const selectedMonthly = monthly.map((row) => ({
    month: row.month,
    postings:
      selectedSkill?.monthly.find((item) => item.month === row.month)
        ?.postings ?? 0,
  }));
  const selectedHighest = Math.max(
    ...selectedMonthly.map((row) => row.postings),
    1,
  );
  const reset = () => {
    setStart(months[0] ?? '');
    setEnd(months.at(-1) ?? '');
    setQuery('');
    setCategory('all');
    setSort('demand');
    setExpanded(false);
  };
  const exportCsv = () => {
    const quote = (value: string) => `"${value.replaceAll('"', '""')}"`;
    const lines = [
      'skill,category,posting_count,share_of_retained_postings,start_month,end_month',
      ...filtered.map((skill) =>
        [
          quote(skill.name),
          quote(skill.category),
          skill.count,
          percent(skill.count, retained),
          start,
          end,
        ].join(','),
      ),
    ];
    download(
      lines.join('\r\n'),
      'text/csv;charset=utf-8',
      `skill-demand-${start}-${end}.csv`,
    );
    setNotice(`Exported ${filtered.length} skill rows.`);
  };
  const benchmarkDate = new Date(
    `${snapshot.benchmarkDate}T12:00:00Z`,
  ).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <div className={styles.observatory}>
      <nav className={styles.productNav} aria-label="Analytics navigation">
        <a className={styles.wordmark} href={`/${locale}/analytics`}>
          <span className={styles.mark}>
            <BarChart3 size={17} />
          </span>{' '}
          JOB MARKET <strong>OBSERVATORY</strong>
        </a>
        <a href={`/${locale}/work/tech-skill-demand-platform`}>
          How it works <ArrowUpRight size={14} />
        </a>
      </nav>
      <header className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>
            AN INDEPENDENT DATA EXPLORER <span>01 / SKILL DEMAND</span>
          </p>
          <h1>
            The work behind
            <br />
            the job market.
          </h1>
          <p className={styles.intro}>
            Explore the skills found in real job postings. A transparent look at
            the data, the processing, and what the results actually say.
          </p>
        </div>
        <div className={styles.snapshotNote}>
          <span className={styles.verified}>
            <Check size={13} /> Verified snapshot
          </span>
          <strong>{benchmarkDate}</strong>
          <p>{snapshot.source.country} · Source-dated 2025–2026</p>
          <a href={snapshot.evidenceUrl} target="_blank" rel="noreferrer">
            Read the benchmark <ArrowUpRight size={14} />
          </a>
        </div>
      </header>

      <section
        className={styles.pipeline}
        aria-label="Whole-run processing results">
        <div className={styles.pipelineLead}>
          <span className={styles.eyebrow}>THE COMPLETE RUN</span>
          <strong>
            {format(snapshot.metrics.inputRows)}
            <span>real posting records processed</span>
          </strong>
          <p>Every count traces back to a frozen, versioned dataset.</p>
        </div>
        <div className={styles.pipelineSteps}>
          <div>
            <span className={styles.stepLabel}>01 / RETAINED</span>
            <strong>{format(snapshot.metrics.canonicalRows)}</strong>
            <span>canonical postings</span>
          </div>
          <ArrowRight
            className={styles.pipelineArrow}
            size={20}
            aria-hidden="true"
          />
          <div>
            <span className={styles.stepLabel}>02 / MATCHED</span>
            <strong>{format(snapshot.metrics.matchedSkills)}</strong>
            <span>distinct skills</span>
          </div>
          <ArrowRight
            className={styles.pipelineArrow}
            size={20}
            aria-hidden="true"
          />
          <div>
            <span className={styles.stepLabel}>03 / CONNECTED</span>
            <strong>{format(snapshot.metrics.skillMatchRows)}</strong>
            <span>posting–skill matches</span>
          </div>
        </div>
        <div className={styles.pipelineFoot}>
          <span>
            <span className={styles.smallDot} />{' '}
            {format(snapshot.metrics.duplicateRows)} duplicate candidates
            removed (
            {percent(
              snapshot.metrics.duplicateRows,
              snapshot.metrics.inputRows,
            )}
            )
          </span>
          <span>Run totals · unchanged by filters below</span>
        </div>
      </section>

      <section className={styles.explore} aria-labelledby="explore-title">
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.eyebrow}>EXPLORE THE RESULTS</p>
            <h2 id="explore-title">What skills show up?</h2>
          </div>
          <button
            className={styles.export}
            onClick={exportCsv}
            disabled={!filtered.length}>
            <ArrowDownToLine size={15} /> Export CSV
          </button>
        </div>
        <div className={styles.controls}>
          <label className={styles.search}>
            <Search size={16} />
            <span className={styles.srOnly}>Search skills</span>
            <input
              type="search"
              placeholder="Find a skill…"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setExpanded(false);
              }}
            />
          </label>
          <label className={styles.field}>
            <span>Category</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}>
              <option value="all">All categories</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {categoryLabel(item)}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.field}>
            <span>From</span>
            <select
              aria-label="From month"
              value={start}
              onChange={(event) => setStart(event.target.value)}>
              {months.map((month) => (
                <option key={month} value={month}>
                  {monthLabel(month, true)}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.field}>
            <span>Through</span>
            <select
              aria-label="Through month"
              value={end}
              onChange={(event) => setEnd(event.target.value)}>
              {months.map((month) => (
                <option key={month} value={month}>
                  {monthLabel(month, true)}
                </option>
              ))}
            </select>
          </label>
          <button className={styles.reset} onClick={reset}>
            <X size={14} /> Reset
          </button>
        </div>
        {invalidRange && (
          <p role="alert" className={styles.rangeError}>
            Choose a start month that comes before or matches the end month.
          </p>
        )}
        <div className={styles.filterSummary} aria-live="polite">
          <span>
            <strong>{format(retained)}</strong> retained postings in selected
            months
          </span>
          <span>
            {format(withSkills)} contain a recognized skill · {filtered.length}{' '}
            skills match your filters
          </span>
        </div>
        <div className={styles.explorerGrid}>
          <div className={styles.ranking}>
            <div className={styles.panelHeading}>
              <div>
                <h3>Skills by posting count</h3>
                <p>One posting may mention several skills.</p>
              </div>
              <div className={styles.viewSwitch} aria-label="Result display">
                <button
                  aria-label="Chart view"
                  aria-pressed={view === 'chart'}
                  onClick={() => setView('chart')}>
                  <BarChart3 size={16} />
                </button>
                <button
                  aria-label="Table view"
                  aria-pressed={view === 'table'}
                  onClick={() => setView('table')}>
                  <Table2 size={16} />
                </button>
              </div>
            </div>
            <div className={styles.rankingMeta}>
              <span>
                {filtered.length
                  ? `Showing ${rows.length} of ${filtered.length} skills`
                  : 'No matching skills'}
              </span>
              <label>
                Sort{' '}
                <select
                  aria-label="Sort skills"
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}>
                  <option value="demand">Most mentioned</option>
                  <option value="name">Alphabetically</option>
                </select>
              </label>
            </div>
            {!filtered.length ? (
              <div className={styles.empty}>
                <Search size={25} />
                <h3>No skills match this selection.</h3>
                <p>Try another skill, category, or date range.</p>
                <button onClick={reset}>
                  Reset filters <ArrowRight size={15} />
                </button>
              </div>
            ) : view === 'chart' ? (
              <ol className={styles.barList}>
                {rows.map((skill, index) => (
                  <li key={skill.name}>
                    <button
                      className={`${styles.skillRow} ${selectedSkill?.name === skill.name ? styles.activeSkill : ''}`}
                      onClick={() => setSelected(skill.name)}
                      aria-pressed={selectedSkill?.name === skill.name}>
                      <span className={styles.rank}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className={styles.skillLabel}>
                        {skill.name}
                        <span className={styles.barTrack}>
                          <span
                            style={{
                              width: `${(100 * skill.count) / highest}%`,
                            }}
                          />
                        </span>
                      </span>
                      <span className={styles.skillCount}>
                        {format(skill.count)}
                        <small>{percent(skill.count, retained)}</small>
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            ) : (
              <div className={styles.tableWrap}>
                <table>
                  <caption className={styles.srOnly}>
                    Skill counts for the selected months. Select a skill to see
                    its detail.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Skill</th>
                      <th scope="col">Postings</th>
                      <th scope="col">Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((skill) => (
                      <tr
                        key={skill.name}
                        className={
                          selectedSkill?.name === skill.name
                            ? styles.activeTable
                            : ''
                        }>
                        <th scope="row">
                          <button
                            onClick={() => setSelected(skill.name)}
                            aria-pressed={selectedSkill?.name === skill.name}>
                            {skill.name}
                          </button>
                        </th>
                        <td>{format(skill.count)}</td>
                        <td>{percent(skill.count, retained)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {filtered.length > 12 && (
              <button
                className={styles.showMore}
                onClick={() => setExpanded(!expanded)}>
                {expanded
                  ? 'Show top 12'
                  : `Show all ${filtered.length} skills`}{' '}
                <ChevronDown
                  size={15}
                  className={expanded ? styles.rotated : ''}
                />
              </button>
            )}
          </div>
          <aside
            className={styles.skillDetail}
            aria-label="Selected skill detail"
            aria-live="polite">
            <p className={styles.eyebrow}>UNDER THE LENS</p>
            {selectedSkill ? (
              <>
                <span className={styles.category}>
                  {categoryLabel(selectedSkill.category)}
                </span>
                <h3>{selectedSkill.name}</h3>
                <strong className={styles.detailCount}>
                  {format(selectedSkill.count)}
                </strong>
                <p className={styles.detailCopy}>
                  postings mention this skill
                  <br />
                  <strong>{percent(selectedSkill.count, retained)}</strong> of
                  retained postings in your date range
                </p>
                <div
                  className={styles.miniChart}
                  role="img"
                  aria-label={`Monthly posting counts for ${selectedSkill.name}. ${selectedMonthly.map((row) => `${monthLabel(row.month, true)}: ${row.postings}`).join('; ')}`}>
                  {selectedMonthly.map((row) => (
                    <span
                      key={row.month}
                      style={{
                        height: `${Math.max(row.postings ? 3 : 0, (100 * row.postings) / selectedHighest)}%`,
                      }}
                      title={`${monthLabel(row.month, true)}: ${format(row.postings)}`}
                    />
                  ))}
                </div>
                <div className={styles.chartEnds}>
                  <span>
                    {monthly[0] ? monthLabel(monthly[0].month, true) : ''}
                  </span>
                  <span>
                    {monthly.at(-1)
                      ? monthLabel(monthly.at(-1)!.month, true)
                      : ''}
                  </span>
                </div>
                <p className={styles.detailNote}>
                  Counts come from normalized skill matches, not inferred job
                  requirements. A mention is not a measure of proficiency or
                  hiring growth.
                </p>
              </>
            ) : (
              <p className={styles.detailNote}>
                Select a broader range to explore a skill.
              </p>
            )}
            <a className={styles.methodLink} href="#analytics-method">
              How these counts work <ArrowRight size={15} />
            </a>
          </aside>
        </div>
      </section>

      <section className={styles.monthlyPanel} aria-labelledby="monthly-title">
        <div className={styles.panelHeading}>
          <div>
            <p className={styles.eyebrow}>THE SAMPLE OVER TIME</p>
            <h2 id="monthly-title">When were these jobs posted?</h2>
            <p>
              Source posting dates within this snapshot. This is not a
              market-wide hiring trend.
            </p>
          </div>
          <span className={styles.monthLegend}>
            <i /> Retained postings
          </span>
        </div>
        {monthly.length ? (
          <>
            <div className={styles.monthChart}>
              {monthly.map((row, index) => (
                <div key={row.month} className={styles.monthColumn}>
                  <div className={styles.monthBarArea}>
                    <div
                      tabIndex={0}
                      role="img"
                      aria-label={`${monthLabel(row.month)}: ${format(row.postings)} retained postings`}
                      className={styles.monthBar}
                      style={{
                        height: `${Math.max(row.postings ? 2 : 0, (100 * row.postings) / monthHighest)}%`,
                      }}>
                      <span className={styles.tooltip}>
                        {monthLabel(row.month, true)}
                        <strong>{format(row.postings)}</strong>
                      </span>
                    </div>
                  </div>
                  <span className={styles.monthTick}>
                    {index === 0 ||
                    index === monthly.length - 1 ||
                    row.month.endsWith('-01') ||
                    index % 4 === 0
                      ? monthLabel(row.month, true)
                      : ''}
                  </span>
                </div>
              ))}
            </div>
            <details className={styles.monthTable}>
              <summary>
                View monthly values <ChevronDown size={14} />
              </summary>
              <div className={styles.tableWrap}>
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Source month</th>
                      <th scope="col">Retained postings</th>
                      <th scope="col">With recognized skills</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthly.map((row) => (
                      <tr key={row.month}>
                        <th scope="row">{monthLabel(row.month)}</th>
                        <td>{format(row.postings)}</td>
                        <td>{format(row.withSkills)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </>
        ) : (
          <p className={styles.empty}>No months in this range.</p>
        )}
      </section>

      <section
        id="analytics-method"
        className={styles.method}
        aria-labelledby="method-title">
        <div>
          <p className={styles.eyebrow}>TRANSPARENCY IS PART OF THE PRODUCT</p>
          <h2 id="method-title">The numbers, with context.</h2>
          <p>
            This explorer serves published aggregates from a completed pipeline
            run. It does not connect to a live job feed.
          </p>
          <div className={styles.methodLinks}>
            <a href={snapshot.evidenceUrl} target="_blank" rel="noreferrer">
              Benchmark & evidence <ArrowUpRight size={14} />
            </a>
            <button
              onClick={() => {
                download(
                  JSON.stringify(snapshot, null, 2),
                  'application/json',
                  `job-market-snapshot-${snapshot.benchmarkDate}.json`,
                );
                setNotice('Snapshot JSON downloaded.');
              }}>
              <ArrowDownToLine size={14} /> Snapshot JSON
            </button>
          </div>
        </div>
        <div className={styles.methodFacts}>
          <div>
            <span>Data source</span>
            <a href={snapshot.source.url} target="_blank" rel="noreferrer">
              {snapshot.source.name} <ArrowUpRight size={13} />
            </a>
          </div>
          <div>
            <span>Published benchmark</span>
            <strong>{benchmarkDate}</strong>
          </div>
          <div>
            <span>Cached API p95</span>
            <strong>
              {snapshot.latency.pythonWarmP95Ms.toFixed(3)} ms{' '}
              <small>
                local · {format(snapshot.latency.requests)} requests
              </small>
            </strong>
          </div>
          <div>
            <span>Processing</span>
            <strong>Python · PySpark · PostgreSQL</strong>
          </div>
        </div>
        <details className={styles.limitations}>
          <summary>
            <Database size={15} /> Source, method & limitations{' '}
            <ChevronDown size={16} />
          </summary>
          <div>
            <p>{snapshot.source.sampling}</p>
            {snapshot.source.statusCoverage && (
              <p>
                <strong>Analysis snapshot:</strong>{' '}
                {snapshot.source.statusCoverage}
              </p>
            )}
            <p>
              <strong>Immutable source revision:</strong>{' '}
              <code>{snapshot.source.revision}</code>
            </p>
            <p>
              <strong>Source snapshot:</strong>{' '}
              {new Date(snapshot.source.asOf).toLocaleString('en-US', {
                timeZone: 'UTC',
              })}{' '}
              UTC. Dates in the chart are provider-supplied posting dates, not
              collection dates.
            </p>
            <ul>
              {snapshot.limitations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              Skill percentages use all retained postings in the selected months
              as the denominator. Category and text filters narrow the displayed
              skills; they do not change that denominator. Skill mentions
              overlap. Search and category filters do not change the monthly
              posting chart.
            </p>
            <p>
              API timing is measured locally with {snapshot.latency.concurrency}{' '}
              sequential client. It is not the speed of this dashboard or a
              production service guarantee.
            </p>
          </div>
        </details>
      </section>
      <p role="status" className={styles.downloadNotice}>
        {notice}
      </p>
    </div>
  );
}
