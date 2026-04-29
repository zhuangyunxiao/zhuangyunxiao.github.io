import { useParams, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Calendar, MapPin, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { experiences } from "./Index";

// 灯箱预览（支持触摸滑动）
function Lightbox({ items, index, onClose }) {
  const [cur, setCur] = useState(index);
  const realItems = items.filter(i => i.src);
  const touchStart = useRef({ x: 0, y: 0 });
  const isSwiping = useRef(false);

  // 键盘控制
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCur(c => Math.min(c + 1, realItems.length - 1));
      if (e.key === 'ArrowLeft') setCur(c => Math.max(c - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [realItems.length, onClose]);

  const handleTouchStart = (e) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    isSwiping.current = false;
  };

  const handleTouchMove = (e) => {
    const dx = Math.abs(e.touches[0].clientX - touchStart.current.x);
    const dy = Math.abs(e.touches[0].clientY - touchStart.current.y);
    if (dx > dy && dx > 10) {
      isSwiping.current = true;
      e.preventDefault(); // 阻止页面滚动
    }
  };

  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    if (isSwiping.current && Math.abs(dx) > 50) {
      if (dx < 0) setCur(c => Math.min(c + 1, realItems.length - 1));
      else setCur(c => Math.max(c - 1, 0));
    } else if (!isSwiping.current) {
      // 短触视为关闭（点背景）
      onClose();
    }
    isSwiping.current = false;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm flex items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={onClose}
    >
      {/* 关闭按钮 */}
      <button
        className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/15 active:bg-white/30 text-white flex items-center justify-center z-10"
        onClick={e => { e.stopPropagation(); onClose(); }}
      >
        <X size={20} />
      </button>

      {/* 计数 */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium select-none">
        {cur + 1} / {realItems.length}
      </div>

      {/* 图片区域 - 不阻止事件，让触摸穿透到外层 */}
      <div className="w-full px-6 flex items-center justify-center pointer-events-none">
        <img
          src={realItems[cur]?.src}
          alt={realItems[cur]?.alt || ''}
          className="mx-auto object-contain rounded-xl shadow-2xl select-none"
          style={{ maxWidth: '100%', maxHeight: '80vh' }}
          draggable={false}
        />
      </div>

      {/* 左箭头（桌面） */}
      {cur > 0 && (
        <button
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white hidden sm:flex items-center justify-center transition-colors"
          onClick={e => { e.stopPropagation(); setCur(c => c - 1); }}
        >
          <ChevronLeft size={20} />
        </button>
      )}
      {/* 右箭头（桌面） */}
      {cur < realItems.length - 1 && (
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white hidden sm:flex items-center justify-center transition-colors"
          onClick={e => { e.stopPropagation(); setCur(c => c + 1); }}
        >
          <ChevronRight size={20} />
        </button>
      )}

      {/* 底部点点指示器 */}
      {realItems.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none">
          {realItems.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-200 ${i === cur ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/35'}`}
            />
          ))}
        </div>
      )}

      {/* 手机端滑动提示（仅首次） */}
      {realItems.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-xs sm:hidden pointer-events-none select-none">
          左右滑动切换 · 点击背景关闭
        </div>
      )}
    </div>
  );
}

