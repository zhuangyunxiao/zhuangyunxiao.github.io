import { useParams, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { ArrowLeft, ArrowRight, Github, ExternalLink, Calendar, Users, MapPin, Gamepad2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "./Index";

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);
  const total = images.length;

  const prev = (e) => { e.stopPropagation(); setCurrent((c) => (c - 1 + total) % total); };
  const next = (e) => { e.stopPropagation(); setCurrent((c) => (c + 1) % total); };

  // keyboard
  const handleKey = (e) => {
    if (e.key === 'ArrowLeft') setCurrent((c) => (c - 1 + total) % total);
    if (e.key === 'ArrowRight') setCurrent((c) => (c + 1) % total);
    if (e.key === 'Escape') onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
      onKeyDown={handleKey}
      tabIndex={0}
      autoFocus
    >
      {/* Close */}
      <button
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
        onClick={onClose}
      >
        <X size={20} />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
        {current + 1} / {total}
      </div>

      {/* Prev */}
      {total > 1 && (
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          onClick={prev}
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* Image */}
      <div className="max-w-[90vw] max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <img
          src={images[current].src}
          alt={images[current].alt}
          className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
        />
      </div>

      {/* Next */}
      {total > 1 && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          onClick={next}
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* Dots */}
      {total > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
              className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-white scale-125' : 'bg-white/40'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Screenshot Slider ────────────────────────────────────────────────────────
function ScreenshotSlider({ items, onOpenLightbox }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 420, behavior: 'smooth' });
  };

  return (
    <div className="relative group/slider">
      {/* Left arrow */}
      <button
        onClick={() => scroll(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-8 h-8 rounded-full bg-[#161b22] border border-[#4F8EF7]/30 flex items-center justify-center text-[#4F8EF7] opacity-0 group-hover/slider:opacity-100 transition-opacity shadow-lg"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-3 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, i) => {
          const isWide = item.aspect === 'wide';
          const isSquare = item.aspect === 'square';
          const w = isWide ? 400 : isSquare ? 240 : 180;
          const h = isWide ? 225 : isSquare ? 240 : 320;
          return (
            <div
              key={i}
              className="flex-shrink-0 cursor-zoom-in rounded-xl overflow-hidden border border-[#4F8EF7]/10 bg-[#0d1117] hover:border-[#4F8EF7]/40 transition-all hover:scale-[1.02] flex items-center justify-center"
              style={{ width: w, height: h }}
              onClick={() => onOpenLightbox(i)}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-8 h-8 rounded-full bg-[#161b22] border border-[#4F8EF7]/30 flex items-center justify-center text-[#4F8EF7] opacity-0 group-hover/slider:opacity-100 transition-opacity shadow-lg"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState(null); // { images, index }

  const idx = projects.findIndex((p) => p.id === id);
  const proj = projects[idx];

  if (!proj) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#8b949e] mb-4">未找到该项目</p>
          <button onClick={() => navigate("/")} className="text-[#4F8EF7] hover:underline text-sm">
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx < projects.length - 1 ? projects[idx + 1] : null;

  // Flatten all screenshot items for lightbox
  const allScreenshots = proj.screenshotGroups
    ? proj.screenshotGroups.flatMap((g) => g.items)
    : [];

  const openLightbox = (groupIndex, itemIndex) => {
    // Calculate global index
    let offset = 0;
    for (let i = 0; i < groupIndex; i++) {
      offset += proj.screenshotGroups[i].items.length;
    }
    setLightbox({ images: allScreenshots, index: offset + itemIndex });
  };

  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}

      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-[#0d1117]/90 backdrop-blur-md border-b border-[#4F8EF7]/10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => { navigate("/"); setTimeout(() => { const el = document.getElementById("projects"); if (el) el.scrollIntoView({ behavior: "smooth" }); }, 100); }}
            className="flex items-center gap-2 text-sm text-[#8b949e] hover:text-[#4F8EF7] transition-colors"
          >
            <ArrowLeft size={16} />
            返回首页
          </button>
          <span className="text-[#4F8EF7]/30">/</span>
          <span className="text-sm text-[#8b949e]">{proj.name}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {proj.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-lg bg-[#4F8EF7]/10 text-[#4F8EF7] text-xs border border-[#4F8EF7]/20">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{proj.name}</h1>
          <p className="text-[#8b949e] text-lg mb-5">{proj.description}</p>
          <div className="flex flex-wrap gap-5 text-sm text-[#8b949e]">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-[#4F8EF7]" />
              {proj.period}
            </span>
            <span className="flex items-center gap-1.5">
              <Users size={14} className="text-[#4F8EF7]" />
              {proj.role}
            </span>
          </div>
        </div>

        {/* Cover */}
        {proj.cover ? (
          <div
            className="rounded-2xl overflow-hidden mb-12 border border-[#4F8EF7]/10 bg-[#0d1117] cursor-zoom-in relative group/cover"
            onClick={() => setLightbox({ images: [{ src: proj.cover, alt: proj.name }], index: 0 })}
          >
            <img
              src={proj.cover}
              alt={proj.name}
              className="mx-auto object-contain w-full"
            />
            {/* Hover hint */}
            <div className="absolute inset-0 bg-black/0 group-hover/cover:bg-black/20 transition-all flex items-center justify-center">
              <div className="opacity-0 group-hover/cover:opacity-100 transition-opacity bg-black/60 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <ExternalLink size={12} />
                点击查看大图
              </div>
            </div>
          </div>
        ) : (
          <div className="h-64 rounded-2xl bg-gradient-to-br from-[#4F8EF7]/10 to-[#0d1117] border-2 border-dashed border-[#4F8EF7]/20 flex flex-col items-center justify-center text-[#4F8EF7]/30 gap-3 mb-12 relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="relative flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-2xl bg-[#4F8EF7]/10 border border-dashed border-[#4F8EF7]/30 flex items-center justify-center">
                <ExternalLink size={22} className="text-[#4F8EF7]/40" />
              </div>
              <p className="text-sm">上传项目封面图</p>
            </div>
          </div>
        )}

        {/* Background */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
            <span className="w-1 h-5 bg-[#4F8EF7] rounded-full inline-block" />
            项目背景
          </h2>
          <div className="glow-border rounded-2xl p-6 bg-[#161b22]">
            <p className="text-[#8b949e] leading-relaxed text-sm">{proj.background}</p>
          </div>
        </div>

        {/* My Work */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
            <span className="w-1 h-5 bg-[#4F8EF7] rounded-full inline-block" />
            我的工作
          </h2>
          <div className="glow-border rounded-2xl p-6 bg-[#161b22] space-y-4">
            {proj.work.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#4F8EF7]/15 border border-[#4F8EF7]/30 flex items-center justify-center text-[#4F8EF7] text-xs font-bold">
                  {i + 1}
                </div>
                <p className="text-sm text-[#8b949e] leading-relaxed pt-0.5">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Venues */}
        {proj.venues && proj.venues.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#4F8EF7] rounded-full inline-block" />
              <MapPin size={16} className="text-[#4F8EF7]" />
              联动场馆 / 商圈
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {proj.venues.map((venue, i) => (
                <div key={i} className="glow-border rounded-xl p-4 bg-[#161b22]">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4F8EF7]/15 border border-[#4F8EF7]/30 flex items-center justify-center text-[#4F8EF7] text-xs font-bold mt-0.5">
                      {i + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-white text-sm font-semibold">{venue.name}</span>
                        <span className="px-2 py-0.5 rounded-md bg-[#4F8EF7]/10 text-[#4F8EF7] text-xs border border-[#4F8EF7]/20">{venue.event}</span>
                      </div>
                      <p className="text-xs text-[#8b949e] leading-relaxed">{venue.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gameplays */}
        {proj.gameplays && proj.gameplays.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#4F8EF7] rounded-full inline-block" />
              <Gamepad2 size={16} className="text-[#4F8EF7]" />
              活动玩法
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {proj.gameplays.map((gp, i) => (
                <div key={i} className="glow-border rounded-xl p-5 bg-[#161b22]">
                  <div className="w-8 h-8 rounded-lg bg-[#4F8EF7]/15 border border-[#4F8EF7]/30 flex items-center justify-center text-[#4F8EF7] text-sm font-bold mb-3">
                    {i + 1}
                  </div>
                  <h3 className="text-white text-sm font-semibold mb-2">{gp.title}</h3>
                  <p className="text-xs text-[#8b949e] leading-relaxed">{gp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {proj.results && proj.results.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#4F8EF7] rounded-full inline-block" />
              核心成果
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {proj.results.map((r, i) => (
                <div key={i} className="glow-border rounded-xl p-5 bg-[#161b22] text-center">
                  <div className="text-3xl font-bold text-[#4F8EF7] mb-1">{r.value}</div>
                  <div className="text-xs text-[#8b949e]">{r.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Screenshot Groups — horizontal scroll + lightbox */}
        {proj.screenshotGroups && proj.screenshotGroups.length > 0 ? (
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#4F8EF7] rounded-full inline-block" />
              项目截图
            </h2>
            <div className="space-y-8">
              {proj.screenshotGroups.map((group, gi) => (
                <div key={gi}>
                  {proj.screenshotGroups.length > 1 && (
                    <h3 className="text-sm font-medium text-[#4F8EF7] mb-3 flex items-center gap-2">
                      <span className="w-4 h-px bg-[#4F8EF7]/40 inline-block" />
                      {group.label}
                    </h3>
                  )}
                  <ScreenshotSlider
                    items={group.items}
                    onOpenLightbox={(itemIdx) => openLightbox(gi, itemIdx)}
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-[#8b949e]/50 mt-3 text-center">← 左右滑动查看 · 点击图片放大 →</p>
          </div>
        ) : (
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#4F8EF7] rounded-full inline-block" />
              项目截图
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[1, 2].map((n) => (
                <div key={n} className="h-48 rounded-2xl bg-[#161b22] border-2 border-dashed border-[#4F8EF7]/20 flex flex-col items-center justify-center text-[#4F8EF7]/30 gap-2">
                  <div className="w-10 h-10 rounded-lg bg-[#4F8EF7]/10 flex items-center justify-center">
                    <ExternalLink size={18} className="text-[#4F8EF7]/30" />
                  </div>
                  <p className="text-xs">上传截图 {n}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {(proj.github || proj.figma) && (
          <div className="flex gap-4 mb-16">
            {proj.github && (
              <a href={proj.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#4F8EF7] text-white rounded-lg text-sm font-medium hover:bg-[#3a7de8] transition-colors">
                <Github size={16} />
                查看源码
              </a>
            )}
            {proj.figma && (
              <a href={proj.figma} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 border border-[#4F8EF7]/40 text-[#4F8EF7] rounded-lg text-sm font-medium hover:bg-[#4F8EF7]/10 transition-colors">
                <ExternalLink size={16} />
                查看原型
              </a>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-[#4F8EF7]/10">
          {prev ? (
            <button onClick={() => navigate(`/projects/${prev.id}`)}
              className="flex items-center gap-2 text-sm text-[#8b949e] hover:text-[#4F8EF7] transition-colors group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <div className="text-left">
                <div className="text-xs text-[#4F8EF7]/60 mb-0.5">上一个项目</div>
                <div>{prev.name}</div>
              </div>
            </button>
          ) : <div />}
          {next ? (
            <button onClick={() => navigate(`/projects/${next.id}`)}
              className="flex items-center gap-2 text-sm text-[#8b949e] hover:text-[#4F8EF7] transition-colors group">
              <div className="text-right">
                <div className="text-xs text-[#4F8EF7]/60 mb-0.5">下一个项目</div>
                <div>{next.name}</div>
              </div>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
