// src/data/budgets.js
export const budgets = [
  {
    id: '10w',
    rangeLabel: '10万円以下',
    title: '10万円以下のPCから選ぶ',
    description: `パソコンのご購入予算を10万円以下でお選びいただく場合は、
    性能面ではミドルクラス以上のパーツを部分的に搭載したパソコンが主体のラインナップとなります。
    3Dゲーム入門用に最適なCPUとグラフィックスを搭載したゲーミングPCや、
    ハイエンドクラスCPUを搭載し、CPUパワーによる演算性能を重視したパソコンなどが選択いただけます。`,
    sliderLabel: '10万円以下のデスクトップPCから選ぶ',
    sliderBudget: '10w',
    links: [
      { to: '/pc_expert_config/15w-plus', label: '15万円以上のPC' },
      { to: '/pc_expert_config/20w-plus', label: '20万円以上のPC' },
      { to: '/pc_expert_config/25w-plus', label: '25万円以上のPC' },
    ],
  },
  {
    id: '10w-plus',
    rangeLabel: '10万円以上',
    title: '10万円以上のPCから選ぶ',
    description: `10万円以上の予算がある場合、より高性能なパーツを搭載したPCが選べます。
    ゲーミングやクリエイティブ作業に適したモデルが豊富です。
    高速なCPUや大容量メモリ、高性能グラフィックスカードを備えたパソコンで、より快適な作業環境を実現します。`,
    sliderLabel: '10万円以上のデスクトップPCから選ぶ',
    sliderBudget: '10w-plus',
    links: [
      { to: '/pc_expert_config/15w-plus', label: '15万円以上のPC' },
      { to: '/pc_expert_config/20w-plus', label: '20万円以上のPC' },
      { to: '/pc_expert_config/25w-plus', label: '25万円以上のPC' },
    ],
  },
  {
    id: '15w-plus',
    rangeLabel: '15万円以上',
    title: '15万円以上のPCから選ぶ',
    description: `15万円以上の予算をご検討中の場合、さらに高性能なパーツを搭載したPCをお選びいただけます。
    ゲーミング用に最適化されたモデルや、動画編集や3Dモデリングなどのクリエイティブ作業に最適なパソコンが揃っています。
    最新のCPUとグラフィックスカード、大容量のストレージを備えたモデルで、あらゆる用途に対応します。`,
    sliderLabel: '15万円以上のデスクトップPCから選ぶ',
    sliderBudget: '15w-plus',
    links: [
      { to: '/pc_expert_config/10w-plus', label: '10万円以上のPC' },
      { to: '/pc_expert_config/20w-plus', label: '20万円以上のPC' },
      { to: '/pc_expert_config/25w-plus', label: '25万円以上のPC' },
    ],
  },
  {
    id: '20w-plus',
    rangeLabel: '20万円以上',
    title: '20万円以上のPCから選ぶ',
    description: `20万円以上の予算により、トップクラスの性能を誇るPCを手に入れることができます。
    ゲーミングの最前線を行くモデルや、プロフェッショナル向けのクリエイティブワークステーションなど、用途に応じた最適なパソコンが揃っています。
    高速なデータ転送を実現する最新のストレージ技術や、多数の接続ポートを備えた拡張性の高いモデルもご用意しています。`,
    sliderLabel: '20万円以上のデスクトップPCから選ぶ',
    sliderBudget: '20w-plus',
    links: [
      { to: '/pc_expert_config/10w', label: '10万円以下のPC' },
      { to: '/pc_expert_config/10w-plus', label: '10万円以上のPC' },
      { to: '/pc_expert_config/25w-plus', label: '25万円以上のPC' },
    ],
  },
  {
    id: '25w-plus',
    rangeLabel: '25万円以上',
    title: '25万円以上のPCから選ぶ',
    description: `25万円以上の予算では、市場で最高性能を誇るハイエンドPCを選択できます。
    ゲーミングにおける最速のフレームレートを実現するモデルや、複雑なレンダリング作業をスムーズに行えるクリエイティブマシンなど、あらゆるニーズに対応するパソコンが揃っています。
    冷却性能に優れた構成や、デュアルGPU搭載モデルなど、最高のパフォーマンスを追求したラインナップを取り揃えています。`,
    sliderLabel: '25万円以上のデスクトップPCから選ぶ',
    sliderBudget: '25w-plus',
    links: [
      { to: '/pc_expert_config/10w', label: '10万円以下のPC' },
      { to: '/pc_expert_config/10w-plus', label: '10万円以上のPC' },
      { to: '/pc_expert_config/15w-plus', label: '15万円以上のPC' },
    ],
  },
  // 他の価格帯も同様に追加
];
