<script setup lang="ts">
// 四大核心：分类 / 子任务 / 统计 / 云同步
// 全部用 APP 真机运行截图，不是示意图。
const features = [
  {
    name: '分类',
    desc: '全部、工作、采购、阅读、运动。一件事归到哪一眼清楚，切一下只看这一摊。',
    img: '/shots/home_light.png',
    alt: 'doit 首页：顶部分类标签与今日待办列表',
  },
  {
    name: '子任务',
    desc: '大事先拆成几步。子任务全部打勾，父任务自动完成，不用你再点第二次。',
    img: '/shots/home_light.png',
    alt: 'doit 首页：父任务下展开的子任务清单，全部完成自动打勾',
  },
  {
    name: '统计',
    desc: '热力图看坚持，环形图看分布，折线看节奏。近一周、近一月、近一年翻着看。',
    img: '/shots/stats_cards.png',
    alt: 'doit 统计页：热力图、环形图与折线图',
  },
  {
    name: '云同步',
    desc: '开启 WebDAV，手机和桌面共用一份备份。双向合并、本地优先，谁改的都不丢。',
    img: '/shots/settings_tab_sync.png',
    alt: 'doit 设置页：WebDAV 自动同步开关',
  },
]
</script>

<template>
  <section id="features" class="section">
    <div class="container">
      <div class="reveal section-head">
        <span class="eyebrow">核心功能</span>
        <h2 class="section-title">真正每天都在用的，就这四样。</h2>
        <p class="section-sub">分类、子任务、统计、同步，一件都不省。下面是真机实拍，不是画出来的示意图。</p>
      </div>

      <div class="feature-gallery">
        <article v-for="(f, i) in features" :key="f.name" class="feature-item reveal" :class="`feature-item--${i}`">
          <div class="phone">
            <div class="phone-notch"></div>
            <img :src="f.img" :alt="f.alt" width="450" height="1000" loading="lazy" decoding="async" />
            <div class="phone-bar"></div>
          </div>
          <h3 class="feature-name">{{ f.name }}</h3>
          <p class="feature-desc">{{ f.desc }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.feature-gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(0.9rem, 2.4vw, 1.8rem);
  align-items: start;
  margin-top: clamp(2rem, 5vw, 3.4rem);
}

.feature-item {
  min-width: 0;
}

/* 轻微错落：中间两台上浮，两端下沉，让画廊有呼吸，不是死板一排 */
.feature-item--1,
.feature-item--2 {
  margin-top: 1.8rem;
}

.phone {
  position: relative;
  border-radius: 30px;
  overflow: hidden;
  background: var(--card);
  border: 6px solid var(--paper-deep);
  box-shadow: var(--shadow);
  aspect-ratio: 450 / 1000;
}

.phone img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
}

.phone-notch {
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 34%;
  height: 3.2%;
  border-radius: 999px;
  background: var(--paper-deep);
  z-index: 2;
}

.phone-bar {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 38%;
  height: 0.9%;
  border-radius: 999px;
  background: var(--ink-3);
  opacity: 0.5;
  z-index: 2;
}

.feature-name {
  font-size: 1.02rem;
  font-weight: 700;
  margin-top: 1.15rem;
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.feature-name::before {
  content: '';
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  flex: none;
}

.feature-desc {
  margin-top: 0.45rem;
  font-size: 0.86rem;
  line-height: 1.7;
  color: var(--ink-2);
}

@media (max-width: 900px) {
  .feature-gallery {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.6rem 1.2rem;
  }
  .feature-item--1,
  .feature-item--2 {
    margin-top: 0;
  }
  .feature-item--1,
  .feature-item--3 {
    margin-top: 1.4rem;
  }
}

@media (max-width: 480px) {
  .feature-gallery {
    gap: 1.3rem 0.9rem;
  }
  .feature-item--1,
  .feature-item--3 {
    margin-top: 1rem;
  }
  .feature-name {
    font-size: 0.96rem;
  }
  .feature-desc {
    font-size: 0.8rem;
  }
}
</style>
