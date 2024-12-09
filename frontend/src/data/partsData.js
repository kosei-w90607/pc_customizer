// src/data/partsData.js
const partsData = [
  // 既存のパーツデータ
  {
    partName: 'OS',
    description:
      'Proエディションには、Homeエディションの機能に加え、個人利用向けに更に強化されたセキュリティ機能とリモートデスクトップやOSの仮想化などビジネス向けの機能が多数搭載されています。',
    options: [
      { name: 'Windows Home', price: '10,000' },
      { name: 'Windows Pro', price: '20,000' },
    ],
    partKey: 'os',
  },
  {
    partName: 'CPU',
    description:
      'パソコンの性能の中心となる「CPU」。性能が高い上位モデルだと動画編集、写真現像、DTM、イラスト制作、大量のExcelマクロ計算など、通常では重たい作業も快適に行うことができます。',
    options: [
      { name: 'Intel Core i5', price: '30,000' },
      { name: 'Intel Core i7', price: '40,000' },
      { name: 'Intel Core i9', price: '50,000' },
      { name: 'AMD Ryzen 5', price: '20,000' },
      { name: 'AMD Ryzen 7', price: '30,000' },
      { name: 'AMD Ryzen 9', price: '40,000' },
    ],
    partKey: 'cpu',
  },
  {
    partName: 'CPUクーラー',
    description:
      'CPUクーラーはCPUから出る熱を冷却するPCパーツであり、主に空冷CPUクーラーと水冷CPUクーラーがあります。一般的に水冷CPUクーラーの方が冷却効率が高く、ゲームや動画編集など高負荷の作業をされる方におすすめです。',
    options: [
      { name: '空冷', price: '30,000' },
      { name: '水冷', price: '40,000' },
    ],
    partKey: 'cpu_cooler',
  },
  {
    partName: 'GPU',
    description:
      'グラフィックボードは、ゲームや動画編集、3Dモデリングなどのグラフィック処理を担当する重要なパーツです。用途に応じて最適なモデルを選択してください。',
    options: [
      {
        categoryName: '30xx Series',
        options: [
          { name: 'NVIDIA RTX 3060', price: '40,000' },
          { name: 'NVIDIA RTX 3070', price: '50,000' },
        ],
      },
      {
        categoryName: '40xx Series',
        options: [
          { name: 'NVIDIA RTX 4060', price: '60,000' },
          { name: 'NVIDIA RTX 4070', price: '70,000' },
        ],
      },
    ],
    partKey: 'gpu',
  },

  // 追加するパーツデータ
  {
    partName: 'マザーボード（Motherboard）',
    description:
      'マザーボードはPCの各コンポーネントを接続し、データのやり取りを行う重要な役割を持つパーツです。チップセットやフォームファクターにより、対応するCPUや拡張性が異なります。',
    options: [
      { name: 'ASUS ROG Strix Z690-A', price: '35,000' },
      { name: 'MSI MPG B550 Gaming Edge', price: '20,000' },
      { name: 'Gigabyte X570 AORUS Elite', price: '25,000' },
      { name: 'ASRock B660M Pro RS', price: '15,000' },
    ],
    partKey: 'motherboard',
  },
  {
    partName: 'メインメモリ（RAM）',
    description:
      'メインメモリ（RAM）は、PCがデータを一時的に保存し、迅速にアクセスするための重要なパーツです。容量や速度、タイミングによって性能が異なります。',
    options: [
      { name: '8GB DDR4 3200MHz', price: '5,000' },
      { name: '16GB DDR4 3200MHz', price: '10,000' },
      { name: '32GB DDR4 3600MHz', price: '20,000' },
      { name: '16GB DDR5 5200MHz', price: '15,000' },
      { name: '32GB DDR5 6000MHz', price: '30,000' },
    ],
    partKey: 'ram',
  },
  {
    partName: 'ストレージ（Storage）',
    description:
      'ストレージは、データを長期的に保存するためのパーツです。SSDは高速な読み書きが可能で、HDDは大容量を比較的安価に提供します。用途に応じて最適なストレージを選択してください。',
    options: [
      // SSD
      {
        categoryName: 'SSD',
        options: [
          { name: 'Samsung 970 EVO Plus 500GB (NVMe)', price: '12,000' },
          { name: 'Western Digital Blue 1TB (SATA)', price: '8,000' },
          { name: 'Crucial MX500 2TB (SATA)', price: '20,000' },
          { name: 'Samsung 980 PRO 1TB (NVMe)', price: '18,000' },
        ],
      },
      // HDD
      {
        categoryName: 'HDD',
        options: [
          { name: 'Seagate BarraCuda 2TB', price: '7,000' },
          { name: 'Western Digital Black 4TB', price: '14,000' },
          { name: 'Toshiba X300 6TB', price: '16,000' },
        ],
      },
    ],
    partKey: 'storage',
  },
  {
    partName: '電源ユニット（Power Supply Unit, PSU）',
    description:
      '電源ユニットは、PC全体に安定した電力を供給するためのパーツです。ワット数や80 PLUS認証の有無、ケーブルの種類などを考慮して選択してください。',
    options: [
      { name: 'Corsair RM750x 750W 80 PLUS Gold', price: '12,000' },
      { name: 'Seasonic Focus GX-650 650W 80 PLUS Gold', price: '10,000' },
      { name: 'EVGA SuperNOVA 850 G5 850W 80 PLUS Gold', price: '15,000' },
      { name: 'Cooler Master MWE Gold 550W 80 PLUS Gold', price: '8,000' },
    ],
    partKey: 'psu',
  },
  {
    partName: 'PCケース（Case）',
    description:
      'PCケースは、内部パーツを収納し、冷却やケーブル管理をサポートする役割を持ちます。デザインやサイズ、拡張性、冷却性能などを考慮して選択してください。',
    options: [
      { name: 'NZXT H510', price: '10,000' },
      { name: 'Corsair 4000D Airflow', price: '12,000' },
      { name: 'Fractal Design Meshify C', price: '11,000' },
      { name: 'Cooler Master MasterBox NR600', price: '9,000' },
    ],
    partKey: 'case',
  },
  {
    partName: '追加冷却（Additional Cooling）',
    description:
      '追加の冷却ファンや水冷システムを導入することで、PCの温度管理を向上させ、安定した動作を維持します。特に高負荷の作業やオーバークロックを行う際に効果的です。',
    options: [
      { name: 'Noctua NF-P12 redux-1700 PWM (120mm)', price: '3,000' },
      { name: 'Corsair LL120 RGB (120mm)', price: '4,500' },
      { name: 'NZXT Kraken X63 Liquid Cooler (280mm)', price: '15,000' },
      { name: 'Cooler Master Hyper 212 RGB', price: '5,000' },
    ],
    partKey: 'additional_cooling',
  },
  {
    partName: '光学ドライブ（Optical Drive）',
    description:
      '必要に応じてCD/DVD/Blu-rayなどの光学メディアを読み書きするためのドライブです。最近のPCではあまり使用されませんが、特定の用途に必要な場合に選択してください。',
    options: [
      { name: 'ASUS DRW-24D5MT (DVD Burner)', price: '4,000' },
      { name: 'LG WH12NS40 (Blu-ray Burner)', price: '7,000' },
      { name: 'Pioneer BDR-209DBK (BD/DVD Burner)', price: '6,000' },
    ],
    partKey: 'optical_drive',
  },
  // 他のパーツデータをここに追加
];

export default partsData;