// 横向滑动图片组
function ImageSlider({ items }) {
  const scrollRef = useRef(null);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const realItems = items.filter(i => i.src);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 260, behavior: 'smooth' });
    }
  };

  const openLightbox = (item) => {
    const idx = realItems.findIndex(r => r.src === item.src);
    if (idx !== -1) setLightboxIdx(idx);
  };

  return (
    <>
      <div className="relative group/slider">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-2 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className={`flex-shrink-0 rounded-xl overflow-hidden bg-[#161b22] border border-[#4F8EF7]/20 relative group/img ${item.src ? 'cursor-zoom-in active:scale-95 transition-transform' : ''} ${item.aspect === 'portrait' ? 'w-44 sm:w-52' : item.aspect === 'wide' ? 'w-72 sm:w-96' : item.aspect === 'square' ? 'w-52 sm:w-64' : 'w-56 sm:w-72'}`}
              style={{ aspectRatio: item.ratio || (item.aspect === 'portrait' ? '3/4' : item.aspect === 'wide' ? '16/9' : item.aspect === 'square' ? '1/1' : '4/3') }}
              onClick={() => item.src && openLightbox(item)}
            >
              {item.src ? (
                <>
                  <img src={item.src} alt={item.alt || ''} className={`mx-auto w-full h-full transition-transform duration-300 group-hover/img:scale-105 ${item.aspect === 'portrait' || item.aspect === 'square' || item.fit === 'contain' || item.ratio ? 'object-contain' : 'object-cover'}`} />
                  {/* 桌面 hover 遮罩 */}
                  <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-all duration-300 hidden sm:flex items-center justify-center">
                    <ZoomIn size={24} className="text-white opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
                  </div>
                  {/* 手机端常驻放大镜角标 */}
                  <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-black/50 flex items-center justify-center sm:hidden">
                    <ZoomIn size={12} className="text-white" />
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-[#4F8EF7]/30 gap-1.5">
                  <div className="w-8 h-8 rounded-lg bg-[#4F8EF7]/10 flex items-center justify-center text-base">🖼️</div>
                  <p className="text-[10px]">上传截图</p>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* 左右箭头（桌面） */}
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-7 h-7 rounded-full bg-[#161b22] border border-[#4F8EF7]/30 text-[#4F8EF7] hidden sm:flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity shadow-lg z-10"
        >
          <ChevronLeft size={14} />
        </button>
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-7 h-7 rounded-full bg-[#161b22] border border-[#4F8EF7]/30 text-[#4F8EF7] hidden sm:flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity shadow-lg z-10"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* 灯箱 */}
      {lightboxIdx !== null && (
        <Lightbox items={items} index={lightboxIdx} onClose={() => setLightboxIdx(null)} />
      )}
    </>
  );
}

export default function ExperienceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const idx = experiences.findIndex((e) => e.id === id);
  const exp = experiences[idx];

  if (!exp) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#8b949e] mb-4">未找到该实习经历</p>
          <button
            onClick={() => navigate("/")}
            className="text-[#4F8EF7] hover:underline text-sm">
            
            返回首页
          </button>
        </div>
      </div>);

  }

  const prev = idx > 0 ? experiences[idx - 1] : null;
  const next = idx < experiences.length - 1 ? experiences[idx + 1] : null;

  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-[#0d1117]/90 backdrop-blur-md border-b border-[#4F8EF7]/10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => {navigate("/");setTimeout(() => {const el = document.getElementById("experience");if (el) el.scrollIntoView({ behavior: "smooth" });}, 100);}}
            className="flex items-center gap-2 text-sm text-[#8b949e] hover:text-[#4F8EF7] transition-colors">
            
            <ArrowLeft size={16} />
            返回首页
          </button>
          <span className="text-[#4F8EF7]/30">/</span>
          <span className="text-sm text-[#8b949e]">{exp.company}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start mb-8 sm:mb-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-[#161b22] border border-[#4F8EF7]/20">
            {exp.id === 'exp-1' ?
            <img
              src="https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/美团横式色彩标识-k82aovqavbk3vu6yv0thlyq2kfiuy4.jpg"
              alt="美团"
              className="mx-auto object-cover h-full"
              style={{ width: '200%', objectPosition: 'left center' }} /> :

            exp.id === 'exp-2' ?
            <img src="https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/ximenzi logo-w1jo2eb8jvoe4vu8gi21aaiyqs70qj.jpg"

            alt="西门子" className="mx-auto object-cover w-[80px] h-[78px]" /> :


            exp.id === 'exp-3' ?
            <img
              src="https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/5c3ab941-7606-49cf-8b51-7b625653aa1d(1)-dxz2ig9somyepr4ckf5jumnfirzapo.png"
              alt="孩子王"
              className="mx-auto object-cover w-full h-full" /> :

            exp.id === 'exp-4' ?
            <img
              src="https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/图片2-2otza5wc0qnox458ga099optzpx5v9.png"
              alt="ICAF"
              className="mx-auto object-contain w-full h-full" /> :


            <div className="w-full h-full flex items-center justify-center text-[#4F8EF7]/40 text-xs font-bold">LOGO</div>
            }
          </div>
          <div className="flex-1">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2 leading-snug">{exp.company}</h1>
            <p className="text-[#4F8EF7] text-base sm:text-lg font-medium mb-2 sm:mb-3">{exp.role}</p>
            <div className="flex flex-wrap gap-4 text-sm text-[#8b949e]">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-[#4F8EF7]" />
                {exp.period}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-[#4F8EF7]" />
                {exp.location}
              </span>
            </div>
          </div>
        </div>

        {/* Highlights */}
        {exp.highlights && exp.highlights.length > 0 &&
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 sm:mb-12">
            {exp.highlights.map((h, i) =>
          <div key={i} className="glow-border rounded-xl p-3 sm:p-5 bg-[#161b22] text-center">
                <div className="text-xl sm:text-3xl font-bold text-[#4F8EF7] mb-1">{h.value}</div>
                <div className="text-[10px] sm:text-xs text-[#8b949e] leading-tight">{h.label}</div>
              </div>
          )}
          </div>
        }

        {/* Responsibilities */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
            <span className="w-1 h-5 bg-[#4F8EF7] rounded-full inline-block" />
            核心职责
          </h2>
          <div className="glow-border rounded-2xl p-4 sm:p-6 bg-[#161b22] space-y-3">
            {exp.responsibilities.map((r, i) =>
            <div key={i} className="flex gap-3 text-xs sm:text-sm text-[#8b949e]">
                <span className="text-[#4F8EF7] flex-shrink-0 font-mono text-xs mt-0.5">
                  0{i + 1}
                </span>
                {r}
              </div>
            )}
          </div>
        </div>

        {/* Tools */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
            <span className="w-1 h-5 bg-[#4F8EF7] rounded-full inline-block" />
            使用工具 / 技术栈
          </h2>
          <div className="flex flex-wrap gap-3">
            {exp.tools.map((t) =>
            <span
              key={t}
              className="px-4 py-2 rounded-lg bg-[#4F8EF7]/10 text-[#4F8EF7] text-sm border border-[#4F8EF7]/20 font-medium">
              
                {t}
              </span>
            )}
          </div>
        </div>

        {/* Screenshots */}
        {exp.screenshotGroups && exp.screenshotGroups.length > 0 && (
          <div className="mb-16 space-y-10">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-[#4F8EF7] rounded-full inline-block" />
              工作截图 / 数据图表
            </h2>
            {exp.screenshotGroups.map((group, gi) => (
              <div key={gi}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#4F8EF7]/15 text-[#4F8EF7] text-xs font-semibold border border-[#4F8EF7]/30">{group.label}</span>
                </div>
                <ImageSlider items={group.items} />
              </div>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 sm:pt-8 border-t border-[#4F8EF7]/10 gap-4">
          {prev ?
          <button
            onClick={() => navigate(`/experience/${prev.id}`)}
            className="flex items-center gap-2 text-sm text-[#8b949e] hover:text-[#4F8EF7] transition-colors group">
            
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <div className="text-left">
                <div className="text-xs text-[#4F8EF7]/60 mb-0.5">上一段经历</div>
                <div className="text-xs sm:text-sm line-clamp-1">{prev.company}</div>
              </div>
            </button> :

          <div />
          }
          {next ?
          <button
            onClick={() => navigate(`/experience/${next.id}`)}
            className="flex items-center gap-2 text-sm text-[#8b949e] hover:text-[#4F8EF7] transition-colors group">
            
              <div className="text-right">
                <div className="text-xs text-[#4F8EF7]/60 mb-0.5">下一段经历</div>
                <div className="text-xs sm:text-sm line-clamp-1">{next.company}</div>
              </div>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button> :

          <div />
          }
        </div>
      </div>
    </div>);

}
