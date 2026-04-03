"use client";

import { PnlCard } from "./pnl-card";
import {
  Hash,
  Pin,
  Bell,
  Search,
  Users,
  Smile,
  Plus,
  Gift,
  ImageIcon,
  ChevronDown,
  Mic,
  Headphones,
  Settings,
  Volume2,
  Crown,
  Lock,
} from "lucide-react";

/* ───── Reusable sub-components ───── */

function DiscordMessage({
  avatar,
  avatarColor,
  avatarImage,
  username,
  tag,
  tagColor,
  time,
  children,
  className = "",
}: {
  avatar: string;
  avatarColor: string;
  avatarImage?: string;
  username: string;
  tag?: string;
  tagColor?: string;
  time: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex gap-4 px-4 py-1 hover:bg-white/[0.02] group ${className}`}>
      {avatarImage ? (
        <img
          src={avatarImage}
          alt={username}
          className="size-10 rounded-full shrink-0 object-cover"
        />
      ) : (
        <div
          className="size-10 rounded-full shrink-0 flex items-center justify-center text-white font-semibold text-sm"
          style={{ background: avatarColor }}
        >
          {avatar}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#f2f3f5] text-sm">{username}</span>
          {tag && (
            <span
              className="text-[10px] text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-wide"
              style={{ background: tagColor || "#5865f2" }}
            >
              {tag}
            </span>
          )}
          <span className="text-[11px] text-[#949ba4]">{time}</span>
        </div>
        <div className="text-sm text-[#dbdee1] mt-0.5">{children}</div>
      </div>
    </div>
  );
}

function ChannelItem({
  name,
  active = false,
  locked = false,
  notifications,
  muted = false,
}: {
  name: string;
  active?: boolean;
  locked?: boolean;
  notifications?: number;
  muted?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-1.5 px-2 py-[5px] rounded text-[13px] cursor-pointer ${
        active
          ? "bg-[#404249] text-white"
          : muted
            ? "text-[#5c5e66] hover:text-[#949ba4] hover:bg-white/[0.04]"
            : "text-[#949ba4] hover:text-[#dbdee1] hover:bg-white/[0.04]"
      }`}
    >
      {locked ? (
        <Lock className="size-4 shrink-0 opacity-60" />
      ) : (
        <Hash className="size-4 shrink-0 opacity-60" />
      )}
      <span className="truncate flex-1">{name}</span>
      {notifications && (
        <span className="ml-auto bg-[#f23f43] text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
          {notifications}
        </span>
      )}
    </div>
  );
}

function ChannelCategory({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className="mt-3 first:mt-0">
      <div className="flex items-center gap-0.5 px-0.5 mb-0.5 cursor-pointer group/cat">
        <ChevronDown className="size-2.5 text-[#949ba4] group-hover/cat:text-[#dbdee1]" />
        <span className="text-[11px] font-semibold text-[#949ba4] uppercase tracking-wide group-hover/cat:text-[#dbdee1]">
          {name}
        </span>
      </div>
      {children}
    </div>
  );
}

function MemberItem({
  name,
  color = "#b5bac1",
  status,
  avatarColor,
}: {
  name: string;
  color?: string;
  status?: "online" | "idle" | "dnd" | "offline";
  avatarColor?: string;
}) {
  const statusColors = {
    online: "#23a559",
    idle: "#f0b232",
    dnd: "#f23f43",
    offline: "#80848e",
  };
  const s = status || "online";

  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/[0.04] cursor-pointer">
      <div className="relative">
        <div
          className="size-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
          style={{ background: avatarColor || color + "33" }}
        >
          {name[0]}
        </div>
        <div
          className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-[#2b2d31]"
          style={{ background: statusColors[s] }}
        />
      </div>
      <span className="text-sm truncate" style={{ color: s === "offline" ? "#80848e" : color }}>
        {name}
      </span>
    </div>
  );
}

function RoleGroup({ name, count, children }: { name: string; count: number; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <p className="text-[11px] font-semibold text-[#949ba4] px-2 mb-1 uppercase tracking-wide">
        {name} — {count}
      </p>
      {children}
    </div>
  );
}

