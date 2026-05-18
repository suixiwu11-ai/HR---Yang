"use client";

import { useState } from "react";
import { useQuarter } from "@/components/AppShell";
import { ROLE_FAMILIES, PRODUCT_LINES } from "@/lib/catalog";

export default function WizardPage() {
  const { quarterId } = useQuarter();
  const [step, setStep] = useState(1);
  const [msg, setMsg] = useState("");

  async function finish() {
    const res = await fetch(`/api/quarters/${quarterId}/calculate`, { method: "POST" });
    setMsg(res.ok ? "\u5bfc\u5f15\u5b8c\u6210\uff0c\u5df2\u6838\u7b97" : "\u6838\u7b97\u5931\u8d25");
    setStep(4);
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "1rem" }}>
      <p className="breadcrumb">
        <a href="/">STRIDE</a> / <strong>{"\u5b63\u5ea6\u5411\u5bfc"}</strong>
      </p>
      <section className="chart-panel">
        <h3>
          {"\u6b65\u9aa4 "}
          {step}
          /4
        </h3>
        {step === 1 && (
          <p className="tab-intro">
            {"\u786e\u8ba4\u5b63\u5ea6 "}
            <strong>{quarterId}</strong>
            {"\uff1b\u8bf7\u5728\u300c\u6570\u636e\u300d\u9875\u8bbe\u7f6e\u6536\u5165 proxy\u3002"}
          </p>
        )}
        {step === 2 && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>RF</th>
                  <th>{"\u540d\u79f0"}</th>
                </tr>
              </thead>
              <tbody>
                {ROLE_FAMILIES.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {step === 3 && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>PL</th>
                  <th>{"\u4ea7\u54c1\u7ebf"}</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCT_LINES.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {step === 4 && <p className="tab-intro">{msg}</p>}
        <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
          {step > 1 && step < 4 && (
            <button type="button" className="btn-secondary" onClick={() => setStep(step - 1)}>
              {"\u4e0a\u4e00\u6b65"}
            </button>
          )}
          {step < 3 && (
            <button type="button" className="btn-primary" onClick={() => setStep(step + 1)}>
              {"\u4e0b\u4e00\u6b65"}
            </button>
          )}
          {step === 3 && (
            <button type="button" className="btn-primary" onClick={finish}>
              {"\u63d0\u4ea4\u5e76\u6838\u7b97"}
            </button>
          )}
          {step === 4 && (
            <a href="/" className="btn-primary" style={{ display: "inline-block", textDecoration: "none" }}>
              {"\u8fd4\u56de\u5de5\u4f5c\u53f0"}
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
