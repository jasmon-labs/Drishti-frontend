import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, ScanSearch, FileSearch, BarChart3, Truck, Flame, ServerCog, Zap } from "lucide-react";

const NAV = [
  { to: "/", label: "HUD", icon: LayoutDashboard, code: "CC-01" },
  { to: "/analyze", label: "SCAN", icon: ScanSearch, code: "AN-02" },
  { to: "/evidence", label: "LOG", icon: FileSearch, code: "EV-03" },
  { to: "/hotspots", label: "GRID", icon: Flame, code: "HP-06" },
  { to: "/fleet", label: "FLEET", icon: Truck, code: "FL-05" },
  { to: "/system", label: "SYS", icon: ServerCog, code: "SY-07" },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="w-16 border-r border-white/10 bg-black/40 backdrop-blur-md flex flex-col justify-between items-center py-4">
      <div className="flex flex-col items-center gap-6">
        <div className="w-10 h-10 bg-primary/20 border border-primary/40 flex items-center justify-center mb-4">
          <Zap size={20} className="text-primary fill-primary/20" />
        </div>
        
        {NAV.map((item) => {
          const active = pathname === item.to;
          return (
            <Link key={item.to} to={item.to} className="group relative flex flex-col items-center gap-1">
              <div className={`p-2 transition-all ${active ? 'bg-primary/20 border border-primary/50 text-primary' : 'text-slate-500 hover:text-slate-100'}`}>
                <item.icon size={18} />
              </div>
              <span className={`text-[8px] font-mono font-bold tracking-tighter ${active ? 'text-primary' : 'text-slate-600'}`}>
                {item.code}
              </span>
              {active && <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary shadow-[0_0_10px_var(--primary)]" />}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