function ServerIcon({
  color,
  letter,
  active = false,
  imageSrc,
}: {
  color: string;
  letter: string;
  active?: boolean;
  imageSrc?: string;
}) {
  return (
    <div className="relative flex items-center justify-center group/si">
      {/* Active pill indicator */}
      <div
        className={`absolute -left-[4px] w-[4px] rounded-r-full bg-white transition-all ${
          active ? "h-10" : "h-0 group-hover/si:h-5"
        }`}
      />
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={letter}
          className={`size-12 object-cover cursor-pointer transition-all ${
            active ? "rounded-[16px]" : "rounded-[24px] hover:rounded-[16px]"
          }`}
        />
      ) : (
        <div
          className={`size-12 flex items-center justify-center text-white font-bold text-sm cursor-pointer transition-all ${
            active ? "rounded-[16px]" : "rounded-[24px] hover:rounded-[16px]"
          }`}
          style={{ background: color }}
        >
          {letter}
        </div>
      )}
    </div>
  );
}

/* ───── Main Component ───── */

export function DiscordMockup({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-full max-w-[1100px] mx-auto rounded-xl overflow-hidden shadow-2xl border border-white/5 ${className}`}
      style={{ boxShadow: "0 0 80px rgba(0,0,0,0.8)" }}
    >
      <div className="flex h-[560px] bg-[#313338] text-[13px]">
        {/* ━━━ Server Icon Strip (far left) ━━━ */}
        <div className="hidden md:flex w-[72px] shrink-0 flex-col items-center bg-[#1e1f22] py-3 gap-2">
          {/* Discord home / DM button */}
          <div className="size-12 rounded-[24px] hover:rounded-[16px] bg-[#313338] flex items-center justify-center cursor-pointer transition-all mb-1">
            <svg width="28" height="20" viewBox="0 0 127.14 96.36" fill="#dbdee1">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
            </svg>
          </div>

          <div className="w-8 h-[2px] bg-[#35363c] rounded-full mb-1" />

          {/* Tempo Trades — active */}
          <ServerIcon color="#1a1a2e" letter="TT" active imageSrc={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/logo.jpg`} />
          <ServerIcon color="#7c3aed" letter="D" />
          <ServerIcon color="#2563eb" letter="FX" />
          <ServerIcon color="#dc2626" letter="P" />
          <ServerIcon color="#16a34a" letter="S" />
          <ServerIcon color="#ea580c" letter="M" />

          <div className="w-8 h-[2px] bg-[#35363c] rounded-full my-1" />

          {/* Add server */}
          <div className="size-12 rounded-[24px] hover:rounded-[16px] bg-[#313338] flex items-center justify-center cursor-pointer transition-all text-[#23a559] hover:bg-[#23a559] hover:text-white">
            <Plus className="size-5" />
          </div>
        </div>

        {/* ━━━ Channel Sidebar ━━━ */}
        <div className="hidden md:flex w-[240px] shrink-0 flex-col bg-[#2b2d31]">
          {/* Server Header */}
          <div className="flex items-center justify-between px-4 h-12 border-b border-black/30 shadow-sm cursor-pointer hover:bg-white/[0.04]">
            <div className="flex items-center gap-2">
              <Crown className="size-4 text-yellow-500" />
              <span className="font-semibold text-[#f2f3f5] text-[15px]">Tempo Trades</span>
            </div>
            <ChevronDown className="size-4 text-[#949ba4]" />
          </div>

          {/* Channels */}
          <div className="flex-1 overflow-y-auto px-2 py-2 space-y-0">
            <ChannelCategory name="Premium">
              <ChannelItem name="get-access" locked />
              <ChannelItem name="1on1-mentorship" locked />
              <ChannelItem name="stream-schedule" locked />
              <ChannelItem name="testimonials" locked />
            </ChannelCategory>

            <div className="px-2 my-2">
              <div className="flex items-center gap-2 text-[11px] text-accent/80">
                <span>🟢 Live Trading Everyday</span>
              </div>
              <div className="text-[11px] text-[#949ba4] mt-0.5">Cancel Anytime</div>
            </div>

            <ChannelCategory name="Tempo Trades">
              <ChannelItem name="welcome" />
              <ChannelItem name="announcements" notifications={2} />
              <ChannelItem name="socials" />
              <ChannelItem name="faq" />
              <ChannelItem name="my-indicator" />
              <ChannelItem name="my-trading-software" />
              <ChannelItem name="prop-firms" />
              <ChannelItem name="trade-recaps" />
            </ChannelCategory>

            <ChannelCategory name="Community">
              <ChannelItem name="premium-chat" locked />
              <ChannelItem name="trading-chat" active />
              <ChannelItem name="non-trading-chat" />
              <ChannelItem name="long-term-stocks" />
              <ChannelItem name="pokemon-channel" />
              <ChannelItem name="premium-alerts" locked notifications={3} />
            </ChannelCategory>
          </div>

          {/* User Bar */}
          <div className="flex items-center gap-2 px-2 py-2 bg-[#232428]">
            <div className="relative">
              <div className="size-8 rounded-full bg-[#5865f2] flex items-center justify-center text-white text-xs font-bold">
                D
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-[#23a559] border-2 border-[#232428]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-[#f2f3f5] truncate">DARK</p>
              <p className="text-[10px] text-[#949ba4]">.darkrust</p>
            </div>
            <div className="flex gap-1.5">
              <Mic className="size-[18px] text-[#b5bac1] hover:text-white cursor-pointer" />
              <Headphones className="size-[18px] text-[#b5bac1] hover:text-white cursor-pointer" />
              <Settings className="size-[18px] text-[#b5bac1] hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>

        {/* ━━━ Main Chat ━━━ */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Channel Header */}
          <div className="flex items-center justify-between px-4 h-12 border-b border-black/30 shadow-sm">
            <div className="flex items-center gap-2">
              <Hash className="size-5 text-[#949ba4]" />
              <span className="font-semibold text-[#f2f3f5]">trading-chat</span>
              <span className="hidden sm:inline text-xs text-[#949ba4] border-l border-[#3f4147] pl-3 ml-1">
                General trading discussion
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Pin className="size-4 text-[#b5bac1] cursor-pointer hover:text-white hidden sm:block" />
              <Bell className="size-4 text-[#b5bac1] cursor-pointer hover:text-white hidden sm:block" />
              <Users className="size-4 text-[#b5bac1] cursor-pointer hover:text-white hidden sm:block" />
              <div className="hidden lg:flex items-center gap-1 bg-[#1e1f22] rounded px-2 py-1.5">
                <Search className="size-3.5 text-[#949ba4]" />
                <span className="text-xs text-[#949ba4]">Search</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {/* Message 1 — Tempo Trades */}
            <div className="discord-message-1">
              <DiscordMessage
                avatar="T"
                avatarColor="#7c3aed"
                username="Tempo Trades"
                tag="ICT"
                tagColor="#5865f2"
                time="Today at 09:32"
              >
                <p>morning everyone. ES looking clean for longs off the FVG on the 15m. watching 5,842 area for displacement 📈</p>
              </DiscordMessage>
            </div>

            {/* Message 2 — Trading_Alex */}
            <div className="discord-message-2">
              <DiscordMessage
                avatar="A"
                avatarColor="#3b82f6"
                username="Trading_Alex"
                tag="LS"
                tagColor="#2563eb"
                time="Today at 09:35"
              >
                <p>got in on that same setup. running 2 contracts. first TP hit already 🎯</p>
              </DiscordMessage>
            </div>

            {/* Message 3 — DrPingman with chart */}
            <div className="discord-message-3">
              <DiscordMessage
                avatar="D"
                avatarColor="#22c55e"
                username="DrPingman"
                tag="IFG"
                tagColor="#16a34a"
                time="Today at 09:41"
              >
                <p>NQ forming a breaker block on the 5m. waiting for confirmation before entry</p>
                {/* Fake chart image placeholder */}
                <div className="mt-2 max-w-[300px] h-[140px] rounded-lg bg-[#2b2d31] border border-white/5 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full p-3 flex items-end gap-[3px]">
                    {[35, 42, 28, 55, 45, 60, 38, 52, 65, 48, 70, 58, 75, 62, 80, 55, 72, 68, 85, 60, 78, 90, 72, 82, 95].map(
                      (h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm transition-all"
                          style={{
                            height: `${h}%`,
                            background: i > 18 ? "oklch(0.75 0.18 155 / 0.7)" : i % 3 === 0 ? "oklch(0.55 0.2 25 / 0.5)" : "oklch(0.75 0.18 155 / 0.5)",
                          }}
                        />
                      )
                    )}
                  </div>
                </div>
              </DiscordMessage>
            </div>

            {/* Message 4 — LMA.Trades with PnL */}
            <div className="discord-message-4">
              <DiscordMessage
                avatar="L"
                avatarColor="#f59e0b"
                username="LMA.Trades"
                tag="UNIT"
                tagColor="#d97706"
                time="Today at 09:58"
              >
                <p>closed out +$4,200 on ES. tempo&apos;s bias was spot on today 💪</p>
                <div className="mt-2 max-w-sm">
                  <PnlCard
                    date="Today"
                    pnl="$4,218.50"
                    trades={2}
                    winRate="100%"
                    className="discord-pnl-card"
                  />
                </div>
              </DiscordMessage>
            </div>

            {/* Message 5 — mtick03 */}
            <div className="discord-message-5">
              <DiscordMessage
                avatar="m"
                avatarColor="#6366f1"
                username="mtick03"
                time="Today at 10:04"
              >
                <p>3rd funded account passed this week. honestly couldn&apos;t have done it without this group</p>
              </DiscordMessage>
            </div>

            {/* Message 6 — TheUnicornBarbie */}
            <div className="discord-message-6">
              <DiscordMessage
                avatar="T"
                avatarColor="#ec4899"
                username="TheUnicornBarbie"
                tag="ICT"
                tagColor="#5865f2"
                time="Today at 10:12"
              >
                <p>that displacement was beautiful. took 3 points on NQ scalp off the OB 🔥</p>
              </DiscordMessage>
            </div>

            {/* Message 7 — Nick336 */}
            <div className="discord-message-7">
              <DiscordMessage
                avatar="N"
                avatarColor="#f59e0b"
                username="Nick336"
                tag="GRAD"
                tagColor="#d97706"
                time="Today at 10:18"
              >
                <p>just hit my daily goal in 20 min. closed ES longs at 5,858. clean sweep into OB and displacement 🤝</p>
              </DiscordMessage>
            </div>

            {/* Message 8 — Tempo Trades follow up */}
            <div className="discord-message-8">
              <DiscordMessage
                avatar="T"
                avatarColor="#7c3aed"
                username="Tempo Trades"
                tag="ICT"
                tagColor="#5865f2"
                time="Today at 10:25"
              >
                <p>love to see it. that&apos;s the power of sticking to the model. no overtrading, no revenge. one clean setup is all you need</p>
              </DiscordMessage>
            </div>

            {/* Message 9 — Sepehr */}
            <div className="discord-message-9">
              <DiscordMessage
                avatar="S"
                avatarColor="#8b5cf6"
                username="Sepehr"
                tag="GRAD"
                tagColor="#d97706"
                time="Today at 10:31"
              >
                <p>NQ tapped the 4h SIBI perfectly. these levels are unreal accurate</p>
              </DiscordMessage>
            </div>

            {/* Message 10 — jeezy with PnL */}
            <div className="discord-message-10">
              <DiscordMessage
                avatar="j"
                avatarColor="#3b82f6"
                username="jeezy"
                tag="MS"
                tagColor="#2563eb"
                time="Today at 10:38"
              >
                <p>+$1,850 on NQ. second green day in a row using tempo&apos;s killzone entries</p>
                <div className="mt-2 max-w-sm">
                  <PnlCard
                    date="Today"
                    pnl="$1,850.00"
                    trades={3}
                    winRate="67%"
                    className=""
                  />
                </div>
              </DiscordMessage>
            </div>

            {/* Message 11 — BukLao */}
            <div className="discord-message-11">
              <DiscordMessage
                avatar="B"
                avatarColor="#a855f7"
                username="BukLao"
                tag="LT"
                tagColor="#7c3aed"
                time="Today at 10:42"
              >
                <p>anyone else catch that GBP/USD sweep? london session was butter today</p>
              </DiscordMessage>
            </div>

            {/* Message 12 — fibonacci */}
            <div className="discord-message-12">
              <DiscordMessage
                avatar="f"
                avatarColor="#6d28d9"
                username="fibonacci"
                tag="LT"
                tagColor="#7c3aed"
                time="Today at 10:47"
              >
                <p>yep got 40 pips on cable. the weekly OB lined up with the daily FVG. textbook ICT</p>
              </DiscordMessage>
            </div>

            {/* Message 13 — A1 */}
            <div className="discord-message-13">
              <DiscordMessage
                avatar="A"
                avatarColor="#2563eb"
                username="A1"
                tag="MS"
                tagColor="#2563eb"
                time="Today at 10:53"
              >
                <p>passed my FTMO challenge today. 8.2% in 6 trading days. tempo&apos;s killzone strategy is insane 🏆</p>
              </DiscordMessage>
            </div>

            {/* Message 14 — Tempo Trades congrats */}
            <div className="discord-message-14">
              <DiscordMessage
                avatar="T"
                avatarColor="#7c3aed"
                username="Tempo Trades"
                tag="ICT"
                tagColor="#5865f2"
                time="Today at 10:55"
              >
                <p>LETS GO A1 🔥🔥 that&apos;s what discipline looks like. who&apos;s next?</p>
              </DiscordMessage>
            </div>
          </div>

          {/* Message Input */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-2 bg-[#383a40] rounded-lg px-4 py-2.5">
              <Plus className="size-5 text-[#b5bac1] cursor-pointer" />
              <span className="flex-1 text-sm text-[#6d6f78]">
                Message #trading-chat
              </span>
              <div className="flex items-center gap-3">
                <Gift className="size-5 text-[#b5bac1] cursor-pointer hidden sm:block" />
                <ImageIcon className="size-5 text-[#b5bac1] cursor-pointer hidden sm:block" />
                <Smile className="size-5 text-[#b5bac1] cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* ━━━ Members Sidebar ━━━ */}
        <div className="hidden lg:flex w-[240px] shrink-0 flex-col bg-[#2b2d31] border-l border-black/20">
          <div className="flex-1 overflow-y-auto px-2 pt-4 pb-2">
            <RoleGroup name="Admin" count={4}>
              <MemberItem name="Sleepy" color="#f23f43" avatarColor="#b91c1c" />
              <MemberItem name="DayTrader" color="#f23f43" avatarColor="#dc2626" />
              <MemberItem name="rickmedalle" color="#f23f43" avatarColor="#991b1b" status="idle" />
              <MemberItem name="Tempo Trades" color="#f23f43" avatarColor="#7c3aed" />
            </RoleGroup>

            <RoleGroup name="Graduated Mentorship" count={2}>
              <MemberItem name="Nick336" color="#f59e0b" avatarColor="#d97706" />
              <MemberItem name="Sepehr" color="#f59e0b" avatarColor="#b45309" status="idle" />
            </RoleGroup>

            <RoleGroup name="Mentorship Student" count={5}>
              <MemberItem name="A1" color="#3b82f6" avatarColor="#2563eb" />
              <MemberItem name="jeezy" color="#3b82f6" avatarColor="#1d4ed8" />
              <MemberItem name="MarketGem" color="#3b82f6" avatarColor="#3b82f6" status="idle" />
              <MemberItem name="Phil" color="#3b82f6" avatarColor="#1e40af" />
              <MemberItem name="Sebastian" color="#3b82f6" avatarColor="#2563eb" status="offline" />
            </RoleGroup>

            <RoleGroup name="Lifetime" count={14}>
              <MemberItem name="adrian17012" color="#a855f7" avatarColor="#7c3aed" />
              <MemberItem name="Bhargav Patel" color="#a855f7" avatarColor="#6d28d9" status="idle" />
              <MemberItem name="BukLao" color="#a855f7" avatarColor="#5b21b6" />
              <MemberItem name="Clay" color="#a855f7" avatarColor="#7c3aed" />
              <MemberItem name="Daniel" color="#a855f7" avatarColor="#6d28d9" />
              <MemberItem name="fibonacci" color="#a855f7" avatarColor="#5b21b6" status="idle" />
              <MemberItem name="GSJ" color="#a855f7" avatarColor="#7c3aed" />
              <MemberItem name="Java" color="#a855f7" avatarColor="#6d28d9" status="offline" />
            </RoleGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
