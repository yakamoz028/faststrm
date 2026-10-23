// 调度记录卡片：上次执行时间 / 状态 / 耗时 / 提示消息。
// 从 TaskScheduleDialog.tsx 抽出，逻辑零变更。
// 详见 v1.1.1 改进任务清单 T5。

import { Info } from "lucide-react";
import type { TaskSchedule } from "./TaskScheduleDialog";

const STATUS_LABEL: Record<string, { label: string; cls: string }> = {
  success: { label: "成功", cls: "text-green-600 dark:text-green-400 bg-green-500/10" },
  failed: { label: "失败", cls: "text-red-600 dark:text-red-400 bg-red-500/10" },
  blocked: { label: "跳过", cls: "text-amber-600 dark:text-amber-400 bg-amber-500/10" },
  catchup: { label: "补跑", cls: "text-blue-600 dark:text-blue-400 bg-blue-500/10" },
};

function formatLastRun(ts?: number): string {
  if (!ts) return "从未";
  const d = new Date(ts);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export interface ScheduleStatsCardProps {
  schedule: TaskSchedule;
}

export function ScheduleStatsCard({ schedule }: ScheduleStatsCardProps) {
  return (
    <div className="rounded-lg border bg-muted/30 p-4">
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
        最近调度记录
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div>
          <div className="text-muted-foreground text-xs mb-0.5">上次执行</div>
          <div className="font-medium">
            {formatLastRun(schedule.lastRunAt)}
          </div>
        </div>
        <div>
          <div className="text-muted-foreground text-xs mb-0.5">状态</div>
          {schedule.lastRunStatus ? (
            <span
              className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${
                STATUS_LABEL[schedule.lastRunStatus]?.cls ||
                "text-muted-foreground bg-muted"
              }`}
            >
              {STATUS_LABEL[schedule.lastRunStatus]?.label ||
                schedule.lastRunStatus}
            </span>
          ) : (
            <span className="text-muted-foreground/60">—</span>
          )}
        </div>
        <div>
          <div className="text-muted-foreground text-xs mb-0.5">耗时</div>
          <div className="font-medium">
            {schedule.lastRunDurationMs
              ? `${(schedule.lastRunDurationMs / 1000).toFixed(1)}s`
              : "—"}
          </div>
        </div>
      </div>
      {schedule.lastRunMessage && (
        <div className="mt-3 text-xs text-muted-foreground line-clamp-2">
          <Info className="w-3 h-3 inline mr-1" />
          {schedule.lastRunMessage}
        </div>
      )}
    </div>
  );
}
