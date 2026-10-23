'use client';

import { ArrowDown, ArrowRight, Check, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import type { SystemExplainerData } from '@/data/system-explainers';

export function SystemExplainer({ data }: { data: SystemExplainerData }) {
  const [selectedId, setSelectedId] = useState(data.stages[0]?.id ?? '');
  const selected =
    data.stages.find((item) => item.id === selectedId) ?? data.stages[0];
  if (!selected) {return <p>The system walkthrough is being prepared.</p>;}
  const selectedIndex = data.stages.indexOf(selected);
  const number = (id: string) =>
    String(data.stages.findIndex((stage) => stage.id === id) + 1).padStart(
      2,
      '0',
    );
  return (
    <div className="system-explainer">
      <div className="system-story">
        <p className="eyebrow">The 30-second explanation</p>
        <p>{data.story}</p>
      </div>
      <p className="system-status">
        <strong>Implementation status</strong>
        {data.status}
      </p>
      <div className="system-map-heading">
        <div>
          <p className="eyebrow">Follow the data</p>
          <h3>A map of the moving parts.</h3>
        </div>
        <p>
          Select any stage to inspect its input, work, output and failure
          behavior.
        </p>
      </div>
      <p className="system-example">
        <span>Example, not a live result</span>
        {data.example}
      </p>
      <div className="system-workbench">
        <div className="system-lanes">
          {data.lanes.map((lane) => (
            <section
              className="system-lane"
              key={lane.name}
              aria-label={lane.name}>
              <header>
                <h4>{lane.name}</h4>
                <p>{lane.note}</p>
              </header>
              <div
                className="system-flow"
                style={
                  {
                    '--flow-columns': lane.columns.length,
                  } as React.CSSProperties
                }>
                {lane.columns.map((column, columnIndex) => (
                  <div className="system-column" key={columnIndex}>
                    {columnIndex > 0 && (
                      <span className="system-connector" aria-label="then">
                        <ArrowRight size={18} />
                        <ArrowDown size={18} />
                      </span>
                    )}
                    {column.label && (
                      <p className="system-branch-label">{column.label}</p>
                    )}
                    <div
                      className={
                        column.stages.length > 1
                          ? 'system-fork'
                          : 'system-single'
                      }>
                      {column.stages.map((id) => {
                        const node = data.stages.find(
                          (item) => item.id === id,
                        )!;
                        return (
                          <button
                            key={id}
                            className="system-node"
                            aria-pressed={selectedId === id}
                            aria-controls="system-stage-detail"
                            onClick={() => {
                              setSelectedId(id);
                              if (
                                window.matchMedia('(max-width: 800px)').matches
                              ) {
                                document
                                  .getElementById('system-stage-detail')
                                  ?.scrollIntoView({
                                    block: 'start',
                                    behavior: 'instant',
                                  });
                              }
                            }}>
                            <span className="system-node__number">
                              {number(id)}{' '}
                              {selectedId === id && (
                                <Check size={12} aria-hidden="true" />
                              )}
                            </span>
                            <strong>{node.name}</strong>
                            <small>{node.role}</small>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <p className="system-destination">
                <ChevronRight size={15} aria-hidden="true" />
                {lane.destination}
              </p>
            </section>
          ))}
        </div>
        <aside
          id="system-stage-detail"
          className="system-detail"
          aria-live="polite"
          aria-atomic="true">
          <p className="eyebrow">
            Stage {number(selected.id)} /{' '}
            {String(data.stages.length).padStart(2, '0')}
          </p>
          <h4>{selected.name}</h4>
          <p className="system-detail__role">{selected.role}</p>
          <dl>
            {[
              ['Input', selected.input],
              ['What happens', selected.process],
              ['Output', selected.output],
            ].map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <div className="system-detail__example">
            <strong>In our example</strong>
            <p>{selected.example}</p>
          </div>
          <div className="system-detail__failure">
            <strong>If something goes wrong</strong>
            <p>{selected.failure}</p>
          </div>
          <p className="system-source">
            <span>Implementation reference</span>
            {selected.source}
          </p>
          <div className="system-step-controls">
            <button
              disabled={selectedIndex === 0}
              onClick={() =>
                setSelectedId(data.stages[selectedIndex - 1]?.id ?? selectedId)
              }>
              Previous stage
            </button>
            <button
              disabled={selectedIndex === data.stages.length - 1}
              onClick={() =>
                setSelectedId(data.stages[selectedIndex + 1]?.id ?? selectedId)
              }>
              Next stage <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
        </aside>
      </div>
      <section className="system-stack" aria-labelledby="system-stack-title">
        <div className="system-map-heading">
          <div>
            <p className="eyebrow">Technology, with a purpose</p>
            <h3 id="system-stack-title">What each tool is responsible for.</h3>
          </div>
          <p>
            Languages, frameworks and services play different roles. Here is why
            each belongs in this system.
          </p>
        </div>
        <div className="system-table-scroll">
          <table>
            <caption className="sr-only">
              Technology roles and design rationale
            </caption>
            <thead>
              <tr>
                <th scope="col">Technology</th>
                <th scope="col">Responsibility</th>
                <th scope="col">Why this choice</th>
              </tr>
            </thead>
            <tbody>
              {data.stack.map((item) => (
                <tr key={item.name}>
                  <th scope="row">
                    {item.name}
                    <small>{item.category}</small>
                  </th>
                  <td>{item.responsibility}</td>
                  <td>{item.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="system-talk" aria-labelledby="system-talk-title">
        <div>
          <p className="eyebrow">Interview walkthrough</p>
          <h3 id="system-talk-title">How I explain the design.</h3>
          <p>
            Start with the problem, follow one input, then explain the tradeoff.
          </p>
        </div>
        <ol>
          {data.walkthrough.map((line, index) => (
            <li key={line}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{line}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
