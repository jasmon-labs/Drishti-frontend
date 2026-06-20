import { createFileRoute } from "@tanstack/react-router";
import { BengaluruHeatmap } from "@/components/BengaluruHeatmap";
import { AI_RECOMMENDATIONS, REPEAT_OFFENDERS } from "@/lib/mockData";
import { Activity, ShieldAlert, Crosshair, Siren } from "lucide-react";

export const Route = createFileRoute("/")({
  component: CommandCenter,
});

function CommandCenter() {
  return (
    <div className="flex flex-col h-full gap-4 font-mono">
      {/* Top Telemetry Bar */}
      <div className="grid grid-cols-4 gap-1">
        {[
          { label: "NODE_STREAMS", val: "1,402", status: "SYNCED" },
          { label: "VIOLATION_IDX", val: "84.2", status: "+12.4%" },
          { label: "OFFICER_NODES", val: "284", status: "ACTIVE" },
          { label: "PRED_CONF", val: "94.1%", status: "OPTIMAL" },
        ].map(stat => (
          <div key={stat.label} className="bg-white/5 border border-white/10 p-3 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-primary/30" />
             <p className="text-[10px] text-slate-500 tracking-widest">{stat.label}</p>
             <div className="flex justify-between items-end mt-1">
                <h2 className="text-2xl font-bold text-white tracking-tighter">{stat.val}</h2>
                <span className="text-[9px] text-primary">{stat.status}</span>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
        {/* Main Projection Surface */}
        <div className="col-span-8 relative bg-black/20 border border-white/10 p-1">
          <div className="hud-corner top-0 left-0 border-t border-l" />
          <div className="hud-corner top-0 right-0 border-t border-r" />
          <div className="hud-corner bottom-0 left-0 border-b border-l" />
          <div className="hud-corner bottom-0 right-0 border-b border-r" />
          
          <div className="h-full w-full grayscale contrast-125 brightness-75 opacity-80 overflow-hidden">
            <BengaluruHeatmap />
          </div>
          
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="bg-black/80 border border-primary/40 px-3 py-1 text-[10px] flex items-center gap-2">
                <Activity size={12} className="text-primary animate-pulse" />
                <span>BTP_GRID_v4.2 // LIVE_PROJECTION</span>
            </div>
          </div>
        </div>

        {/* Intelligence Side-Panel */}
        <div className="col-span-4 flex flex-col gap-4 overflow-hidden">
          <section className="flex-1 border border-white/10 bg-white/5 flex flex-col min-h-0">
            <div className="p-3 border-b border-white/10 bg-primary/10 flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-widest flex items-center gap-2 text-primary">
                    <Crosshair size={14} /> AI_INTERVENTION_QUEUE
                </span>
            </div>
            <div className="flex-1 overflow-y-auto">
              {AI_RECOMMENDATIONS.map((r, i) => (
                <div key={i} className="p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                        <span className={`px-2 py-0.5 text-[9px] font-bold border ${r.priority === 'CRITICAL' ? 'border-violation text-violation bg-violation/10' : 'border-primary/40 text-primary'}`}>
                            {r.priority}
                        </span>
                        <span className="text-[10px] text-slate-500">CONF: {r.confidence}%</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-snug uppercase">{r.title}</p>
                    <div className="mt-3 flex justify-between items-center text-[10px] text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>{r.action}</span>
                        <span className="flex items-center gap-1 underline underline-offset-4">INITIATE_DEPLOYMENT</span>
                    </div>
                </div>
              ))}
            </div>
          </section>

          <section className="h-48 border border-white/10 bg-black/40 p-3">
             <h3 className="text-[10px] text-slate-500 mb-3 tracking-widest">REPEAT_OFFENDER_RADAR</h3>
             <div className="space-y-2 overflow-y-auto max-h-32">
                {REPEAT_OFFENDERS.map(o => (
                    <div key={o.plate} className="flex justify-between items-center text-[11px] border-l-2 border-violation pl-2 bg-violation/5 py-1">
                        <span className="text-white font-bold">{o.plate}</span>
                        <span className="text-violation font-bold">{o.score} RISK</span>
                    </div>
                ))}
             </div>
          </section>
        </div>
      </div>
    </div>
  );
}
