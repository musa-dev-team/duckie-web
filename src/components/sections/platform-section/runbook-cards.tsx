export function DefineRunbooksCard() {
  return (
    <div className="w-full max-w-lg rounded-xl bg-zinc-900/90 p-6 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl border border-white/[0.06]">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-400/30 to-orange-500/20 flex items-center justify-center">
            <svg className="h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Refund Request Runbook</p>
            <p className="text-xs text-white/40">v2.3 • Last edited 2h ago</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-emerald-500/20 ring-1 ring-emerald-500/30">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-emerald-300">Active</span>
        </span>
      </div>
      
      <div className="space-y-4">
        <div className="rounded-lg bg-white/[0.04] p-4 ring-1 ring-white/[0.08]">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-5 w-5 rounded bg-blue-500/20 flex items-center justify-center">
              <span className="text-xs text-blue-400">P</span>
            </div>
            <span className="text-xs font-semibold text-white/70">Policy</span>
          </div>
          <p className="text-xs text-white/50 leading-relaxed">
            Refunds are approved automatically for orders under $100 within 30 days of purchase.
          </p>
        </div>

        <div className="rounded-lg bg-white/[0.04] p-4 ring-1 ring-white/[0.08]">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-5 w-5 rounded bg-amber-500/20 flex items-center justify-center">
              <span className="text-xs text-amber-400">A</span>
            </div>
            <span className="text-xs font-semibold text-white/70">Action</span>
          </div>
          <p className="text-xs text-white/50 leading-relaxed">
            If eligible, process refund via Stripe API and send confirmation email.
          </p>
        </div>

        <div className="rounded-lg bg-white/[0.04] p-4 ring-1 ring-amber-400/20">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-5 w-5 rounded bg-amber-500/20 flex items-center justify-center">
              <svg className="h-3 w-3 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-amber-400/90">Guardrail</span>
          </div>
          <p className="text-xs text-white/50 leading-relaxed">
            Escalate to human if customer mentions legal action.
          </p>
        </div>
      </div>
    </div>
  );
}

export function TrainKnowledgeCard() {
  const sources = [
    { name: "Help Center Articles", count: "1,247 articles", icon: "📚", status: "synced" },
    { name: "Product Documents", count: "89 pages", icon: "📖", status: "synced" },
    { name: "Historical Tickets", count: "15.2k tickets", icon: "🎫", status: "syncing" },
    { name: "Internal Wiki", count: "342 pages", icon: "📝", status: "synced" },
  ];

  return (
    <div className="w-full max-w-lg rounded-xl bg-zinc-900/90 p-6 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl border border-white/[0.06]">
      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/[0.08]">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-400/30 to-pink-500/20 flex items-center justify-center flex-shrink-0">
          <svg className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0 pr-4">
          <p className="text-sm font-semibold text-white">Knowledge Sources</p>
          <p className="text-xs text-white/40">4 sources connected</p>
        </div>
        <button className="px-3 py-1.5 rounded-lg bg-purple-500/20 text-xs font-semibold text-purple-300 ring-1 ring-purple-500/30 hover:bg-purple-500/30 transition-colors flex-shrink-0">
          + Add Source
        </button>
      </div>
      
      <div className="space-y-3">
        {sources.map((source) => (
          <div key={source.name} className="rounded-lg bg-white/[0.04] p-4 ring-1 ring-white/[0.08] flex items-center justify-between group hover:ring-white/20 transition-all">
            <div className="flex items-center gap-3">
              <span className="text-lg">{source.icon}</span>
              <div>
                <p className="text-sm font-medium text-white/80">{source.name}</p>
                <p className="text-xs text-white/40">{source.count}</p>
              </div>
            </div>
            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full ${source.status === 'synced' ? 'bg-emerald-500/20' : 'bg-amber-500/20'}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${source.status === 'synced' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
              <span className={`text-xs font-medium ${source.status === 'synced' ? 'text-emerald-300' : 'text-amber-300'}`}>
                {source.status === 'synced' ? 'Synced' : 'Syncing...'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/[0.08]">
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/40">Last sync: 5 minutes ago</span>
          <span className="text-purple-400 font-medium">16,878 total items</span>
        </div>
      </div>
    </div>
  );
}

export function ConfigureActionsCard() {
  const actions = [
    { name: "Process Refund", api: "stripe.refunds.create()", calls: "2.4k", icon: "💳" },
    { name: "Update Order", api: "orders.update()", calls: "8.1k", icon: "📦" },
    { name: "Send Notification", api: "notifications.send()", calls: "15k", icon: "📧" },
    { name: "Escalate to Human", api: "tickets.escalate()", calls: "892", icon: "🎫" },
  ];

  return (
    <div className="w-full max-w-lg rounded-xl bg-zinc-900/90 p-6 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl border border-white/[0.06]">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400/30 to-blue-500/20 flex items-center justify-center">
            <svg className="h-4 w-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Actions Library</p>
            <p className="text-xs text-white/40">12 actions configured</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        {actions.map((action) => (
          <div key={action.name} className="rounded-lg bg-white/[0.04] px-3 py-2.5 ring-1 ring-white/[0.08] flex items-center gap-3 group hover:ring-cyan-400/30 transition-all">
            <span className="text-sm">{action.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white/90">{action.name}</p>
              <p className="text-[10px] text-cyan-400/70 font-mono">{action.api}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/30">{action.calls}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-sm font-semibold text-white">27.5k</p>
            <p className="text-[10px] text-white/40">calls</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-emerald-400">99.8%</p>
            <p className="text-[10px] text-white/40">success</p>
          </div>
        </div>
        <button className="text-xs text-cyan-400 font-medium hover:text-cyan-300 transition-colors">
          View all →
        </button>
      </div>
    </div>
  );
}

export function GuardrailsCard() {
  const triggers = ["Legal threats", "Extreme frustration", "Security concerns", "VIP customer"];
  const traits = ["Professional", "Empathetic", "Solution-focused", "Concise"];

  return (
    <div className="w-full max-w-lg rounded-xl bg-zinc-900/90 p-6 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl border border-white/[0.06]">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-rose-400/30 to-orange-500/20 flex items-center justify-center">
            <svg className="h-4 w-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Safety & Brand Voice</p>
            <p className="text-xs text-white/40">12 rules active</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Escalation Triggers</p>
          <div className="space-y-2">
            {triggers.map((trigger) => (
              <div key={trigger} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-500/10 ring-1 ring-rose-500/20">
                <svg className="h-3.5 w-3.5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-xs text-rose-300">{trigger}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Brand Voice</p>
          <div className="rounded-lg bg-white/[0.04] p-4 ring-1 ring-white/[0.08]">
            <div className="flex flex-wrap gap-2">
              {traits.map((trait) => (
                <span key={trait} className="px-2.5 py-1 rounded-full bg-amber-500/15 text-xs font-medium text-amber-300 ring-1 ring-amber-500/30">
                  {trait}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-white/50 leading-relaxed">
              Always acknowledge the customer&apos;s concern before providing solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestLaunchCard() {
  const tests = [
    { name: "Refund eligibility check", status: "passed", time: "0.8s" },
    { name: "Escalation trigger detection", status: "passed", time: "1.2s" },
    { name: "Brand voice compliance", status: "passed", time: "0.5s" },
    { name: "Edge case: expired product", status: "failed", time: "1.1s" },
  ];

  return (
    <div className="w-full max-w-lg rounded-xl bg-zinc-900/90 p-6 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl border border-white/[0.06]">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-400/30 to-teal-500/20 flex items-center justify-center">
            <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Test Suite</p>
            <p className="text-xs text-white/40">Running simulation...</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-emerald-500/20 ring-1 ring-emerald-500/30">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-emerald-300">Live</span>
        </span>
      </div>
      
      <div className="space-y-3">
        <div className="rounded-lg bg-white/[0.04] p-4 ring-1 ring-white/[0.08]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-white/70">Test Results</span>
            <span className="text-xs text-emerald-400 font-medium">24/25 passed</span>
          </div>
          <div className="h-2 rounded-full bg-white/[0.08] overflow-hidden">
            <div className="h-full w-[96%] rounded-full bg-gradient-to-r from-emerald-400 to-teal-400" />
          </div>
        </div>

        <div className="space-y-2">
          {tests.map((test) => (
            <div key={test.name} className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-white/[0.03] ring-1 ring-white/[0.06]">
              <div className="flex items-center gap-2">
                {test.status === 'passed' ? (
                  <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                <span className="text-xs text-white/70">{test.name}</span>
              </div>
              <span className="text-xs text-white/40">{test.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/[0.08] flex gap-3">
        <button className="flex-1 px-4 py-2 rounded-lg bg-white/[0.06] text-xs font-medium text-white/70 ring-1 ring-white/[0.08] hover:bg-white/[0.1] transition-colors">
          View Details
        </button>
        <button className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-xs font-semibold text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all">
          Deploy →
        </button>
      </div>
    </div>
  );
}

export const stepCards = [
  DefineRunbooksCard,
  TrainKnowledgeCard,
  ConfigureActionsCard,
  GuardrailsCard,
  TestLaunchCard,
];
